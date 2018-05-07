# miojs-cli

This is a cli tool to generate projects for [MIOJSLibs](https://github.com/miolabs/MIOJSLibs).

* [Usage](#usage)
* [Plans](#plans)
  * [Commands to support](#commands-to-support)
  * [Directory structure](#directory-structure)
  * [Key concepts](#key-concepts)
  * [Plan to the future](#plan-to-the-future)

## Usage

```bash
npm install miojs -g
miojs -h
```

## Plans

### Commands to support

* init - create a new project from a template
  * the templates are located in the repository.
* create - create a file from blueprint
  * separate ts files
* build - build the project
  * make the project runnable.
  * scss transpilation for web projects
  * --watch option for incremental builds.
* pack - create a deployable version
  * pack the files, add version somehow.
* test - run the tests
  * currently there are no ways for testing.
* serve - start an http server with the files.
  * currently we use a minimal express server.
* lint - lint the code.
  * currently we use `htlmhint` and `tslint`
  * generate the lint configs
* dev
  * combine the others

### Directory structure

* templates
  * init
    * simple
    * complete
    * navigation
    * table
  * create
    * view
    * controller
* dist
  * //generated sources
* src
  * index.ts
  * commands
    * build.ts
    * create.ts
    * init.ts
    * lint.ts
    * pack.ts
    * serve.ts
    * test.ts
  * webpack.config.js
  * tsconfig.json
  * index.js
  * package.json
* tests
  * //unit tests
* docs
  * //detailed documentation for the tool

### Key concepts

* One build tool for all.
* The build tool has to work with different project languages (php, javascript, typescript, swift)
* The build tool has to take care of the project specific checks, linting.
* The build tool has to be well documented
* The build tool has to have regression tests for modifications.
* The build tool has to read configurations from a config file
  * server data: port, sourcefolder
  * linter, if different from the original.

### Plan to the future

* Rewrite everything to swift.
