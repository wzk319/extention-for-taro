
const babylon = require('babylon')
const fs = require('fs');
const traverse = require('babel-traverse')
const t = require('babel-types')
const generator = require('babel-generator')

function wirteAppJsFile(srcUrl, pageUrl) {
  let appJsUrl = srcUrl+ 'app.js';
  if (!fs.existsSync(appJsUrl)) {
    return;
  }

  let jsCode = fs.readFileSync(appJsUrl).toString();
  // console.log(jsCode)
  const ast = babylon.parse(jsCode, {
    // parse in strict mode and allow module declarations
    sourceType: "module",

    plugins: [
      // enable jsx and flow syntax
      "jsx",
      "flow",
      "classProperties"
    ]
  })
  traverse.default(ast, {
    enter(path) {
      //  if(t.isArrayExpression(path.node)){
      //    console.log(path,'\n--------')

      //  }
      if (t.isIdentifier(path.node, { name: "pages" })) {
        // path.node.name = "x";
        if(pageUrl){
          path.container.value.elements.push({
            type: 'StringLiteral',
            value: pageUrl
          })
        }
       

      }
    }
  });
  // console.log(ast)
  let code = generator.default(ast, {
    retainLines:true
  }, jsCode)
  fs.writeFileSync(appJsUrl,code.code)
}
module.exports={
  wirteAppJsFile
}

