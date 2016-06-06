'use strict';

const {
	app,
	BrowserWindow,
	globalShortcut
} = require('electron');

let mainWindow;

app.on('ready', function() {
	mainWindow = new BrowserWindow({
		frame: false,
		height: 700,
		resizable: false,
		width: 368
	});

	mainWindow.loadURL('file://' + __dirname + '/app/index.html');

	globalShortcut.register('ctrl+shift+1', function() {
		mainWindow.webContents.send('global-shortcut', 0);
	});
	globalShortcut.register('ctrl+shift+2', function() {
		mainWindow.webContents.send('global-shortcut', 1);
	});
});

const {ipcMain} = require('electron');

ipcMain.on('close-main-window', (event, msg) => {
	app.quit();
});

var settingWindow = null;
ipcMain.on('open-setting-window', () => {
  if (settingWindow) {
    return;
  }

  settingWindow = new BrowserWindow({
    frame: false,
    height: 200,
    resizable: false,
    width: 200
  });
  settingWindow.loadURL('file://' + __dirname + '/app/settings.html');
  settingWindow.on('closed', () => {
    settingWindow = null;
  });
});

ipcMain.on('close-settings-window', () => {
  if (settingWindow) {
    settingWindow.close();
  }
});
