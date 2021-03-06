// app :{ application をコントロールするモジュール }
// BrowserWindow :{ window を作成するモジュール }
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')
}

// Electron の初期化完了後に実行
app.on('ready', createWindow)
