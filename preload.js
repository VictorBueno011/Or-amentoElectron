const { contextBridge, ipcRenderer } = require('electron');

// Expor o ipcRenderer ao renderizador de forma segura
contextBridge.exposeInMainWorld('ipcRenderer', {
    invoke: (channel, data) => ipcRenderer.invoke(channel, data)
});
