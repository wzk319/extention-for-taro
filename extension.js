// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const createTaroJs = require('./main/createTaroJs');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "extention-for-taro" is now active!');
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.cratePage', function (e) {
		// The code you place here will be executed every time your command is executed
		console.log(e)
		// let folders=vscode.workspace.workspaceFolders;
	
		// Display a message box to the user
		vscode.window.showInputBox({
			placeHolder: "请输入文件名字母数字",
			validateInput: function (value) {

				return /^[A-Za-z][A-Za-z0-9]{0,}/.test(value) ? null : '字母开头,字母数字';

			}
		}).then((str) => {
			createTaroJs.createFile(e.fsPath, str)
		})

	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
