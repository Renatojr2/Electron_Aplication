const { app, BrowserWindow, Menu, ipcMain } = require('electron')

let win
let commentWindow

function createWindow () {
  win = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('./src/index.html')
}

function createNewWindow () {
  commentWindow = new BrowserWindow({
    height: 300,
    width: 500,
    title: 'Adicionar comentarios',
    webPreferences: {
      nodeIntegration: true
    }
  })

  commentWindow.loadURL(`file://${__dirname}/comment.html`)
  commentWindow.on('closed', () => commentWindow = null)
}

app.whenReady().then(createWindow)

const menuTamplete = [
  {
    label: 'Menu',
    submenu: [
      {
        label: 'Adicionar',
        accelerator: 'Alt+A',
        click () {
          createNewWindow()
        }
      },
      {
        label: 'Sair',
        // criar atalhos adicionando accelerator
        accelerator: 'Alt+F4',
        click () {
          app.quit()
        }
      }
    ]
  }
]
app.on('ready', () => {
  const menu = Menu.buildFromTemplate(menuTamplete)
  Menu.setApplicationMenu(menu)
})

if (process.env.NODE_ENV !== 'production') {
  menuTamplete.push({
    label: 'Dev',
    submenu: [
      {role: 'reload'},
      {
        label: 'Debbug',
        accelerator: 'Ctrl+Shift+I',
        click (item, focuseWindow) {
          focuseWindow.toggleDevTools()
        }
      }
    ]
  })
}

//event
ipcMain.on('comment', (event, comment)=>{
  win.webContents.send('comment', comment)
  commentWindow.close()
})