const startScreen = document.querySelector('.start-screen')
const battleScreen = document.querySelector('.battle-screen-container')
const battleMessages = document.querySelector('.battle-message-container')

// Button containers

const actionBtns = document.querySelector('.action-buttons-container')
const breakBtns = document.querySelector('.break-buttons-container')

// Flow buttons

const startBtn = document.getElementById('start-button')
const resetBtn = document.getElementById('reset-button')
const continueBtn = document.getElementById('continue-button')

// Action buttons

const actionBtn1 = document.getElementById('action-1')
const actionBtn2 = document.getElementById('action-2')
const actionBtn3 = document.getElementById('action-3')
const actionBtn4 = document.getElementById('action-4')

// Event listeners

startBtn.addEventListener('click', ()=>{
  startScreen.style.display = 'none'
  startBtn.style.display = 'none'
  battleScreen.style.display = 'block'
  battleMessages.style.display = 'block'
  actionBtns.style.display = 'flex'
})