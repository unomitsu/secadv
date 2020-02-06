// app :{ application をコントロールするモジュール }
// BrowserWindow :{ window を作成するモジュール }
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 850,
    height: 680,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')
  //win.loadFile('./asset/databases/test.html')
}

// Electron の初期化完了後に実行
app.on('ready', createWindow)
