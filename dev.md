# Development

## Getting started

Install the dependencies of the project, and start development.

```bash
npm install
npm start
```

## Make it available in terminal

You can link your repository as if it was installed globally, with [npm-link](https://docs.npmjs.com/cli/link)

    npm link
    miojs new -h

## Write unit tests

[tutorial](http://how-to-write-a-typescript-library.com/unit-testing)

## Publish to npm

To publish your first version to npm run:

    tsc
    npm publish

Now you're all set to go! Consume your library anywhere you want by running:

    npm install --save hwrld

and consume it using

    import {HelloWorld} from 'hwrld'
    HelloWorld.sayHello();

## Further reading marterial

* [npm module in ts](https://codeburst.io/https-chidume-nnamdi-com-npm-module-in-typescript-12b3b22f0724)
* [tutorial to write a module this way](https://www.tsmean.com/articles/how-to-write-a-typescript-library/)
* [write a node app in typescript](https://blog.risingstack.com/building-a-node-js-app-with-typescript-tutorial/)
* [write command line npm module](https://developer.atlassian.com/blog/2015/11/scripting-with-node/)
* [webpack tutorial](http://marcobotto.com/compiling-and-bundling-typescript-libraries-with-webpack/)