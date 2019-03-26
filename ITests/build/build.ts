const glob = require('glob');
const path = require('path');
const exec = require('child_process').exec;
const fs = require('fs-extra');

const searchPattern = `${__dirname}/../**/**/*.swift`;
const transpilerRoot = path.join(__dirname, "../../MIOSwiftTranspiler");
const targetRoot = path.join(__dirname, "../dist");
const codeRoot = path.join(__dirname, "../../MIOSwiftTranspiler");

const language = "ts";

glob(searchPattern, {}, (_: any, files: string[]) => {
  files.map(transpileFile);
});

function transpileFile(file: string) {
  const fileData = path.parse(file);
  exec(
    `cd ${transpilerRoot}/out/artifacts/antlr4example_jar;
     export CLASSPATH=".:${__dirname}/antlr-4.5-complete.jar:$CLASSPATH";
     java Main ${file} ${language}`,
    (err: any, stdout: any, stderr: any) => {
      // console.log(fileData);
      // console.error(`${err}`);
      // console.log(`${stdout}`);
      // console.error(`${stderr}`);

      const dirName = fileData.dir.slice(path.join(__dirname, "..").length)
      const newFileName = `${targetRoot}/${dirName}/${fileData.name}.ts`;

      fs.outputFile(newFileName, stdout, (err: any) => {
        if (err) throw err;
        console.log(`${newFileName} has been saved!`);
      });
    });
}
