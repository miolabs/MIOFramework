const express = require('express');
const path = require('path');
const fs = require('fs');
const async = require('async');
const exec = require('child_process').exec;

var router = express.Router();

const MAX_CODE_LENGTH = 10 * 1024;
const COMMAND = '~/Library/Developer/Toolchains/swift-LOCAL-2019-06-02-a.xctoolchain/usr/bin/swiftc -dump-ast -O -Xfrontend -disable-access-control -sdk /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS12.2.sdk -target arm64-apple-ios12.2 -F /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/Library/Frameworks';

const FORMAT = false

router.post('*', function(req, res, next) {

    if(!req.body || typeof req.body.code !== 'string' || !req.body.code.length) return res.sendStatus(400);
    if(req.body.code.length > MAX_CODE_LENGTH) return res.sendStatus(413);

    let tmpFileName = '/var/tmp/' + new Date().getTime() + Math.random().toString().slice(2),
        transpiled = '';

    async.waterfall([
        callback => fs.writeFile(tmpFileName + '.swift', req.body.code, callback),
        callback => {delete req.body.code; callback();},
        callback => exec(`${COMMAND} ${tmpFileName}.swift`, callback),
        (stdout, stderr, callback) => {
            console.log('!!!!!!!!!!stdout');
            console.log(stdout);
            console.log('!!!!!!!!!!stderr');
            console.log(stderr);
            transpiled = stdout;
            while(transpiled.includes('\n;\n')) transpiled = transpiled.replace(/\n;\n/g, ';\n')
            while(transpiled.includes('\n\n')) transpiled = transpiled.replace(/\n\n/g, '\n')
            while(transpiled.includes(';;')) transpiled = transpiled.replace(/;;/g, ';')
            while(transpiled.startsWith('\n')) transpiled = transpiled.slice(1)
            callback(stderr.trim());
        },
        callback => FORMAT ? fs.writeFile(tmpFileName + '.ts', transpiled, callback) : callback(),
        callback => FORMAT ? exec('tsfmt -r ' + tmpFileName + '.ts', callback) : callback()
    ],
    err => {
        async.series([
            callback => {
                if(!FORMAT) return callback()
                fs.readFile(tmpFileName + '.ts', 'utf8', (err, text) => {
                    if(!err) transpiled = text;
                    callback();
                })
            },
            callback => fs.unlink(tmpFileName + '.swift', callback),
            callback => FORMAT ? fs.unlink(tmpFileName + '.ts', callback) : callback()
        ],
        err2 => {
            console.log('!!!!!!!!!!err');
            console.log(err);
            if(err) return res.sendStatus(500);
            res.send(transpiled);
        })
    });
});

module.exports = router;