const startScreen = document.querySelector('.start-screen')
const gameOverScreen = document.querySelector('.game-over-screen')
const victoryScreen = document.querySelector('.victory-screen')
const gameCompletionScreen = document.querySelector('.game-completion-screen')

// Content containers
const battleScreen = document.querySelector('.battle-screen-container')
const enemyHealth = document.getElementById('health-container-enemy')
const battleImageContainer = document.getElementById('battle-image-container')
const playerHealth = document.getElementById('health-container-player')
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

// NOTE: build battle messages into methods

class Player extends Character {
  constructor(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4) {
    super(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4)
  }

  bark() {
    fightRound()
    if (this.useAct1 > 0) {
      if (Math.random() < this.buffAcc) {
        this.attack = this.attack + randomizer(1, 3)
        this.useAct1 = this.useAct1 - 1
      } else {...}  
    } else {...}
  }

  bite(target) {
    fightRound()
    if (this.useAct2 > 0){
      if (Math.random() < this.attackAcc) {
        target.hitPoints = target.hitPoints - randomizer(this.attack + 2, this.attack + 4)
        this.useAct2 = this.useAct2 - 1
      } else {...}
    } else {...}
  }

  dash(target) {
    fightRound()
    if (this.useAct3 > 0) {
      if (Math.random() < this.attackAcc) {
        target.hitPoints = target.hitPoints - randomizer (this.attack, this.attack + 2)
        this.useAct3 = this.useAct3 - 1
      } else {...}
    } else {...}
  }

  cuteness(target) {
    fightRound()
    if (this.useAct4 > 0) {
      if (Math.random() < this.attackAcc) {
        target.attackAcc = target.attackAcc - randomizer ((1, 2)/10)
        this.useAct4 = this.useAct4 - 1
      } else {...}
    } else {...}
  }
}

// First Enemy Class

class Enemy1 extends Character {
  constructor(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4) {
    super(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4)
  }

  canteenSwill() {
    roundFunctionArr[0]
    if (this.useAct1 > 0) {
      if (Math.random() < this.buffAcc) {
        this.attack = this.attack + randomizer(1, 3)
        this.hitPoints = this.hitPoints - randomizer(1, 3)
        this.useAct1 = this.useAct1 - 1
      } else {...}
    } else {...}
  }

  loreDump(target) {
    roundFunctionArr[0]
    if (this.useAct2 > 0) {
      if (Math.random() < this.attackAcc - 40) {
        sleep(target)
        playerSleepCounter = 3
        this.useAct2 = this.useAct2 - 1
      } else {...}
    } else {...}
  }

  // for this one, in the round just repeat attack
  epicThrust(target) {
    roundFunctionArr[0]
    if (this.useAct3 > 0) {
      if (Math.random() < this.buffAcc) {
        chargeCounter++
        if (chargeCounter === 1) {
          // send message and skip turn
          chargeCounter++
        } else if (chargeCounter === 2) {
          target.hitPoints = target.hitPoints - randomizer(this.attack + 5, this.attack + 7)
          enemyChargeCounter = 1
          this.useAct3 = this.useAct3 - 1
        } 
      }
    }
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

// NOTE: I'll need to put initial battle messages in class methods

let enemyArr = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6]

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
  if (enemyArr[0].hitPoints <= 0) {

  }
  if (playerSleepCounter > 0) {

  }
  if (enemyArr[0] === enemy1) {

  }
  if (player.hitPoints <= 0) {
    
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