'use strict';

const {app, BrowserWindow} = require('electron');

require('electron-debug')({
  showDevTools: false
});

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		frame: false,
		height: 700,
		width: 368,
    resizable: false
	});

	mainWindow.loadURL('file://' + __dirname + '/app/index.html');
}

app.on('ready', createWindow);

