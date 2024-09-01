const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function getAppVersion() {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return packageJson.version;
}

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),  // Inclua o arquivo preload
            contextIsolation: true,  // Ativar contextIsolation
            enableRemoteModule: false,  // Desativar o módulo remoto
            nodeIntegration: false,  // Desativar nodeIntegration por segurança
            sandbox: true  // Melhorar a segurança
        }
    });

    win.loadFile('index.html');
    console.log(`App Version: ${getAppVersion()}`);
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

// No processo principal, você usa ipcMain para lidar com a comunicação.
ipcMain.handle('get-app-version', () => {
    return getAppVersion();
});
