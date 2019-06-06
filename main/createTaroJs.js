const fs = require('fs');
const vscode = require('vscode');
const writeAppJs = require('./writeAppJs');
const vsWindow = vscode.window;
function writeAppJsFile(filepath, filename) {
    let folders = vscode.workspace.workspaceFolders;
    if (!folders) { return }

    folders.forEach((item)=>{

        if(filepath.indexOf(item.uri.fsPath)>-1){
            let tempPath=filepath.replace(/\\/ig,'/')+'/';
            let srcIndex=tempPath.indexOf('/src/')
            if(srcIndex>-1){
               let basePath=tempPath.slice(0,srcIndex+'/src/'.length);
               let pageurl=tempPath.slice(srcIndex+'/src/'.length,tempPath.length);
               writeAppJs.wirteAppJsFile(basePath,pageurl+filename)
            }
            
            
        }
    })
   



}
function createFile(filepath, filename) {
    let url = filepath + '/' + filename + '.js'
    if (fs.existsSync(url)) {
        vsWindow.showInformationMessage('目标文件已存在');
        return;
    }
    let tempArr = filename.split('');
    tempArr[0] = tempArr[0].toLocaleUpperCase()
    writeAppJsFile(filepath, filename)

    fs.writeFileSync(url, makeTaroJS(tempArr.join('')))


}
function makeTaroJS(filename) {
    return `import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

export default class ${filename} extends Component {

    config = {
    navigationBarTitleText: '首页'
    }

    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    render() {
    return (
        <View className='index'>
            <Text>Hello world!</Text>
        </View>

    )
    }
}
    `

}
module.exports = {
    createFile
}