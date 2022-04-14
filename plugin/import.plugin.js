import { Visitor } from "@swc/core/Visitor.js"
// import { parseSync } from '@swc/core'
// import { extname } from 'path'
// const codeTemplate = (fnName, filename) => `
//   if (module.hot) {
//     module.hot.accept('${filename}', () => {
//       ${fnName}()
//     })
//   }
// `
// const coverSrc = './sourceCode/src'
export default class ImportReplace extends Visitor {
  // fileType
  // fileName

  // constructor(type, fileName) {
  //   super()
  //   this.fileType = type
  //   this.fileName = fileName
  // }

  visitModule(module) {
    const body = module.body
    const newBody = []
    if (!body) return module
    for (let i = 0; i < body.length; i++) {
      const bodyItem = body[i]
      if (!(bodyItem.type == 'ImportDeclaration' && (bodyItem.source.value == 'react' || bodyItem.source.value == 'react-dom'))) {
        // if (bodyItem.type == 'ImportDeclaration') {
        //   // 是文件类型的
        //   // extname(coverSrc + )
        //   bodyItem.source.value += this.fileType
        // }
        newBody.push(bodyItem)
      }
      // if (bodyItem.type == 'ExportDefaultExpression') {
      //   const fnName = bodyItem.expression.value
      //   const makeHotInjectCode = codeTemplate(fnName, this.fileName)
      //   const ast = parseSync(makeHotInjectCode)
      //   console.log(ast)
      //   if (ast && ast.body && ast.body[0]) {
      //     newBody.push(ast.body[0])
      //   }
      // }
    }
    module.body = newBody
    return module
  }
}