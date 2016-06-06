'use strict';

const {
	app,
	BrowserWindow,
	globalShortcut
} = require('electron');

let mainWindow;

const configuration = require('./configuration');

app.on('ready', function() {
  if (!configuration.readSettings('shortcutKeys')) {
    configuration.saveSettings('shortcutKeys', ['ctrl', 'shift']);
  } 

	mainWindow = new BrowserWindow({
		frame: false,
		height: 700,
		resizable: false,
		width: 368
	});

	mainWindow.loadURL('file://' + __dirname + '/app/index.html');
  
  setGlobalShortCuts();
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

function setGlobalShortCuts() {
  globalShortcut.unregisterAll();

  var shortcutKeySettings = configuration.readSettings('shortcutKeys');
  var shortcutPrefix = shortcutKeySettings.length === 0 ? '' : shortcutKeySettings.join('+') + '+';

	globalShortcut.register(shortcutPrefix + '1', function() {
		mainWindow.webContents.send('global-shortcut', 0);
	});
	globalShortcut.register(shortcutPrefix + '2', function() {
		mainWindow.webContents.send('global-shortcut', 1);
	});
}

ipcMain.on('set-global-shortcuts', () => {
  setGlobalShortCuts();
});
