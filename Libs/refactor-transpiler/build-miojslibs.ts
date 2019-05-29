import { Project, ClassDeclaration, InterfaceDeclaration } from "ts-morph"
const execSync = require('child_process').execSync
const fs = require('fs')

const module = process.argv[2]

const project = new Project({
  tsConfigFilePath: `${__dirname}/../${module === 'uikit' ? 'UIKit' : 'Foundation'}/tsconfig.json`
})

function getClass(className): {file: string, getter: string, c: ClassDeclaration | InterfaceDeclaration} {
  for(let sourceFile of project.getSourceFiles()) {
    let c = sourceFile.getClass(className)
    let i = sourceFile.getInterface(className)
    if(c || i) return {file: sourceFile.getBaseName(), getter: c ? 'getClass' : 'getInterface', c: c || i}
  }
}

const miojslibsMapping = require('./miojslibs-mapping.json')

let swiftModuleMembers = execSync(`${__dirname}/../../../swift-source/build/Ninja-RelWithDebInfoAssert/swift-macosx-x86_64/bin/swiftc -dump-ast -O -sdk /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS12.2.sdk -target arm64-apple-ios12.2 -F /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/Library/Frameworks ${__dirname}/print-members-${module}.swift`, {encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe']})

let swiftModule
eval('swiftModule = {' + swiftModuleMembers + '}')

let optionals = []
let renames = []

for(let className in swiftModule) {
    let foundClass = getClass(className)
    if(!foundClass) {/*console.log('notfound', className);*/continue}
    console.log('-------------------', className)

    let swift = swiftModule[className]
    let instance = null
    let classMapping = miojslibsMapping[className]

    let iteratedPropNames = {}

    for(let i = 0; i < swift.length; i += 3) {
        let propName = swift[i]
        let isOptional = swift[i + 1]
        let optionalParams = swift[i + 2]

        if(iteratedPropNames[propName]) continue
        iteratedPropNames[propName] = true

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

fs.writeFileSync(`${__dirname}/miojslibs-optionals-${module}.json`, JSON.stringify(optionals))
fs.writeFileSync(`${__dirname}/miojslibs-renames-${module}.json`, JSON.stringify(renames))