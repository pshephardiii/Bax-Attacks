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
        playerImage.classList.add('player-physical-attack')
        if (Math.random() < this.buffAcc) {
          barkSound.play()
          barkSound.volume = .3
          playerNoise.style.display = 'inline'
          setTimeout( () => {
            playerNoise.style.display = 'none'
          }, 500)
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
        playerImage.classList.add('player-physical-attack')
        if (Math.random() < this.attackAcc) {
          biteSound.play()
          biteSound.volume = .3
          let attackDamage = randomizer((this.attack + 2) - target.defense, (this.attack + 4) - target.defense)
          attackDamage = attackDamage < 0 ? 0 : attackDamage
          target.hitPoints = target.hitPoints - attackDamage
          this.useAct2 = this.useAct2 - 1
          enemyImage.classList.add('take-hit')
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
        playerImage.classList.add('player-physical-attack')
        if (Math.random() < this.attackAcc) {
          dashSound.play()
          dashSound.volume = .3
          let defenseDecrease = randomizer (1, 2)
          let attackDamage = randomizer((this.attack) - target.defense, (this.attack + 2) - target.defense)
          attackDamage = attackDamage < 0 ? 0 : attackDamage
          target.hitPoints = target.hitPoints - attackDamage
          if ((target.defense - defenseDecrease) >= 0) {
            target.defense = target.defense - defenseDecrease
          }
          this.useAct3 = this.useAct3 - 1
          enemyImage.classList.add('take-hit')
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
        cutenessSound.play()
        cutenessSound.volume = .3
        playerHearts.style.display = 'block'
        setTimeout( () => {
          playerHearts.style.display = 'none'
        }, 2000)
        if (Math.random() < this.attackAcc) {
          enemyImage.classList.add('take-hit')
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
    enemyCanteen.style.display = 'inline'
    setTimeout( () => {
      enemyCanteen.style.display = 'none'
    }, 2000)
    if (Math.random() < this.buffAcc) {
      canteenSound.play()
      canteenSound.volume = .3
      let increaseDamage = randomizer(1, 3)
      this.attack = this.attack + increaseDamage
      let healthDecrease = randomizer(1, 3)
      this.hitPoints = this.hitPoints - healthDecrease
      this.useAct1 = this.useAct1 - 1
      battleMessages.textContent = `${enemyArr[0].name} takes a swill of his canteen! ${enemyArr[0].name}'s attack is raised by ${increaseDamage} and he lost ${healthDecrease} health.` 
    } else {battleMessages.textContent = `${enemyArr[0].name} tries to swill from his canteen, but spills it instead!`}
    nextMoveBtn.style.display = 'inline'
    for (let button of actionBtnArr) {
      button.style.display = 'none'
    }
}

  loreDump(target) {
    loreDumpSound.play()
    loreDumpSound.volume = .3
    enemySpeaks.style.display = 'inline'
    setTimeout( () => {
      enemySpeaks.style.display = 'none'
    }, 2000)
    if (Math.random() < this.attackAcc - .2) {
      playerSleepCounter = playerSleepCounter + 3
      playerSleep.style.display = 'inline'
      playerSleep.classList.add('sleep-animate')
      this.useAct2 = this.useAct2 - 1
      battleMessages.textContent = `${enemyArr[0].name} uses lore dump! ${player.name} is so bored he falls asleep.`
    } else {battleMessages.textContent= `${enemyArr[0].name} uses lore dump, but ${player.name} wants to know more!`}
    nextMoveBtn.style.display = 'inline'
    for (let button of actionBtnArr) {
      button.style.display = 'none'
    }
  }

  epicThrust(target) { 
    enemyChargeCounter++
    if (enemyChargeCounter === 1) {
      chargingSound.play()
      chargingSound.volume = .3
      enemyCharges.style.display = 'inline'
      setTimeout( () => {
        enemyCharges.style.display = 'none'
      }, 2000)
      battleMessages.textContent = `${enemyArr[0].name} is charging up an attack!`
    } else if (enemyChargeCounter === 2) {
        enemyImage.classList.add('enemy-physical-attack')
        if(Math.random() < this.attackAcc) {
          epicThrustSound.play()
          epicThrustSound.volume = .3
          let attackDamage = randomizer((this.attack + 8) - target.defense, (this.attack + 10) - target.defense)
          attackDamage = attackDamage < 0 ? 0 : attackDamage
          target.hitPoints = target.hitPoints - attackDamage
          enemyChargeCounter = 0
          this.useAct3 = this.useAct3 - 1
          playerImage.classList.add('take-hit')
          battleMessages.textContent = `${enemyArr[0].name} strikes ${player.name} with epic thrust! The attack does ${attackDamage} damage.` 
        } else {
          battleMessages.textContent = `${enemyArr[0].name} unleashes an epic thrust, but ${player.name} evades!`
          enemyChargeCounter = 0
        }
    }
    nextMoveBtn.style.display = 'inline'
    for (let button of actionBtnArr) {
      button.style.display = 'none'
    }
  }

  halfHeartedSwipe(target) {
    enemyImage.classList.add('enemy-physical-attack')
    if (Math.random() < this.attackAcc) {
      halfHeartedSwipeSound.play()
      halfHeartedSwipeSound.volume = .3
      let attackDamage = randomizer((this.attack + 4) - target.defense, (this.attack + 6) - target.defense)
      attackDamage = attackDamage < 0 ? 0 : attackDamage
      target.hitPoints = target.hitPoints - attackDamage
      this.useAct4 = this.useAct4 - 1
      playerImage.classList.add('take-hit')
      battleMessages.textContent = `${enemyArr[0].name} performs a half hearted swipe! Does ${attackDamage} damage.`
    } else {
      battleMessages.textContent = `${enemyArr[0].name} attempts a half hearted swipe, but misses!`}
      nextMoveBtn.style.display = 'inline'
    for (let button of actionBtnArr) {
      button.style.display = 'none'
    }
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

let gameOverMessageArr

let musicArr

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
const battleMessageContainer = document.querySelector('.battle-message-container')
const enemyImageContainer = document.getElementById('enemy-image-container')
const playerImageContainer = document.getElementById('player-image-container')

// Contained elements
const enemyHealth = document.getElementById('enemy-healthbar')
const playerHealth = document.getElementById('player-healthbar')
const enemyName = document.getElementById('enemy-name')
const playerName = document.getElementById('player-name')
const enemyImage = document.getElementById('enemy-image')
const playerImage = document.getElementById('player-image')
const battleMessages = document.querySelector('.battle-message-text')

// Gameflow Initiation buttons
const startBtn = document.getElementById('start-button')
const resetBtn = document.getElementById('reset-button')
const continueBtn = document.getElementById('continue-button')
const tryAgainBtn = document.getElementById('try-again-button')

// Action buttons
const actionBtns = document.querySelector('.action-buttons-container')
const everyActionBtn = document.querySelectorAll('.action-button')
const actionBtnArr = Array.from(everyActionBtn)
const actionBtn1 = document.getElementById('action-1')
const actionBtn2 = document.getElementById('action-2')
const actionBtn3 = document.getElementById('action-3')
const actionBtn4 = document.getElementById('action-4')
const nextMoveBtn = document.getElementById('next-move')

// Status Effect Items 
const playerSleep = document.getElementById('sleep-image-player')
const enemySleep = document.getElementById('sleep-image-enemy')

// Special Attack Effects - Enemy Shared
const enemyCharges = document.getElementById('charging-animation-enemy')
const enemySpeaks = document.getElementById('speaking-animation-enemy')

// Special Attack Effects - Enemy Unique
const enemyCanteen = document.getElementById('canteen-animation-enemy')

// Special Attack Effects - Player
const playerNoise = document.getElementById('noise-animation-player')
const playerHearts = document.getElementById('hearts-animation-player')

// Sound Effects - Player
const barkSound = new Audio('/Users/paulshephard/software_homework/project1/Baxter-Battle/sound-effects.mp3/player.mp3/bark.mp3')
const biteSound = new Audio('/Users/paulshephard/software_homework/project1/Baxter-Battle/sound-effects.mp3/player.mp3/bite.mp3')
const dashSound = new Audio('/Users/paulshephard/software_homework/project1/Baxter-Battle/sound-effects.mp3/player.mp3/dash.mp3')
const cutenessSound = new Audio('/Users/paulshephard/software_homework/project1/Baxter-Battle/sound-effects.mp3/player.mp3/cuteness.mp3')

// Sound Effects - Misc
const chargingSound = new Audio('/Users/paulshephard/software_homework/project1/Baxter-Battle/sound-effects.mp3/misc.mp3/Charging.mp3')
const sleepingSound = new Audio('/Users/paulshephard/software_homework/project1/Baxter-Battle/sound-effects.mp3/misc.mp3/StillAsleep.mp3')
const awakeSound = new Audio('/Users/paulshephard/software_homework/project1/Baxter-Battle/sound-effects.mp3/misc.mp3/Wake up.mp3')
const playerLossSound = new Audio('/Users/paulshephard/software_homework/project1/Baxter-Battle/sound-effects.mp3/misc.mp3/Player Loss.mp3')
const enemyLossSound = new Audio('/Users/paulshephard/software_homework/project1/Baxter-Battle/sound-effects.mp3/misc.mp3/Enemy Loss.mp3')

// Sound Effects - Enemy1
const canteenSound = new Audio('/Users/paulshephard/software_homework/project1/Baxter-Battle/sound-effects.mp3/enemy1.mp3/canteen-swill.mp3')
const loreDumpSound = new Audio('/Users/paulshephard/software_homework/project1/Baxter-Battle/sound-effects.mp3/enemy1.mp3/lore-dump.mp3')
const epicThrustSound = new Audio('/Users/paulshephard/software_homework/project1/Baxter-Battle/sound-effects.mp3/enemy1.mp3/epic-thrust.mp3')
const halfHeartedSwipeSound = new Audio('/Users/paulshephard/software_homework/project1/Baxter-Battle/sound-effects.mp3/enemy1.mp3/halfhearted-swipe.mp3')

// Background Music
const musicTrack = document.getElementById('music-track')
const enemy1Theme = '/Users/paulshephard/software_homework/project1/Baxter-Battle/background-music.mp3/Unite The Clans.mp3'

// EVENT LISTENERS

startBtn.addEventListener('click', ()=>{
  initFirstBattle()
  init()
})

actionBtn1.addEventListener('click', ()=>{
  player.bark()
  disableActionButtons()
})

actionBtn2.addEventListener('click', ()=>{
  player.bite(enemyArr[0])
  disableActionButtons()
})

actionBtn3.addEventListener('click', ()=>{
  player.dash(enemyArr[0])
  disableActionButtons()
})

actionBtn4.addEventListener('click', ()=>{
  player.cuteness(enemyArr[0])
  disableActionButtons()
})

nextMoveBtn.addEventListener('click', ()=> {
  nextMoveBtn.style.display = 'none'
  for (let button of actionBtnArr) {
    button.style.display = 'inline'
  }
  removeAnimationClasses()
  enableActionButtons()
})



// FUNCTIONS

// Initializer functions

function init() {
  removeAnimationClasses()
  initBattleBtns()
  initPlayerStats()
  initEnemy()
  initBattleDisplay()
  initBattleStatus()
  initDefeatMessages()
  
}

function initBattleBtns() {
  actionBtn1.innerHTML = `<span class="action-command">Bark</span><br /> Uses Left: ${player.useAct1}`
  actionBtn2.innerHTML = `<span class="action-command">Bite</span><br /> Uses Left: ${player.useAct2}`
  actionBtn3.innerHTML = `<span class="action-command">Dash</span><br /> Uses Left: ${player.useAct3}`
  actionBtn4.innerHTML = `<span class="action-command">Cuteness</span> <br />Uses Left: ${player.useAct4}`
  enableActionButtons()
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
  playerImageContainer.classList.add('move-in-left')
  playerChargeCounter = 0
  playerSleepCounter = 0
  playerStunCounter = 0
}

function initEnemy() {
  enemyName.textContent = `${enemyArr[0].name}`
  enemyHealth.textContent = `${enemyArr[0].hitPoints}`
  enemyImage.src = 'https://i.imgur.com/8zvUb4o.png'
  enemyImage.style.display = 'inline'
  enemyImageContainer.classList.add('move-in-right')
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
  musicTrack.src = musicArr[0]
  musicTrack.play()
  musicTrack.volume = .1
}

function initBattleStatus() {
  winner = null
  playerImage.classList.remove('move-out-left')
  enemyImage.classList.remove('move-out-right')
}

function initDefeatMessages() {
  gameOverMessageArr = ['You win some, you lose some.', 'Shoot for the moon. If you miss, you may hit a star.', 'Maybe try winning next time.', 'Why do we fall, Bax?', 'One defeat does not a loser make.', 'Every dog has its day.', 'Playtime is over.', 'The boy will have his revenge.', 'Woof woof?', 'An elephant never forgets, a yorkie never forgives.']
}

function initFirstBattle() {
  enemyArr = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6]
  musicArr = [enemy1Theme]
}

function initNextBattle() {
  enemyArr.shift()
  musicArr.shift()
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
      awakeSound.play()
      awakeSound.volume = .3
      battleMessages.textContent = `${player.name} wakes up!`
      playerSleepCounter = playerSleepCounter - 1
      playerSleep.style.display = 'none'
      playerSleep.classList.remove('sleep-animate')
    } else {
      sleepingSound.play()
      sleepingSound.volume = .3
      battleMessages.textContent = `${player.name} is fast asleep.`
      playerSleepCounter = playerSleepCounter - 1
      playerSleep.classList.add('sleep-animate')
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
    enemyLossSound.play()
    enemyLossSound.volume = .3
    enemyImage.classList.add('move-out-right')
    battleMessages.textContent = `${enemyArr[0].name} cowers in fear. ${player.name} wins!`
    winner = player
    declareWinner()
    }, 2000)
  }

  if (player.hitPoints <= 0) {
    setTimeout(() => {
    playerLossSound.play()
    playerLossSound.volume = .3
    playerImage.classList.add('move-out-left')
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
      stopMusic()
    }, 2000)
  } else {
    setTimeout(() => {
      battleScreen.style.display = 'none'
      gameOverScreen.style.display = 'flex'
      document.querySelector('.game-over-message').textContent = gameOverMessageArr[Math.floor(Math.random() * 10)]
      stopMusic()
    }, 2000)  
  }
}

function fightRound() {

  removeAnimationClasses()

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

    let randomNum = Math.random()

    if (enemy1.hitPoints < 15) {
      if ((randomNum > .5) && (enemy1.useAct1 > 0) && (enemy1.hitPoints > 5)) {
        enemy1.canteenSwill()
      } else if (enemy1.useAct3 > 0) {
        enemy1.epicThrust(player)
      } else if ((enemy1.useAct1 > 0) && (enemy1.hitPoints > 5)) {
        enemy1.canteenSwill()
      } else {
        if ((randomNum > .5) && (enemy1.useAct2 > 0) && (playerSleepCounter === 0)) {
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
      if ((randomNum > .75) && (enemy1.useAct2 > 0) && (playerSleepCounter === 0)) {
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

function removeAnimationClasses() {
  playerImage.classList.remove('player-physical-attack', 'take-hit')
  enemyImage.classList.remove('enemy-physical-attack', 'take-hit')
  playerSleep.classList.remove('sleep-animate')
  enemySleep.classList.remove('sleep-animate')
  enemyImageContainer.classList.remove('move-in-right')
  playerImageContainer.classList.remove('move-in-left')
}

function disableActionButtons() {
  for (let button of actionBtnArr) {
    button.disabled = true
  }
}

function enableActionButtons() {
  for (let button of actionBtnArr) {
    button.disabled = false
  }
}

function stopMusic() {
  musicTrack.pause()
}

// Cheat Codes (thank you Revenge of the Garbage Man!)
document.addEventListener('keydown', function(event) {
  if (event.key === '1') {
    player.hitPoints = 0
    checkWinner()
  }
})

document.addEventListener('keydown', function(event) {
  if (event.key === '2') {
    enemyArr[0].hitPoints = 0
    checkWinner()
  }
})

document.addEventListener('keydown', function(event) {
  if (event.key === '3') {
    playerSleepCounter = playerSleepCounter + 3
    playerSleep.style.display = 'inline'
    playerSleep.classList.add('sleep-animate')
  }
})

document.addEventListener('keydown', function(event) {
  if (event.key === '4') {
    playerSleepCounter = 0
    playerSleep.style.display = 'none'
    playerSleep.classList.remove('sleep-animate')
  }
})

