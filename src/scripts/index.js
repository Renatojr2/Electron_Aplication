const {ipcRenderer} = require('electron')


document.querySelector('form').addEventListener('submit', (event)=>{
  event.preventDefault()
  const {value} = document.querySelector('textarea')
  ipcRenderer.send('comment', value)
})