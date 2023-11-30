// CONSTANTS

// ***** Character Classes Start Here *****

// Character Base Class

class Character {
  constructor(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4) {
    this.name = name
    this.attack = attack
    this.defense = defense
    this.hitPoints = hitPoints
    this.attackAcc = attackAcc
    this.buffAcc = buffAcc
    this.useAct1 = useAct1
    this.useAct2 = useAct2
    this.useAct3 = useAct3
    this.useAct4 = useAct4
  }
}

// Player Class

class Player extends Character {
  constructor(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4) {
    super(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4)
  }

  bark() {
    if (this.useAct1 > 0) {
      if ((playerSleepCounter === 0) && (playerStunCounter === 0)) {
        if (Math.random() < this.buffAcc) {
          let attackIncrease = randomizer(1, 3)
          this.attack = this.attack + attackIncrease
          this.useAct1 = this.useAct1 - 1
          battleMessages.textContent = `${player.name} uses bark! ${player.name}'s attack increased by ${attackIncrease}.`
        }  else {
            battleMessages.textContent = `${player.name} tries to bark, but his throat is sore!`
        }
      } 
      renderPlayerUpdates()
    } else {
      battleMessages.textContent = `${player.name} is out of barks! Pick another action.`
    }
  }

  bite(target) {
    if (this.useAct2 > 0){
      if ((playerSleepCounter === 0) && (playerStunCounter === 0)) {
        if (Math.random() < this.attackAcc) {
          let attackDamage = randomizer(this.attack + 2, this.attack + 4)
          target.hitPoints = target.hitPoints - attackDamage
          this.useAct2 = this.useAct2 - 1
          battleMessages.textContent = `${player.name} bites ${enemyArr[0].name}!  Causes ${attackDamage} damage.`
        } else {
          battleMessages.textContent = `${player.name} tries to bite ${enemyArr[0].name} but misses!`
        }
      } renderPlayerUpdates()
    } else {
      battleMessages.textContent = `${player.name} is out of bites! Pick another action.`
    }
  }

  dash(target) {
    if (this.useAct3 > 0) {
      if ((playerSleepCounter === 0) && (playerStunCounter === 0)) {
        if (Math.random() < this.attackAcc) {
          let attackDamage = randomizer (this.attack, this.attack + 2)
          let defenseDecrease = randomizer (1, 2)
          target.hitPoints = target.hitPoints - attackDamage
          if ((target.defense - defenseDecrease) >= 0) {
            target.defense = target.defense - defenseDecrease
          }
          this.useAct3 = this.useAct3 - 1
          battleMessages.textContent = `${player.name} dashes at ${enemyArr[0].name}! Causes ${attackDamage} damage and lowers defense by ${defenseDecrease}.`
        } else {
          battleMessages.textContent = `${player.name} dashes at ${enemyArr[0].name}, but misses!`
        }
      }
      renderPlayerUpdates()
    } else {
      battleMessages.textContent = `${player.name} is out of dashes! Pick another action.`
    }
  }

  cuteness(target) {
    if (this.useAct4 > 0) {
      if ((playerSleepCounter === 0) && (playerStunCounter === 0)) {
        if (Math.random() < this.attackAcc) {
          let accuracyDecrease = randomizer(1, 2)/10
          target.attackAcc = target.attackAcc - accuracyDecrease
          this.useAct4 = this.useAct4 - 1
          battleMessages.textContent = `${player.name} unleashes his cuteness! ${enemyArr[0].name}'s accuracy decreases by ${accuracyDecrease}.`
        } else {
          battleMessages.textContent = `${player.name} unleashes his cuteness, but ${enemyArr[0].name} is not impressed.`
        }
      } 
      renderPlayerUpdates()
    } else {
      battleMessages.textContent = `${player.name} has no more cuteness left to give. Pick another action.`
    }
  }
}

// First Enemy Class

class Enemy1 extends Character {
  constructor(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4) {
    super(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4)
  }

  canteenSwill() {
   
    if (Math.random() < this.buffAcc) {
      let increaseDamage = randomizer(1, 3)
      this.attack = this.attack + increaseDamage
      let healthDecrease = randomizer(1, 3)
      this.hitPoints = this.hitPoints - healthDecrease
      this.useAct1 = this.useAct1 - 1
      battleMessages.textContent = `${enemyArr[0].name} takes a swill of his canteen! ${enemyArr[0].name}'s attack is raised by ${increaseDamage} and he lost ${healthDecrease} health.` 
    } else {battleMessages.textContent = `${enemyArr[0].name} tries to swill from his canteen, but spills it instead!`}
}

  loreDump(target) {
    if (Math.random() < this.attackAcc - .2) {
      playerSleepCounter = playerSleepCounter + 3
      this.useAct2 = this.useAct2 - 1
      battleMessages.textContent = `${enemyArr[0].name} uses lore dump! ${player.name} is so bored he falls asleep.`
    } else {battleMessages.textContent= `${enemyArr[0].name} uses lore dump, but ${player.name} wants to know more!`}
  }

  epicThrust(target) { 
    enemyChargeCounter++
    if (enemyChargeCounter === 1) {
      battleMessages.textContent = `${enemyArr[0].name} is charging up an attack!`
    } else if (enemyChargeCounter === 2) {
        if(Math.random() < this.attackAcc) {
        let attackDamage = randomizer(this.attack + 5, this.attack + 7)
        target.hitPoints = target.hitPoints - attackDamage
        enemyChargeCounter = 0
        this.useAct3 = this.useAct3 - 1
        battleMessages.textContent = `${enemyArr[0].name} strikes ${player.name} with epic thrust! The attack does ${attackDamage} damage.` 
        } else {
          battleMessages.textContent = `${enemyArr[0].name} unleashes an epic thrust, but ${player.name} evades!`
          enemyChargeCounter = 0
        }
    }
  }

  halfHeartedSwipe(target) {

    if (Math.random() < this.attackAcc) {
      let attackDamage = randomizer(this.attack + 50, this.attack + 52)
      target.hitPoints = target.hitPoints - attackDamage
      this.useAct4 = this.useAct4 - 1
      battleMessages.textContent = `${enemyArr[0].name} performs a half hearted swipe! Does ${attackDamage} damage.`
    } else {
      battleMessages.textContent = `${enemyArr[0].name} attempts a half hearted swipe, but misses!`}
  }
}

// Second Enemy Class

class Enemy2 extends Character {
  constructor(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4) {
    super(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4)
  }

  signAutograph(target) {
  
  }

  burningDesire(target) {

  }

  breakDance() {

  }

  hitTheHighNote(target) {

  }
}

// Third Enemy Class

class Enemy3 extends Character {
  constructor(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4) {
    super(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4)
  }

  scoff(target) {

  }

  bribe(target) {

  }

  nepotism() {

  }

  shockedExpression(target) {

  }
}

// Fourth Enemy Class

class Enemy4 extends Character {
  constructor(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4) {
    super(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4)
  }

  hideInBox(target) {

  }

  cqc(target) {

  }

  landmine(target) {

  }

  tranqDart(target) {

  }
}

// Fifth Enemy Class

class Enemy5 extends Character {
  constructor(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4) {
    super(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4)
  }

  maniacalLaugh(target) {

  }

  bloodOnTheRocks() {

  }

  psychicBark(target) {

  }

  vampireBite(target) {

  }
}

// Sixth Enemy Class

class Enemy6 extends Character {
  constructor(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4) {
    super(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4)
  }

  squirtBottle(target) {

  }

  crate(target) {

  }

  vacuum(target) {

  }

  groomer(target) {

  }
}

// ****** Character Instantiations Start Here ******

// name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4

// Little Bax

const player = new Player('Little Bax', 15, 5, 50, .95, .9, 3, 12, 12, 3)

// Baxter the Malcontent

const enemy1 = new Enemy1('Baxter the Malcontent', 5, 0, 30, .8, .8, 5, 5, 2, 18)

// Baxtreet Boy

const enemy2 = new Enemy2('Baxtreet Boy', 7, 0, 40, .85, .9, 12, 5, 10, 3)

// Fancy Pants Bax

const enemy3 = new Enemy3('Fancy Pants Bax', 5, 5, 50, .9, .8, 10, 17, 3, 5)

// Metal Gear Bax

const enemy4 = new Enemy4('Metal Gear Bax', 10, 0, 60, .9, .9, 7, 15, 1, 7)

// Count Baxula

const enemy5 = new Enemy5('Count Baxula', 10, 7, 40, .9, .9, 5, 5, 10, 10)

// Baxter Prime

const enemy6 = new Enemy6('Baxter Prime', 10, 5, 70, .95, .9, 10, 5, 12, 3)

// STATE VARIABLES

let playerSleepCounter

let playerStunCounter

let playerChargeCounter

let enemySleepCounter

let enemyStunCounter

let enemyChargeCounter

let enemyArr

let enemyImageArr

let backgroundImageArr

let turn

let winner

// CACHE ELEMENTS

// Screen containers
const startScreen = document.querySelector('.start-screen')
const gameOverScreen = document.querySelector('.game-over-screen')
const victoryScreen = document.querySelector('.victory-screen')
const gameCompletionScreen = document.querySelector('.game-completion-screen')

// Content containers
const battleScreen = document.querySelector('.battle-screen-container')
const combatantScreen = document.querySelector('.combatant-screen-container')
const enemyHealth = document.getElementById('enemy-healthbar')
const playerHealth = document.getElementById('player-healthbar')
const enemyName = document.getElementById('enemy-name')
const playerName = document.getElementById('player-name')
const enemyImage = document.getElementById('enemy-image')
const playerImage = document.getElementById('player-image')
const battleMessages = document.querySelector('.battle-message-text')
const battleMessageContainer = document.querySelector('.battle-message-container')

// Gameflow Initiation buttons
const startBtn = document.getElementById('start-button')
const resetBtn = document.getElementById('reset-button')
const continueBtn = document.getElementById('continue-button')
const tryAgainBtn = document.getElementById('try-again-button')

// Action buttons
const actionBtns = document.querySelector('.action-buttons-container')
const actionBtn1 = document.getElementById('action-1')
const actionBtn2 = document.getElementById('action-2')
const actionBtn3 = document.getElementById('action-3')
const actionBtn4 = document.getElementById('action-4')

// EVENT LISTENERS

startBtn.addEventListener('click', ()=>{
  initFirstBattle()
  init()
})

actionBtn1.addEventListener('click', ()=>{
  setTimeout(() => {player.bark()}, 2000)
})

actionBtn2.addEventListener('click', ()=>{
  setTimeout(() => {player.bite(enemyArr[0])}, 2000)
})

actionBtn3.addEventListener('click', ()=>{
  setTimeout(() => {player.dash(enemyArr[0])}, 2000)
})

actionBtn4.addEventListener('click', ()=>{
  setTimeout(() => {player.cuteness(enemyArr[0])}, 2000)
})

// FUNCTIONS

// Initializer functions

function init() {
  initBattleBtns()
  initPlayerStats()
  initEnemy()
  initBattleDisplay()
  initBattleStatus()
}

function initBattleBtns() {
  actionBtn1.innerHTML = `<span class="action-command">Bark</span><br /> Uses Left: ${player.useAct1}`
  actionBtn2.innerHTML = `<span class="action-command">Bite</span><br /> Uses Left: ${player.useAct2}`
  actionBtn3.innerHTML = `<span class="action-command">Dash</span><br /> Uses Left: ${player.useAct3}`
  actionBtn4.innerHTML = `<span class="action-command">Cuteness</span> <br />Uses Left: ${player.useAct4}`
}

function initPlayerStats() {
  playerName.textContent = `${player.name}`
  player.attack = 15
  player.defense = 5
  player.hitPoints = 50
  player.attackAcc = .95
  player.buffAcc = .9
  player.useAct1 = 3
  player.useAct2 = 12
  player.useAct3 = 12
  player.useAct4 = 3
  playerHealth.textContent = `${player.hitPoints}`
  playerChargeCounter = 0
  playerSleepCounter = 0
  playerStunCounter = 0
}

function initEnemy() {
  enemyName.textContent = `${enemyArr[0].name}`
  enemyHealth.textContent = `${enemyArr[0].hitPoints}`
  enemyImage.src = 'https://i.imgur.com/8zvUb4o.png'
  enemyChargeCounter = 0
  enemySleepCounter = 0
  enemyStunCounter = 0
}

function initBattleDisplay() {
  startScreen.style.display = 'none'
  gameOverScreen.style.display = 'none'
  victoryScreen.style.display = 'none'
  gameCompletionScreen.style.display = 'none'
  battleScreen.style.display = 'flex'
}

function initBattleStatus() {
  turn = 1
  winner = null
}

function initFirstBattle() {
  enemyArr = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6]
}

function initNextBattle() {
  enemyArr.shift()
}

// Randomizer Function

function randomizer(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function renderPlayerUpdates() {

  playerHealth.textContent = `${player.hitPoints}`

  actionBtn1.innerHTML = `<span class="action-command">Bark</span><br /> Uses Left: ${player.useAct1}`
  actionBtn2.innerHTML = `<span class="action-command">Bite</span><br /> Uses Left: ${player.useAct2}`
  actionBtn3.innerHTML = `<span class="action-command">Dash</span><br /> Uses Left: ${player.useAct3}`
  actionBtn4.innerHTML = `<span class="action-command">Cuteness</span> <br />Uses Left: ${player.useAct4}`

  if (playerSleepCounter > 0) {
    if (playerSleepCounter === 1) {
      battleMessages.textContent = `${player.name} wakes up!`
      playerSleepCounter = playerSleepCounter - 1
    } else {
      battleMessages.textContent = `${player.name} is fast asleep.`
      playerSleepCounter = playerSleepCounter - 1
    }
  }

  if (playerStunCounter > 0) {
    if (playerStunCounter === 1) {
      battleMessages.textContent = `${player.name} is stunned!`
      playerStunCounter--
    } else {
      battleMessages.textContent = `${player.name} snaps out of it!`
      playerStunCounter--}
    }

  renderEnemyUpdates()

  checkWinner()

  setTimeout(() => {fightRound()}, 2000)
}

function renderEnemyUpdates() {
  
  enemyHealth.textContent = `${enemyArr[0].hitPoints}`

  if (enemySleepCounter > 0) {
    if (enemySleepCounter === 1) {
      setTimeout(() => {battleMessages.textContent = `${enemyArr[0].name} wakes up!`}, 2000)
      enemySleepCounter = enemySleepCounter - 1
      return enemySleepCounter
    } else {
      setTimeout(() => {battleMessages.textContent = `${enemyArr[0].name} is fast asleep.`}, 2000)
      enemySleepCounter = enemySleepCounter - 1
      return enemySleepCounter
    }
  }

  if (enemyStunCounter > 0) {
    if (enemyStunCounter === 1) {
      setTimeout(() => {
      battleMessages.textContent = `${enemyArr[0].name} is stunned!`
      enemyStunCounter--}, 2000)
      return enemyStunCounter
    } else {
      setTimeout(() => {
      battleMessages.textContent = `${enemyArr[0].name} snaps out of it!`
      enemyStunCounter--}, 2000)
      return enemyStunCounter
    }
  }
}
// find a way to get to victory screen

function checkWinner() {

  if (enemyArr[0].hitPoints <= 0) {
    setTimeout(() => {
    battleMessages.textContent = `${enemyArr[0].name} cowers in fear. ${player.name} wins!`
    winner = player
    declareWinner()
    }, 2000)
  }

  if (player.hitPoints <= 0) {
    setTimeout(() => {
    battleMessages.textContent = `${player.name} hides behind the couch!  ${player.name} has lost the battle.`
    winner = enemyArr[0]
    declareWinner()
    }, 2000)
  } 
}

function declareWinner() {
  if (winner === player) {
    setTimeout(() => {
      battleScreen.style.display = 'none'
      victoryScreen.style.display = 'flex'
    }, 2000)
  } else {
    setTimeout(() => {
      battleScreen.style.display = 'none'
      gameOverScreen.style.display = 'flex'
    }, 2000)  
  }
}

function fightRound() {

  if ((enemySleepCounter === 0) && (enemyStunCounter === 0) && (winner === null)) {

    if (enemyArr[0] === enemy1) {
      fightRound1()
    }
    if (enemyArr[0] === enemy2) {
      fightRound2()
    }
    if (enemyArr[0] === enemy3) {
      fightRound3()
    }
    if (enemyArr[0] === enemy4) {
      fightRound4()
    }
    if (enemyArr[0] === enemy5) {
      fightRound5()
    }
    if (enemyArr[0] === enemy6) {
      fightRound6()
    }
  }
}  
 
function fightRound1() {
  
  if (enemyChargeCounter > 0) {
    enemy1.epicThrust(player)
  } else {

  if (enemy1.hitPoints < 15) {
    if ((Math.random() > .5) && (enemy1.useAct1 > 0) && (enemy1.hitPoints > 5)) {
      enemy1.canteenSwill()
    } else if (enemy1.useAct3 > 0) {
      enemy1.epicThrust(player)
    } else if ((enemy1.useAct1 > 0) && (enemy1.hitPoints > 5)) {
      enemy1.canteenSwill()
    } else {
      if ((Math.random() > .5) && (enemy1.useAct2 > 0) && (playerSleepCounter === 0)) {
        enemy1.loreDump(player)
      } else if (enemy1.useAct4 > 0) {
        enemy1.halfHeartedSwipe(player)
      } else if ((enemy1.useAct2 > 0) && (playerSleepCounter === 0)) {
        enemy1.loreDump(player)
      }
      else {battleMessages.textContent = `${enemy1.name} skips turn!`}
    }
  }

  if (enemy1.hitPoints > 15) {
    if ((Math.random() > .5) && (enemy1.useAct2 > 0) && (playerSleepCounter === 0)) {
      enemy1.loreDump(player)
    } else if (enemy1.useAct4 > 0) {
      enemy1.halfHeartedSwipe(player)
    } else if ((enemy1.useAct2 > 0) && (playerSleepCounter === 0)) {
      enemy1.loreDump(player)
    } else if (enemy1.useAct3 > 0) {
      enemy1.epicThrust(player)
    } else if ((enemy1.useAct1 > 0) && (enemy1.hitPoints > 5)) {
      enemy1.canteenSwill()
    } else {
      battleMessages.textContent = `${enemy1.name} skips turn!`
    }
  }
  }

  playerHealth.textContent = `${player.hitPoints}`
  enemyHealth.textContent = `${enemy1.hitPoints}`
  checkWinner()
}

function fightRound2() {

}

function fightRound3() {

}

function fightRound4() {

}

function fightRound5() {

}

function fightRound6() {

}

// ****** Animation Functions (maybe...) ******

// Cheat Codes