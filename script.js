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
const battleMessages = document.querySelector('.battle-message-text')
const battleMessageContainer = document.querySelector('.battle-message-container')

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
        if (Math.random() < this.buffAcc) {
          let attackIncrease = randomizer(1, 3)
          this.attack = this.attack + attackIncrease
          // playerRaiseAttackCounter = 3
          this.useAct1 = this.useAct1 - 1
          battleMessages.textContent = `${player.name} uses bark! ${player.name}'s attack increased by ${attackIncrease}.`
          setTimeout(() => {fightRound()}, 2000)
        }  else {
            battleMessages.textContent = `${player.name} tries to bark, but his throat is sore!`
            setTimeout(() => {fightRound()}, 2000)
        }
      } else {
        if (playerSleepCounter > 0) {
          battleMessages.textContent = `${player.name} can't move during a nap!`
          setTimeout(() => {fightRound()}, 2000)
        } else if (playerChargeCounter > 0) {
          battleMessages.textContent = `${player.name} is too stunned to move!`
          setTimeout(() => {fightRound()}, 2000)
        }
      }
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
          setTimeout(() => {fightRound()}, 2000)
        } else {
          battleMessages.textContent = `${player.name} tries to bite ${enemyArr[0].name} but misses!`
          setTimeout(() => {fightRound()}, 2000)
        }
      } else {
          if (playerSleepCounter > 0) {
            battleMessages.textContent = `${player.name} can't move during a nap!`
            setTimeout(() => {fightRound()}, 2000)
          } else if (playerChargeCounter > 0) {
            battleMessages.textContent = `${player.name} is too stunned to move!`
            setTimeout(() => {fightRound()}, 2000)
          }
        }
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
          // enemyLowerDefenseCounter = 3
          this.useAct3 = this.useAct3 - 1
          battleMessages.textContent = `${player.name} dashes at ${enemyArr[0].name}! Causes ${attackDamage} damage and lowers defense by ${defenseDecrease}.`
          setTimeout(() => {fightRound()}, 2000)
        } else {
          battleMessages.textContent = `${player.name} dashes at ${enemyArr[0].name}, but misses!`
          setTimeout(() => {fightRound()}, 2000)
        }
      } else {
        if (playerSleepCounter > 0) {
          battleMessages.textContent = `${player.name} can't move during a nap!`
          setTimeout(() => {fightRound()}, 2000)
        } else if (playerChargeCounter > 0) {
          battleMessages.textContent = `${player.name} is too stunned to move!`
          setTimeout(() => {fightRound()}, 2000)
        }
      }
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
          // enemyLowerAccuracyCounter = 3
          this.useAct4 = this.useAct4 - 1
          battleMessages.textContent = `${player.name} unleashes his cuteness! ${enemyArr[0].name}'s accuracy decreases by ${accuracyDecrease}.`
          setTimeout(() => {fightRound()}, 2000)
        } else {
          battleMessages.textContent = `${player.name} unleashes his cuteness, but ${enemyArr[0].name} is not impressed.`
          setTimeout(() => {fightRound()}, 2000)
        }
      } else {
        if (playerSleepCounter > 0) {
          battleMessages.textContent = `${player.name} can't move during a nap!`
          setTimeout(() => {fightRound()}, 2000)
        } else if (playerChargeCounter > 0) {
          battleMessages.textContent = `${player.name} is too stunned to move!`
          setTimeout(() => {fightRound()}, 2000)
        }
      }
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
      playerStatUpdates()
      checkPlayerHealth()
    } else {battleMessages.textContent = `${enemyArr[0].name} tries to swill from his canteen, but spills it instead!`
      playerStatUpdates()}
  }

  loreDump(target) {
  // come back here
    if (Math.random() < this.attackAcc - .2) {
      playerSleepCounter = playerSleepCounter + 3
      this.useAct2 = this.useAct2 - 1
      battleMessages.textContent = `${enemyArr[0].name} uses lore dump! ${player.name} is so bored he falls asleep.`
      playerStatUpdates()
      checkPlayerHealth()
    } else {battleMessages.textContent= `${enemyArr[0].name} uses lore dump, but ${player.name} wants to know more!`
      playerStatUpdates()}
  }

  epicThrust(target) { 

    enemyChargeCounter++
    if (enemyChargeCounter === 1) {
      battleMessages.textContent = `${enemyArr[0].name} is charging up an attack!`
    } else if (enemyChargeCounter === 2) {
        if(Math.random < this.attackAcc) {
        attackDamage = randomizer(this.attack + 5, this.attack + 7)
        target.hitPoints = target.hitPoints - attackDamage
        enemyChargeCounter = 0
        this.useAct3 = this.useAct3 - 1
        battleMessages.textContent = `${enemyArr[0].name} strikes ${player.name} with epic thrust! The attack does ${attackDamage} damage.` 
        playerStatUpdates()
        checkPlayerHealth()
        } else {
          battleMessages.textContent = `${enemyArr[0].name} unleashes an epic thrust, but ${player.name} evades!`
          enemyChargeCounter = 0
          playerStatUpdates()
        }
    }
  }

  halfHeartedSwipe(target) {

    if (Math.random() < this.attackAcc) {
      let attackDamage = randomizer(this.attack + 50, this.attack + 51)
      target.hitPoints = target.hitPoints - attackDamage
      this.useAct4 = this.useAct4 - 1
      battleMessages.textContent = `${enemyArr[0].name} performs a half hearted swipe! Does ${attackDamage} damage.`
      playerStatUpdates()
      checkPlayerHealth()
    } else {
      battleMessages.textContent = `${enemyArr[0].name} attempts a half hearted swipe, but misses!`
      playerStatUpdates()
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

actionBtn1.innerHTML = `<span class="action-command">Bark</span><br /> Uses Left: ${player.useAct1}`
actionBtn2.innerHTML = `<span class="action-command">Bite</span><br /> Uses Left: ${player.useAct2}`
actionBtn3.innerHTML = `<span class="action-command">Dash</span><br /> Uses Left: ${player.useAct3}`
actionBtn4.innerHTML = `<span class="action-command">Cuteness</span> <br />Uses Left: ${player.useAct4}`

playerName.textContent = `${player.name}`
playerHealth.textContent = `${player.hitPoints}`
enemyName.textContent = `${enemyArr[0].name}`
enemyHealth.textContent = `${enemyArr[0].hitPoints}`
enemyImage.src = 'https://i.imgur.com/nEIDjH4.jpg'

// ****** Status Effect Counters

// let playerRaiseAttackCounter = 0

// let playerRaiseDefenseCounter = 0

// let playerRaiseAccuracyCounter = 0

// let playerLowerAttackCounter = 0

// let playerLowerDefenseCounter = 0

// let playerLowerAccuracyCounter = 0

// let enemyRaiseAttackCounter = 0

// let enemyRaiseDefenseCounter = 0

// let enemyRaiseAccuracyCounter = 0

// let enemyLowerAttackCounter = 0

// let enemyLowerDefenseCounter = 0

// let enemyLowerAccuracyCounter = 0

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

function playerStatUpdates() {
  playerName.textContent = `${player.name}`
  playerHealth.textContent = `${player.hitPoints}`

  actionBtn1.innerHTML = `<span class="action-command">Bark</span><br /> Uses Left: ${player.useAct1}`
  actionBtn2.innerHTML = `<span class="action-command">Bite</span><br /> Uses Left: ${player.useAct2}`
  actionBtn3.innerHTML = `<span class="action-command">Dash</span><br /> Uses Left: ${player.useAct3}`
  actionBtn4.innerHTML = `<span class="action-command">Cuteness</span> <br />Uses Left: ${player.useAct4}`

  enemyName.textContent = `${enemyArr[0].name}`
  enemyHealth.textContent = `${enemyArr[0].hitPoints}`
  enemyImage.src = 'https://i.imgur.com/nEIDjH4.jpg'

  if (playerSleepCounter > 0) {
    if (playerSleepCounter === 1) {
      setTimeout(() => {battleMessages.textContent = `${player.name} wakes up!`}, 2000)
      playerSleepCounter = playerSleepCounter - 1
      return playerSleepCounter
    } else {
      setTimeout(() => {battleMessages.textContent = `${player.name} is fast asleep.`}, 2000)
      playerSleepCounter = playerSleepCounter - 1
      return playerSleepCounter
    }
  }

  if (playerStunCounter > 0) {
    if (playerStunCounter === 1) {
      setTimeout(() => {
      battleMessages.textContent = `${player.name} is stunned!`
      playerStunCounter--}, 2000)
      return playerStunCounter
    } else {
      setTimeout(() => {
      battleMessages.textContent = `${player.name} snaps out of it!`
      playerStunCounter--}, 2000)
      return playerStunCounter
    }
  }
}

function fightRound() {
  // status effect stuff first, then specific action probabilities
  // Right... I won't need to spell out player attacks because that will be handled in the method itself
  // playerName.textContent = `${player.name}`
  // playerHealth.textContent = `${player.hitPoints}`

  // actionBtn1.textContent = `Bark Uses Left: ${player.useAct1}`
  // actionBtn2.textContent = `Bite Uses Left: ${player.useAct2}`
  // actionBtn3.textContent = `Dash Uses Left: ${player.useAct3}`
  // actionBtn4.textContent = `Cuteness Uses Left: ${player.useAct4}`

  // enemyName.textContent = `${enemyArr[0].name}`
  // enemyHealth.textContent = `${enemyArr[0].hitPoints}`
  // enemyImage.src = 'https://i.imgur.com/nEIDjH4.jpg'

  if (enemyArr[0].hitPoints <= 0) {
   
    battleMessages.textContent = `${enemyArr[0].name} cowers in fear. ${player.name} wins!`
    flowBtns.style.display = 'flex'
    tryAgainBtn.style.display = 'none'
    actionBtns.style.display = 'none'
    return
  }
  // if (playerSleepCounter > 0) {
  //   if (playerSleepCounter === 1) {
  //     battleMessages.textContent = `${player.name} wakes up!`
  //     playerSleepCounter--
  //   } else {
  //     battleMessages.textContent = `${player.name} is fast asleep.`
  //     playerSleepCounter--
  //   }
  // }

  // if (playerStunCounter > 0) {
  //   if (playerStunCounter === 1) {
  //     setTimeout(() => {battleMessages.textContent = `${player.name} is stunned!`}, 2000)
  //     playerStunCounter--
  //   } else {
  //     setTimeout(() => {battleMessages.textContent = `${player.name} snaps out of it!`}, 2000)
  //     playerStunCounter--
  //   }
  // }

  // if (playerRaiseAttackCounter > 0) {
  //   playerRaiseAttackCounter--
  // } 

  // if (playerRaiseDefenseCounter > 0) {
  //   playerRaiseDefenseCounter--
  // } 

  // if (playerRaiseAccuracyCounter > 0) {
  //   playerRaiseAccuracyCounter--
  // } 

  // if (playerLowerAttackCounter > 0) {
  //   playerLowerAttackCounter--
  // } 

  // if (playerLowerDefenseCounter > 0) {
  //   playerLowerDefenseCounter--
  // } 

  // if (playerLowerAccuracyCounter > 0) {
  //   playerLowerAccuracyCounter--
  // } 

  // console.log(playerRaiseAttackCounter)

  if (enemySleepCounter > 0) {
    if (enemySleepCounter === 1) {
     battleMessages.textContent = `${enemyArr[0].name} wakes up!`
      enemySleepCounter--
      return
    } else {
     battleMessages.textContent = `${enemyArr[0].name} is fast asleep.`
      enemySleepCounter--
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

  // if (enemyRaiseAttackCounter > 0) {
  //   enemyRaiseAttackCounter--
  // }

  // if (enemyRaiseDefenseCounter > 0) {
  //   enemyRaiseDefenseCounter--
  // }

  // if (enemyRaiseAccuracyCounter > 0) {
  //   enemyRaiseAccuracyCounter--
  // }

  // if (enemyLowerAttackCounter > 0) {
  //   enemyLowerAttackCounter--
  // }

  // if (enemyLowerDefenseCounter > 0) {
  //   enemyLowerDefenseCounter--
  // }

  // if (enemyLowerAccuracyCounter > 0) {
  //   enemyLowerAccuracyCounter--
  // }

  if (enemyArr[0] === enemy1) {
    if (enemyChargeCounter > 0) {
      enemy1.epicThrust(player)
      return
    } 

    if (enemy1.hitPoints < 15) {
      if ((Math.random() > .5) && (enemy1.useAct1 > 0) && (enemy1.hitPoints > 5)) {
        enemy1.canteenSwill()
        return
      } else if (enemy1.useAct3 > 0) {
        enemy1.epicThrust(player)
        return
      } else if ((enemy1.useAct1 > 0) && (enemy1.hitPoints > 5)) {
        enemy1.canteenSwill()
        return
      } else {
        if ((Math.random() > .5) && (enemy1.useAct2 > 0) && (playerSleepCounter === 0)) {
          enemy1.loreDump(player)
          return
        } else if (enemy1.useAct4 > 0) {
          enemy1.halfHeartedSwipe(player)
        return
        } else if ((enemy1.useAct2 > 0) && (playerSleepCounter === 0)) {
          enemy1.loreDump(player)
        return
        }
        else {battleMessages.textContent = `${enemy1.name} skips turn!`
        return}
      }
    }

    if (enemy1.hitPoints > 15) {
      if ((Math.random() > .5) && (enemy1.useAct2 > 0) && (playerSleepCounter === 0)) {
        enemy1.loreDump(player)
        return
      } else if (enemy1.useAct4 > 0) {
        enemy1.halfHeartedSwipe(player)
        return
      } else if ((enemy1.useAct2 > 0) && (playerSleepCounter === 0)) {
        enemy1.loreDump(player)
        return 
      } else if (enemy1.useAct3 > 0) {
        enemy1.epicThrust(player)
      } else if ((enemy1.useAct1 > 0) && (enemy1.hitPoints > 5)) {
        enemy1.canteenSwill()
      } else {
        battleMessages.textContent = `${enemy1.name} skips turn!`
        return
      }
    }
  }
}

function checkPlayerHealth() {
  playerHealth.textContent = `${player.hitPoints}`
  if (player.hitPoints <= 0) {
    setTimeout(() => {
    battleMessages.textContent = `${player.name} hides behind the couch!  ${player.name} has lost the battle.`
    gameOverScreen.style.display = 'inline'
    tryAgainBtn.style.display = 'inline'
    actionBtns.style.display = 'none'}, 2001)
  }
}

// ****** Other Functions Start Here ******



// ****** Battle Message Content Starts Here ******

// Event listeners
startBtn.addEventListener('click', ()=>{
  startScreen.style.display = 'none'
  startBtn.style.display = 'none'
  battleScreen.style.display = 'grid'
  battleMessageContainer.style.display = 'block'
  actionBtns.style.display = 'flex'
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

// ****** Animation Functions (maybe...) ******

// Cheat Codes