import { Project, BinaryExpression, PropertyDeclaration, ParameterDeclaration, ClassInstancePropertyTypes, ReferencedSymbol, SetAccessorDeclaration, GetAccessorDeclaration, ReturnStatement, ClassDeclaration, InterfaceDeclaration } from "ts-morph"
const execSync = require('child_process').execSync
const fs = require('fs')

const project = new Project({
  tsConfigFilePath: `${__dirname}/../tsconfig.json`
})

function getClass(className): {file: string, getter: string, c: ClassDeclaration | InterfaceDeclaration} {
  for(let sourceFile of project.getSourceFiles()) {
    let c = sourceFile.getClass(className)
    let i = sourceFile.getInterface(className)
    if(c || i) return {file: sourceFile.getBaseName(), getter: c ? 'getClass' : 'getInterface', c: c || i}
  }
}

const miojslibsMapping = require('./miojslibs-mapping.json')

let UIKitMembers = execSync(`${__dirname}/../../../../swift-source/build/Ninja-RelWithDebInfoAssert/swift-macosx-x86_64/bin/swiftc -dump-ast -O -sdk /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS12.2.sdk -target arm64-apple-ios12.2 -F /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/Library/Frameworks ${__dirname}/print-members-uikit.swift`, {encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe']})

let UIKit
eval('UIKit = {' + UIKitMembers + '}')

let optionals = []
let renames = []

for(let className in UIKit) {
    let foundClass = getClass(className)
    if(!foundClass) {/*console.log('notfound', className);*/continue}
    console.log('-------------------', className)

    let swift = UIKit[className]
    let instance = null
    let classMapping = miojslibsMapping[className]

    for(let i = 0; i < swift.length; i += 3) {
        let propName = swift[i]
        let isOptional = swift[i + 1]
        let optionalParams = swift[i + 2]

        //console.log(propName, isOptional)

        if(classMapping && classMapping[propName]) {
            renames.push({chain: ["getSourceFile", foundClass.file, foundClass.getter, className, foundClass.getter === "getInterface" ? "getMethod" : "getInstanceMethod", classMapping[propName]], rename: propName})
            propName = classMapping[propName]
        }

        if(isOptional) optionals.push(["getSourceFile", foundClass.file, foundClass.getter, className, foundClass.getter === "getInterface" ? "getProperty" : "getInstanceProperty", propName])
        else for(let opI = 0; opI < optionalParams.length; opI++) {
            if(!optionalParams[opI]) continue
            optionals.push(["getSourceFile", className + ".ts", foundClass.getter, className, foundClass.getter === "getInterface" ? "getMethod" : "getInstanceMethod", propName, "getParameters", "", "0", null])
        }
    }
}

fs.writeFileSync(`${__dirname}/miojslibs-optionals.json`, JSON.stringify(optionals))
fs.writeFileSync(`${__dirname}/miojslibs-renames.json`, JSON.stringify(renames))