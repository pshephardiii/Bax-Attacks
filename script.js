const startScreen = document.querySelector('.start-screen')
const gameOverScreen = document.querySelector('.game-over-screen')
const victoryScreen = document.querySelector('.victory-screen')
const gameCompletionScreen = document.querySelector('.game-completion-screen')

// Content containers
const battleScreen = document.querySelector('.battle-screen-container')
const enemyHealth = document.getElementById('enemy-healthbar')
const playerHealth = document.getElementById('player-healthbar')
const enemyName = document.getElementById('enemy-name')
const playerName = document.getElementById('player-name')
const enemyImage = document.getElementById('enemy-image')
const playerImage = document.getElementById('player-image')
const battleMessages = document.querySelector('.battle-message-container')

// Button containers
const actionBtns = document.querySelector('.action-buttons-container')
const flowBtns = document.querySelector('.flow-buttons-container')
const roundBtns = document.querySelector('.round-buttons-container')

// Gameflow Initiation buttons
const startBtn = document.getElementById('start-button')
const resetBtn = document.getElementById('reset-button')
const continueBtn = document.getElementById('continue-button')
const tryAgainBtn = document.getElementById('try-again-button')

// Action buttons
const actionBtn1 = document.getElementById('action-1')
const actionBtn2 = document.getElementById('action-2')
const actionBtn3 = document.getElementById('action-3')
const actionBtn4 = document.getElementById('action-4')

// Randomizer Function

function randomizer(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// ***** Music/Sound Effects Starts Here *****

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
        if (Math.random() < this.buffAcc){
          let attackIncrease = randomizer(1, 3)
          this.attack = this.attack + attackIncrease
          playerRaiseAttackCounter = 3
          this.useAct1 = this.useAct1 - 1
          battleMessages.textContent = `${player.name} uses bark! ${player.name}'s attack increased by ${attackIncrease}.`
          fightRound()
        }  else {
            battleMessages.textContent = `${player.name} tries to bark, but his throat is sore!`
            fightRound()
        }
      } else {return}
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
          battleMessages.textContent = `${player.name} bites ${enemyArr[0].name}!  Causes ${attackDamage} worth of damage.`
          fightRound()
        } else {
          battleMessages.textContent = `${player.name} tries to bite ${enemyArr[0].name} but misses!`
          fightRound()
        }
      } else {return}
    } else {
      battleMessages.textContent = `${player.name} is out of bites! Pick another action.`
    }
  }

  dash(target) {
    if (this.useAct3 > 0) {
      if ((playerSleepCounter === 0) && (playerStunCounter === 0)) {
        if (Math.random() < this.attackAcc) {
          let attackDamage = randomizer (this.attack, this.attack + 2)
          let defenseDecrease = randomizer (1, 4)
          target.hitPoints = target.hitPoints - attackDamage
          target.defense = target.defense - defenseDecrease
          enemyLowerDefenseCounter = 3
          this.useAct3 = this.useAct3 - 1
          battleMessages.textContent = `${player.name} dashes at ${enemyArr[0].name}! Causes ${attackDamage} damage and lowers defense by ${defenseDecrease}.`
          fightRound()
        } else {
          battleMessages.textContent = `${player.name} dashes at ${enemyArr[0].name}, but misses!`
          fightRound()
        }
      } else {return}
    } else {
      battleMessages.textContent = `${player.name} is out of dashes! Pick another action.`
    }
  }

  cuteness(target) {
    if (this.useAct4 > 0) {
      if ((playerSleepCounter === 0) && (playerStunCounter === 0)) {
        if (Math.random() < this.attackAcc) {
          let accuracyDecrease = randomizer(1, 3)/10
          target.attackAcc = target.attackAcc - accuracyDecrease
          enemyLowerAccuracyCounter = 3
          this.useAct4 = this.useAct4 - 1
          battleMessages.textContent = `${player.name} unleashes his cuteness! ${enemyArr[0].name}'s accuracy decreases by ${accuracyDecrease}.`
          fightRound()
        } else {
          battleMessages.textContent = `${player.name} unleashes his cuteness, but ${enemyArr[0].name} is not impressed.`
          fightRound()
        }
      } else {return}
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
    fightRound()
    if (this.useAct1 > 0) {
      if (Math.random() < this.buffAcc) {
        let increaseDamage = randomizer(1, 3)
        this.attack = this.attack + increaseDamage
        let healthDecrease = randomizer(1, 3)
        this.hitPoints = this.hitPoints - healthDecrease
        this.useAct1 = this.useAct1 - 1
        battleMessages.textContent = `${enemyArr[0].name} takes a swill of his canteen! ${enemyArr[0]}'s attack is raised by ${increaseDamage} and he lost ${healthDecrease} health.` 
      } else {battleMessages.textContent = `${enemeyArr[0].name} tries to swill from his canteen, but spills it instead!`}
    } else {} // probably do this in fightRound()
  }

  loreDump(target) {
    roundFunctionArr[0]
    if (this.useAct2 > 0) {
      if (Math.random() < this.attackAcc - 40) {
        sleep(target)
        playerSleepCounter = 3
        this.useAct2 = this.useAct2 - 1
      } else {}
    } else {}
  }

  // for this one, in the round just repeat attack
  epicThrust(target) {
    roundFunctionArr[0]
    if (this.useAct3 > 0) { 
      chargeCounter++
      if (chargeCounter === 1) {
        battleMessages.textContent = `${enemyArr[0].name} is charging up an attack!`
      } else if (chargeCounter === 2) {
        if(Math.random < this.attackAcc)
        attackDamage = randomizer(this.attack + 5, this.attack + 7)
        target.hitPoints = target.hitPoints - attackDamage
        enemyChargeCounter = 1
        this.useAct3 = this.useAct3 - 1
        battleMessages.textContent = `${enemyArr[0].name} strikes ${player.name} with epic thrust! The attack does ${attackDamage} damage.` 
      } else {
        battleMessages.textContent = `${enemyArr[0].name} unleashes an epic thrust, but ${player.name} evades!`
      }
    } // I'll need to fit something in here to make them pick another action... maybe I can do that in the round
  }

  halfHeartedSwipe(target) {
    roundFunctionArr[0]
    if (this.useAct4 > 0) {
      if (Math.random() < this.attackAcc) {
        target.hitPoints = target.hitPoints - randomizer (this.attack, this.attack + 2)
        this.useAct4 = this.useAct4 - 1
      }
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

// NOTE: might want to put enemies in array, have player fight them one at a time.  That way, I only need one round.

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

// Enemy Array

let enemyArr = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6]

// Default Battle Settings

actionBtn1.textContent = `Bark Uses Left: ${player.useAct1}`
actionBtn2.textContent = `Bite Uses Left: ${player.useAct2}`
actionBtn3.textContent = `Dash Uses Left: ${player.useAct3}`
actionBtn4.textContent = `Cuteness Uses Left: ${player.useAct4}`

playerName.textContent = `${player.name}`
playerHealth.textContent = `${player.hitPoints}`
enemyName.textContent = `${enemyArr[0].name}`
enemyHealth.textContent = `${enemyArr[0].hitPoints}`
enemyImage.src = 'https://i.imgur.com/nEIDjH4.jpg'

// ****** Status Effect Counters

let playerRaiseAttackCounter = 0

let playerRaiseDefenseCounter = 0

let playerRaiseAccuracyCounter = 0

let playerLowerAttackCounter = 0

let playerLowerDefenseCounter = 0

let playerLowerAccuracyCounter = 0

let enemyRaiseAttackCounter = 0

let enemyRaiseDefenseCounter = 0

let enemyRaiseAccuracyCounter = 0

let enemyLowerAttackCounter = 0

let enemyLowerDefenseCounter = 0

let enemyLowerAccuracyCounter = 0

// Special Status Effect Counters

let playerSleepCounter = 0

let playerStunCounter = 0

let playerChargeCounter = 0

let enemySleepCounter = 0

let enemyStunCounter = 0

let enemyChargeCounter = 0

// ****** Battle Logic Starts Here ******

// when round ends, remove enemy button from array

// Built status effects into the round because it gets called every time the player does anything

function fightRound() {
  // status effect stuff first, then specific action probabilities
  // Right... I won't need to spell out player attacks because that will be handled in the method itself
  playerName.textContent = `${player.name}`
  playerHealth.textContent = `${player.hitPoints}`
  actionBtn1.textContent = `Bark Uses Left: ${player.useAct1}`
  actionBtn2.textContent = `Bite Uses Left: ${player.useAct2}`
  actionBtn3.textContent = `Dash Uses Left: ${player.useAct3}`
  actionBtn4.textContent = `Cuteness Uses Left: ${player.useAct4}`

  enemyName.textContent = `${enemyArr[0].name}`
  enemyHealth.textContent = `${enemyArr[0].hitPoints}`
  enemyImage.src = 'https://i.imgur.com/nEIDjH4.jpg'

  if (enemyArr[0].hitPoints <= 0) {
    battleMessages.textContent = `${enemyArr[0].name} cowers in fear. ${player.name} wins!`
    continueBtn.style.display = block
    resetBtn.style.display = block
    actionBtns.style.display = none
    // music needs to change
  }
  if (playerSleepCounter > 0) {
    if (playerSleepCounter === 1) {
      battleMessages.textContent = `${player.name} wakes up!`
      playerSleepCounter--
    } else {
      battleMessages.textContent = `${player.name} is fast asleep.`
      playerSleepCounter--
    }
  }

  if (playerStunCounter > 0) {
    if (playerStunCounter === 1) {
      battleMessages.textContent = `${player.name} is stunned!`
      playerStunCounter--
    } else {
      battleMessages.textContent = `${player.name} snaps out of it!`
      playerStunCounter--
    }
  }

  if (enemySleepCounter > 0) {
    if (enemySleepCounter === 1) {
      battleMessages.textContent = `${enemyArr[0].name} wakes up!`
      playerSleepCounter--
      return
    } else {
      battleMessages.textContent = `${enemyArr[0].name} is fast asleep.`
      playerSleepCounter--
      return
    }
  }

  if (enemyStunCounter > 0) {
    if (enemyStunCounter === 1) {
      battleMessages.textContent = `${enemyArr[0].name} is stunned!`
      enemyStunCounter--
      return
    } else {
      battleMessages.textContent = `${enemyArr[0].name} snaps out of it!`
      enemyStunCounter--
      return
    }
  }

  if (enemyArr[0] === enemy1) {
    if (enemyChargeCounter > 0) {
      enemyArr[0].epicThrust(player)
      return
    } 
    
    // Continue enemy logic here
  }

  if (player.hitPoints <= 0) {
    battleMessages.textContent = `${player.name} hides behind the couch!  ${player.name} has lost the battle.`
    gameOverScreen.style.display = block
    tryAgainBtn.style.display = block
    actionBtns.style.display = none
  }
  
}

// ****** Other Functions Start Here ******

function continuePrompt() {

}

function tryAgainPrompt() {

}

// ****** Battle Message Content Starts Here ******

// Event listeners
startBtn.addEventListener('click', ()=>{
  startScreen.style.display = 'none'
  startBtn.style.display = 'none'
  battleScreen.style.display = 'block'
  battleMessages.style.display = 'block'
  actionBtns.style.display = 'flex'
})

actionBtn1.addEventListener('click', ()=>{
  player.bark()
})

actionBtn2.addEventListener('click', ()=>{
  player.bite(enemyArr[0])
})

actionBtn3.addEventListener('click', ()=>{
  player.dash(enemyArr[0])
})

actionBtn4.addEventListener('click', ()=>{
  player.cuteness(enemyArr[0])
})

// ****** Animation Functions (maybe...) ******

// Cheat Codes