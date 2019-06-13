# MIOFramework

Have you ever wished to share code between platforms? Now you can. Develop **native** iOS apps in xcode and deploy a browser version in HTML. Share logic between iOS (swift), browser (js), server (nodeJS or swift) & Android (embedded js). No need for 3 different teams coding the same thing anymore.

Swift is the official new language behind iOS. It's also rapidly gaining popularity as a backend language. The MIOLabs team believes it's a language of the future. We absolutely love coding in it, and we want to make it possible to use for anyone, including front-end developers and more. Become a faster, more efficient developer, by using a super-efficient programming language and targeting many different environments at the same time.

This is currently under heavy development, but we have come a long way. The transpiler has a near-full Swift5 support. Our Foundation/UIKit js libs are used by us in our commercial app. We're working hard to achieve a 100% support of all native swift libraries.

## Repo

The project consists of two repositories. https://github.com/miolabs/swift is our fork of the swift compiler. It's a transpiler that translates from Swift to TypeScript.

MIOFramework includes Apple libs like Foundation, UIKit and CoreData that we ported into TypeScript. It also includes tools for testing and automatic translation of the Apple libs.

## Usage

//TODO miotool generate etc
//also need to mention downloading the transpiler (SWIFT-LOCAL....)

## Development

We welcome any contributions.

To work on the transpiler, follow our instructions at https://github.com/miolabs/MIOFramework/tree/master/MIOSwiftTranspiler

To work on our Foundation/UIKit libraries:

```
cd ./Libs/refactor-transpiler
npm install
#Foundation
cd ./Libs/Foundation
npm run build-web-dev-transpiler
#UIKit
cd ./Libs/UIKit
npm run build-web-dev-transpiler
```

That will update the build js in `Libs/Foundation/packages/mio-foundation-web-dev/mio-foundation-web.js` and `/Users/bubulkowanorka/projects/MIOFramework/Libs/UIKit/packages/mio-uikit-web-dev/mio-uikit-web.js` respectively.
