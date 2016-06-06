'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

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

