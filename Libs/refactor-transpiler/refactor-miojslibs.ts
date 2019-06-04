import { Project, BinaryExpression, PropertyDeclaration, ParameterDeclaration, ClassInstancePropertyTypes, ReferencedSymbol, SetAccessorDeclaration, GetAccessorDeclaration, ReturnStatement } from "ts-morph"
import fs = require('fs')

const module = process.argv[2]

const optionals = require(`./miojslibs-optionals-${module}.json`)
const renames = require(`./miojslibs-renames-${module}.json`)

const project = new Project({
  tsConfigFilePath: `${__dirname}/../${module === 'uikit' ? 'UIKit' : 'Foundation'}/tsconfig.json`
})

function getReferences(chain: string[]): ReferencedSymbol[] {
  let chained: any = project
  for(let i = 0; i < chain.length; i += 2) {
    if(!chained) break
    if(!i) chain[i + 1] = `${module === 'uikit' ? 'UIKit' : 'foundation'}.web.ts`
    if(typeof chain[i + 1] === 'string') chained = chained[chain[i]](chain[i + 1])
    else chained = chained[chain[i]]
  }
  if(!chained) return []

  let property = chained as ParameterDeclaration | ClassInstancePropertyTypes
  //console.log(chain)
  return property.findReferences()
}

let replacements = []

for(let optional of optionals) {
  //console.log('----------------------')
  //console.log(optional)
  let ok = optional[optional.length - 1] === 'window'
  for(const referencedSymbol of getReferences(optional)) {
    for(let reference of referencedSymbol.getReferences()) {

      console.log('---')
      console.log(reference.getNode().getStartLineNumber())
      let par = reference.getNode()
      while(par) {
        //console.log(par.getKindName())
        par = par.getParent()
      }

      let isParameter = reference.getNode().getParent().getKindName() === 'Parameter'
      if(isParameter) {
        continue
      }

      let isPropertySignature = reference.getNode().getParent().getKindName() === 'PropertySignature'//prop declaration in interface
      if(isPropertySignature) {
        continue
      }

      let isGetAccessor = reference.getNode().getParent().getKindName() === 'GetAccessor'
      let isSetAccessor = reference.getNode().getParent().getKindName() === 'SetAccessor'
      if(isGetAccessor) {
        let getAccessor = reference.getNode().getParent() as GetAccessorDeclaration
        for(let child of getAccessor.getBody().getChildSyntaxList().getChildren()) {
          //TODO should be tree traversal, not list traversal (we're only catching top-level return statements)
          if(child.getKindName() === 'ReturnStatement') {
            let expression = (child as ReturnStatement).getExpression()
            replacements.push({
              file: reference.getSourceFile().getFilePath(),
              range: [expression.getStart(), expression.getStart()],
              text: '_injectIntoOptional('
            }, {
              file: reference.getSourceFile().getFilePath(),
              range: [expression.getEnd(), expression.getEnd()],
              text: ')'
            })
          }
        }
        continue
      }
      if(isSetAccessor) {
        let setAccessor = reference.getNode().getParent() as SetAccessorDeclaration
        let arg = setAccessor.getParameters()[0].getText()
        if(arg.includes(':')) arg = arg.slice(0, arg.indexOf(':'))
        replacements.push({
          file: reference.getSourceFile().getFilePath(),
          range: [setAccessor.getBody().getStart() + 1, setAccessor.getBody().getStart() + 1],
          text: `${arg} = ${arg}[0]\n`
        })
        continue
      }

      let isDeclaration = reference.getNode().getParent().getKindName() === 'PropertyDeclaration'
      if (isDeclaration) {
        let declaration = reference.getNode().getParent() as PropertyDeclaration
        if(declaration.getInitializer()) {
          replacements.push({
            file: reference.getSourceFile().getFilePath(),
            range: [declaration.getInitializer().getStart(), declaration.getInitializer().getStart()],
            text: "_injectIntoOptional("
          }, {
            file: reference.getSourceFile().getFilePath(),
            range: [declaration.getInitializer().getEnd(), declaration.getInitializer().getEnd()],
            text: ")"
          })
        }
        continue
      }
  
      let isAssignment = false
      let nodeOrParent = reference.getNode()
      if(nodeOrParent.getParent().getKindName() === 'PropertyAccessExpression') nodeOrParent = nodeOrParent.getParent()
      if(nodeOrParent.getParent().getKindName() === 'BinaryExpression') {
        let bin = nodeOrParent.getParent() as BinaryExpression
        if (bin.getOperatorToken().getText().trim() === '=' && bin.getLeft() === nodeOrParent) {
          isAssignment = true
          replacements.push({
            file: reference.getSourceFile().getFilePath(),
            range: [bin.getRight().getStart(), bin.getRight().getStart()],
            text: "_injectIntoOptional("
          }, {
            file: reference.getSourceFile().getFilePath(),
            range: [bin.getRight().getEnd(), bin.getRight().getEnd()],
            text: ")"
          })
        }
      }
      if (isAssignment) continue
  
      //TODO custom rules
  
      replacements.push({
        file: reference.getSourceFile().getFilePath(),
        range: [reference.getNode().getStart(), reference.getNode().getEnd()],
        text: reference.getNode().getText() + "[0]"
      })
    }
  }
}

for(let rename of renames) {
  for(const referencedSymbol of getReferences(rename.chain)) {
    for(let reference of referencedSymbol.getReferences()) {
      replacements.push({
        file: reference.getSourceFile().getFilePath(),
        range: [reference.getNode().getStart(), reference.getNode().getEnd()],
        text: rename.rename
      })
    }
  }
}

replacements.sort((a, b) => a.range[0] < b.range[1] ? 1 : -1)

//console.log(replacements)

for(let replacement of replacements) {
  let file = project.getSourceFile(replacement.file)

  file.replaceText(replacement.range, replacement.text)
}

/*for(let sourceFile of project.getSourceFiles()) {
  let path = sourceFile.getFilePath()
  let i = path.indexOf('/Libs/UIKit/source/')
  if(i < 0) continue
  path = path.slice(i + '/Libs/UIKit/source/'.length)
  path = `${__dirname}/../dist/${path}`
  let dir = path.slice(0, path.lastIndexOf('/'))
  if(!fs.existsSync(dir)) fs.mkdirSync(dir)
  fs.writeFileSync(path, sourceFile.getText())
}*/

project.emit()