'use strict';

var soundButtons = document.querySelectorAll('.button-sound');

for (var i = 0; i < soundButtons.length; i++) {
  var soundButton = soundButtons[i];
  var soundName = soundButton.attributes['data-sound'].value;

  prepareButton(soundButton, soundName);
}

function prepareButton(buttonEl, soundName) {
  buttonEl.querySelector('span').style.backgroundImage = 'url("img/icons/' + soundName + '.png")';

  var audio = new Audio(__dirname + '/wav/' + soundName + '.wav');
  buttonEl.addEventListener('click', function() {
    audio.currentTime = 0;
    audio.play();
  });
}

const {
  ipcRenderer
} = require('electron');

var closeEl = document.querySelector('.close');
closeEl.addEventListener('click', function() {
  ipcRenderer.send('close-main-window');
});

ipcRenderer.on('global-shortcut', (event, arg) => {
  var event_click = new MouseEvent('click');
  soundButtons[arg].dispatchEvent(event_click);
});

var settingEl = document.querySelector('.settings');
settingEl.addEventListener('click', () => {
  ipcRenderer.send('open-settings-window');
});

const {
  Tray,
  Menu
} = require('electron').remote;

const path = require('path');

var trayIcon = null;
if (process.platform === 'darwin') {
  trayIcon = new Tray(path.join(__dirname, 'img/tray-iconTemplate.png'));
} else {
  trayIcon = new Tray(path.join(__dirname, 'img/tray-icon-alt.png'));
}

var trayMenuTemplate = [{
  label: 'Sound Machine',
  enabled: false
}, {
  label: 'Settings',
  click: () => {
    ipcRenderer.send('open-settings-window');
  }
}, {
  label: 'Quit',
  click: () => {
    ipcRenderer.send('close-main-window');
  }
}];

var trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
trayIcon.setContextMenu(trayMenu);
