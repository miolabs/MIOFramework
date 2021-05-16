
'use strict';

// const convert    = require('convert-source-map');
const combine = require("convert-source-map");
const fs         = require('fs');

var content = fs.readFileSync("./source/index.web.ts", "utf8");
var item;
var files = [];	

var regEx = /export\s.\sfrom \'.\/(.*)\'/gm;
while (item = regEx.exec(content)) {		
    files.push("./source/" + item[1] + ".ts");
}

var offset = { line: 2 };
var bundle = combine.create('foundation.js');
for (f of files){
    bundle.addFile(f, { line: offset.line + 2} );
}

console.log(bundle.base64());


