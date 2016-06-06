'use strict';

const {app, BrowserWindow} = require('electron')
const {globalShortcut} = require('electron')

let mainWindow

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        frame: false,
        height: 700,
        resizable: false,
        width: 368
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    globalShortcut.register('ctrl+shift+1', () => {
      mainWindow.webContents.send('global-shortcut', 0); 
    });
    
    globalShortcut.register('ctrl+shift+2', () => {
      mainWindow.webContents.send('global-shortcut', 1); 
    });
});

const {ipcMain} = require('electron');

ipcMain.on('close-main-window', function () {
    app.quit();
});
