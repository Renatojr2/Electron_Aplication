const {ipcRenderer} = require('electron')



ipcRenderer.on('comment', (event, comment)=>{
  const render = document.querySelector('.render')
  const p = document.createElement('p')
  const text = document.createTextNode(comment)

  p.appendChild(text)
  render.appendChild(p)
})