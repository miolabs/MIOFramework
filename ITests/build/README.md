# Build tool

## Getting started

* Install dependencies with `npm install` in this folder.
* Run the tool with `npm start`.

## How it works

It loads all `*.swift` files from the nearby folders. Transpiles them one by one with the **MIOSwiftTranspiler** and recreates the folder structure into `dist` folder.

It logs the errors by file into the console if any.