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
    let confuseNum = Math.random()
    // check if player has enough move uses left and if they are confused. 
    // If player is confused, give them a 50% chance of still being able to move
    if (this.useAct1 > 0 && ((playerConfuseCounter === 0) || (confuseNum > .5))) {
      // check if player is asleep or stunned.  If they are either, they can't move
      if ((playerSleepCounter === 0) && (playerStunCounter === 0)) {
        playerImage.classList.add('player-physical-attack')
        // generate a random number to give the player a percentage chance of their move being effective based on buff accuracy
        if (Math.random() < this.buffAcc) {
          barkSound.play()
          barkSound.volume = .3
          document.getElementById('noise-animation-player').style.display = 'inline'
          // use setTimeout to make animation image disappear after half a second
          setTimeout( () => {
            document.getElementById('noise-animation-player').style.display = 'none'
          }, 500)
          let attackIncrease = randomizer(1, 2)
          this.attack = this.attack + attackIncrease
          let healthIncrease = randomizer(5, 7)
          if (this.hitPoints + healthIncrease < 50) {
            this.hitPoints = this.hitPoints + healthIncrease
          } else {
            this.hitPoints = 50
          }
          this.useAct1 = this.useAct1 - 1
          battleMessages.textContent = `${this.name} uses bark! ${this.name} recovers ${healthIncrease} hit points and increases attack by ${attackIncrease}.`
        } else {
          battleMessages.textContent = `${this.name} tries to bark, but his throat is sore!`
        } 
      }  
      hideActionButtons()
      renderPlayerUpdates()
    } else if (this.useAct1 === 0) {
      battleMessages.textContent = `${this.name} is out of barks! Pick another action.`
    } else if ((playerConfuseCounter > 0) && !(confuseNum > .5)) {
      tooConfused()
    }
  }

  bite(target) {
    let confuseNum = Math.random()
    if (this.useAct2 > 0 && ((playerConfuseCounter === 0) || (confuseNum > .5))) {
      if ((playerSleepCounter === 0) && (playerStunCounter === 0)) {
        playerImage.classList.add('player-physical-attack')
        if (Math.random() < this.attackAcc - .1) {
          biteSound.play()
          biteSound.volume = .5
          let attackDamage = randomizer((this.attack) - target.defense, (this.attack + 4) - target.defense)
          // Make sure player attack has not been lowered below 0. We don't want their attack to add to enemy HP.
          attackDamage = attackDamage < 0 ? 0 : attackDamage
          target.hitPoints = target.hitPoints - attackDamage
          this.useAct2 = this.useAct2 - 1
          enemyImage.classList.add('take-hit')
          battleMessages.textContent = `${this.name} bites ${target.name}! Causes ${attackDamage} damage.`
        } else {
          battleMessages.textContent = `${this.name} tries to bite ${target.name} but misses!`
        }
      } 
      hideActionButtons()
      renderPlayerUpdates()
    } else if (this.useAct2 === 0) {
      battleMessages.textContent = `${this.name} is out of bites! Pick another action.`
    } else if ((playerConfuseCounter > 0) && !(confuseNum > .5)) {
      tooConfused()
    }
  }

  dash(target) {
    let confuseNum = Math.random()
    if (this.useAct3 > 0 && ((playerConfuseCounter === 0) || (confuseNum > .5))) {
      if ((playerSleepCounter === 0) && (playerStunCounter === 0)) {
        playerImage.classList.add('player-physical-attack')
        if (Math.random() < this.attackAcc) {
          dashSound.play()
          dashSound.volume = .3
          let defenseDecrease = randomizer (1, 2)
          let attackDamage = randomizer((this.attack - 4) - target.defense, (this.attack - 2) - target.defense)
          attackDamage = attackDamage < 0 ? 0 : attackDamage
          target.hitPoints = target.hitPoints - attackDamage
          if ((target.defense - defenseDecrease) >= 0) {
            target.defense = target.defense - defenseDecrease
          } else {
            target.defense = 0
          }
          this.useAct3 = this.useAct3 - 1
          enemyImage.classList.add('take-hit')
          battleMessages.textContent = `${this.name} dashes at ${target.name}! Causes ${attackDamage} damage and lowers defense by ${defenseDecrease}.`
        } else {
          battleMessages.textContent = `${this.name} dashes at ${target.name}, but misses!`
        }
      }
      hideActionButtons()
      renderPlayerUpdates()
    } else if (this.useAct3 === 0) {
      battleMessages.textContent = `${this.name} is out of dashes! Pick another action.`
    } else if ((playerConfuseCounter > 0) && !(confuseNum > .5)) {
      tooConfused()
    }
  }

  cuteness(target) {
    let confuseNum = Math.random()
    if (this.useAct4 > 0 && ((playerConfuseCounter === 0) || (confuseNum > .5))) {
      if ((playerSleepCounter === 0) && (playerStunCounter === 0)) {
        cutenessSound.play()
        cutenessSound.volume = .3
        document.getElementById('hearts-animation-player').style.display = 'block'
        setTimeout( () => {
          document.getElementById('hearts-animation-player').style.display = 'none'
        }, 2000)
        if (Math.random() < this.attackAcc - .15) {
          enemyImage.classList.add('take-hit')
          let accuracyDecrease = randomizer(1, 2)/10
          target.attackAcc = target.attackAcc - accuracyDecrease
          this.useAct4 = this.useAct4 - 1
          battleMessages.textContent = `${this.name} unleashes his cuteness! ${target.name}'s accuracy decreases by ${accuracyDecrease}.`
        } else {
          battleMessages.textContent = `${this.name} unleashes his cuteness, but ${target.name} is not impressed.`
        }
      } 
      hideActionButtons()
      renderPlayerUpdates()
    } else if (this.useAct4 === 0) {
      battleMessages.textContent = `${this.name} has no more cuteness left to give. Pick another action.`
    } else if ((playerConfuseCounter > 0) && !(confuseNum > .5)) {
      tooConfused()
    }
  }
}

// First Enemy Class

class Enemy1 extends Character {
  constructor(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4) {
    super(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4)
  }

  canteenSwill() {
    document.getElementById('canteen-animation-enemy').style.display = 'inline'
    setTimeout( () => {
      document.getElementById('canteen-animation-enemy').style.display = 'none'
    }, 2000)
    if (Math.random() < this.buffAcc) {
      canteenSound.play()
      canteenSound.volume = .5
      let increaseDamage = randomizer(1, 3)
      this.attack = this.attack + increaseDamage
      let healthDecrease = randomizer(1, 3)
      this.hitPoints = this.hitPoints - healthDecrease
      this.useAct1 = this.useAct1 - 1
      battleMessages.textContent = `${this.name} takes a swill of his canteen! ${this.name}'s attack is raised by ${increaseDamage} and he lost ${healthDecrease} health.` 
    } else {battleMessages.textContent = `${this.name} tries to swill from his canteen, but spills it instead!`}
  }

  loreDump(target) {
    loreDumpSound.play()
    loreDumpSound.volume = .3
    document.getElementById('speaking-animation-enemy').style.display = 'inline'
    setTimeout( () => {
      document.getElementById('speaking-animation-enemy').style.display = 'none'
    }, 2000)
    if (Math.random() < this.attackAcc - .2) {
      playerSleepCounter = playerSleepCounter + randomizer(1, 3)
      playerSleep.style.display = 'inline'
      playerSleep.classList.add('sleep-animate')
      this.useAct2 = this.useAct2 - 1
      battleMessages.textContent = `${this.name} uses lore dump! ${target.name} is so bored he falls asleep.`
    } else {battleMessages.textContent= `${this.name} uses lore dump, but ${target.name} wants to know more!`
    }
  }
  
  epicThrust(target) { 
    enemyChargeCounter++
    // if enemy has not charged up previously, will charge up here. If they charged up last turn, they'll launch the attack.
    if (enemyChargeCounter === 1) {
      chargingSound.play()
      chargingSound.volume = .3
      enemyCharges.style.display = 'inline'
      setTimeout( () => {
        enemyCharges.style.display = 'none'
      }, 2000)
      battleMessages.textContent = `${this.name} is charging up an attack!`
    } else if (enemyChargeCounter === 2) {
        enemyImage.classList.add('enemy-physical-attack')
        if(Math.random() < this.attackAcc) {
          epicThrustSound.play()
          epicThrustSound.volume = .5
          let attackDamage = randomizer((this.attack + 8) - target.defense, (this.attack + 10) - target.defense)
          attackDamage = attackDamage < 0 ? 0 : attackDamage
          target.hitPoints = target.hitPoints - attackDamage
          enemyChargeCounter = 0
          this.useAct3 = this.useAct3 - 1
          playerImage.classList.add('take-hit')
          battleMessages.textContent = `${this.name} strikes ${target.name} with epic thrust! The attack does ${attackDamage} damage.` 
        } else {
          battleMessages.textContent = `${this.name} unleashes an epic thrust, but ${target.name} evades!`
          enemyChargeCounter = 0
        }
    }
  }

  halfHeartedSwipe(target) {
    enemyImage.classList.add('enemy-physical-attack')
    if (Math.random() < this.attackAcc) {
      halfHeartedSwipeSound.play()
      halfHeartedSwipeSound.volume = .5
      let attackDamage = randomizer((this.attack + 4) - target.defense, (this.attack + 6) - target.defense)
      attackDamage = attackDamage < 0 ? 0 : attackDamage
      target.hitPoints = target.hitPoints - attackDamage
      this.useAct4 = this.useAct4 - 1
      playerImage.classList.add('take-hit')
      battleMessages.textContent = `${this.name} performs a half hearted swipe! Does ${attackDamage} damage.`
    } else {
      battleMessages.textContent = `${this.name} attempts a half hearted swipe, but misses!`
    }
  }
}

// Second Enemy Class

class Enemy2 extends Character {
  constructor(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4) {
    super(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4)
  }

  signAutograph(target) {
    document.getElementById('autograph-animation-enemy').style.display = 'inline'
    setTimeout(() => {
      document.getElementById('autograph-animation-enemy').style.display = 'none'
    }, 2000)
    if (Math.random() < this.attackAcc) {
      autographSound.play()
      autographSound.volume = .4
      playerImage.classList.add('take-hit')
      let attackDamage = randomizer((this.attack) - target.defense, (this.attack + 2) - target.defense)
      attackDamage = attackDamage < 0 ? 0 : attackDamage
      target.hitPoints = target.hitPoints - attackDamage
      // This attack raises their HP, so we want to make sure they can't exceed their max HP.
      if ((this.hitPoints + attackDamage) < 40) {
        this.hitPoints = this.hitPoints + attackDamage
      } else {
        this.hitPoints = 40
      }
      this.useAct1 = this.useAct1 - 1
      playerImage.classList.add('take-hit')
      battleMessages.textContent = `${this.name} signs their autograph! Absorbs ${attackDamage} hit points from ${target.name}.`
    } else {
      battleMessages.textContent = `${this.name} wants to sign their autograph, but doesn't have a pen!`
    }
  }

  burningDesire(target) {
     enemyImage.classList.add('enemy-physical-attack')
     if (Math.random() < this.attackAcc) {
      burningSound.play() 
      burningSound.volume = .3
      document.getElementById('burning-animation-enemy').style.display = 'inline'
      setTimeout(() => {
        document.getElementById('burning-animation-enemy').style.display = 'none'
      }, 2000)
      let attackDamage = randomizer((this.attack + 4) - target.defense, (this.attack + 6) - target.defense)
      let defenseDecrease = randomizer(1, 2)
      attackDamage = attackDamage < 0 ? 0 : attackDamage
      target.hitPoints = target.hitPoints - attackDamage
      if ((target.defense - defenseDecrease) >= 0) {
        target.defense = target.defense - defenseDecrease
      } else {
        target.defense = 0
      }
      this.useAct2 = this.useAct2 - 1
      playerImage.classList.add('take-hit')
      battleMessages.textContent = `${this.name} generates a burning desire in ${target.name}! Does ${attackDamage} damage and lowers ${target.name}'s defense by ${defenseDecrease}.`
    } else {
      battleMessages.textContent = `${this.name} tries to generate a burning desire in ${target.name}, but ${target.name} is just not that into him!`
    }
  }

  breakDance() {
    enemyImage.classList.add('upside-down-spin')
    if (Math.random() < this.buffAcc) {
      breakdanceSound.play()
      breakdanceSound.volume = .5
      let defenseIncrease = randomizer(1, 3)
      this.defense = this.defense + defenseIncrease
      this.useAct3 = this.useAct3 - 1
      battleMessages.textContent = `${this.name} dazzles the crowd with a breakdance! Raises defense by ${defenseIncrease}.` 
    } else {battleMessages.textContent = `${this.name} tries to breakdance, but sprains his ankle instead!`}
  }

  hitTheHighNote(target) {
    enemyChargeCounter++
    if (enemyChargeCounter === 1) {
      chargingSound.play()
      chargingSound.volume = .3
      enemyCharges.style.display = 'inline'
      setTimeout( () => {
        enemyCharges.style.display = 'none'
      }, 2000)
      battleMessages.textContent = `${this.name} is charging up an attack!`
    } else if (enemyChargeCounter === 2) {
        enemyImage.classList.add('enemy-physical-attack')
        if(Math.random() < this.attackAcc) {
          singingSound.play()
          singingSound.volume = .2
          document.getElementById('singing-animation-enemy').style.display = 'inline'
          document.getElementById('spotlight-animation-enemy').style.display = 'inline'
          setTimeout(() => {
            document.getElementById('singing-animation-enemy').style.display = 'none'
            document.getElementById('spotlight-animation-enemy').style.display = 'none'
          }, 2000)
          let attackDamage = randomizer((this.attack + 6) - target.defense, (this.attack + 8) - target.defense)
          attackDamage = attackDamage < 0 ? 0 : attackDamage
          target.hitPoints = target.hitPoints - attackDamage
          let accuracyDecrease = .1
          target.attackAcc = target.attackAcc - accuracyDecrease
          enemyChargeCounter = 0
          this.useAct4 = this.useAct4 - 1
          playerImage.classList.add('take-hit')
          battleMessages.textContent = `${this.name} hits the high note! ${target.name} suffers ${attackDamage} damage and loses ${accuracyDecrease} attack accuracy.` 
        } else {
          battleMessages.textContent = `${this.name} tries to hit the high note, but fails miserably!`
          enemyChargeCounter = 0
        }
    }
  }
}

// Third Enemy Class

class Enemy3 extends Character {
  constructor(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4) {
    super(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4)
  }

  scoff(target) {
    document.getElementById('scoff-animation-enemy').style.display = 'inline'
    scoffSound.play()
    scoffSound.volume = .2
    setTimeout( () => {
      document.getElementById('scoff-animation-enemy').style.display = 'none'
    }, 2000)
    if (Math.random() < this.attackAcc - .15) {
      let defenseDecrease = randomizer(2, 3)
      if (target.defense - defenseDecrease > 0) {
      target.defense = target.defense - defenseDecrease
      } else {
        target.defense = 0
      }
      this.useAct1 = this.useAct1 - 1
      playerImage.classList.add('take-hit')
      battleMessages.textContent = `${this.name} scoffs at ${target.name}! Lowers defense by ${defenseDecrease}.` 
    } else {
      battleMessages.textContent = `${this.name} scoffs at ${target.name}, but ${target.name} doesn't notice!`
    }
  }

  bribe(target) {
    document.getElementById('bribe-animation-enemy').style.display = 'inline'
    setTimeout(() => {
      document.getElementById('bribe-animation-enemy').style.display = 'none'
    }, 2000)
    if (Math.random() < this.attackAcc) {
      bribeSound.play()
      bribeSound.volume = .3
      // add damage to a global attack build counter to permanently increase move damage throughout rest of battle
      attackBuildCounter = attackBuildCounter + 1
      let attackDamage = ((this.attack) + attackBuildCounter) - target.defense
      if (attackDamage > 0) {
        target.hitPoints = target.hitPoints - attackDamage
        this.useAct1 = this.useAct2 - 1
        playerImage.classList.add('take-hit')
        battleMessages.textContent = `${this.name} bribes ${target.name}! Raised bribe attack by 1 and does ${attackDamage} damage.` 
      } else {
        `${this.name} bribes ${target.name}! Raised bribe attack by 1 and does 0 damage.`
      }
    } else {
      battleMessages.textContent = `${this.name} tries to bribe ${target.name}, but ${target.name}'s integrity holds firm!`
    }
  }

  nepotism() {
    document.getElementById('nepotism-animation-enemy').style.display = 'inline'
    setTimeout( () => {
      document.getElementById('nepotism-animation-enemy').style.display = 'none'
    }, 2000)
    if (Math.random() < this.buffAcc) {
      nepotismSound.play()
      nepotismSound.volume = .2
      let healthIncrease = randomizer(10, 15)
      if ((this.hitPoints + healthIncrease) < 50) {
      this.hitPoints = this.hitPoints + healthIncrease
      } else {
        this.hitPoints = 50
      }
      this.useAct3 = this.useAct3 - 1
      battleMessages.textContent = `${this.name} benefits from nepotism! Raises health by ${healthIncrease}.` 
    } else {
      battleMessages.textContent = `${this.name} tries to benefit from nepotism, but his father is worried about the optics!`
    }
  }

  shockedExpression(target) {
    enemyImage.classList.add('enemy-physical-attack')
    document.getElementById('shock-animation-enemy').style.display = 'inline'
    setTimeout(() => {
      document.getElementById('shock-animation-enemy').style.display = 'none'
    }, 2000)
    if (Math.random() < this.attackAcc -.2) {
      shockedSound.play()
      shockedSound.volume = .2
      let attackDamage = randomizer((this.attack + 5) - target.defense, (this.attack + 7) - target.defense)
      attackDamage = attackDamage < 0 ? 0 : attackDamage
      target.hitPoints = target.hitPoints - attackDamage
      this.useAct4 = this.useAct4 - 1
      playerImage.classList.add('take-hit')
      battleMessages.textContent = `Why I never! ${this.name}'s shocked expression does ${attackDamage} damage.`
    } else {
      battleMessages.textContent = `Good heavens! ${this.name}'s shocked expression has no effect on ${target.name}.`
    }
  }
}

// Fourth Enemy Class

class Enemy4 extends Character {
  constructor(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4) {
    super(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4)
  }

  hideInBox(target) {
    if (Math.random() < this.buffAcc - .2) {
      // use global counter variable so that the move and its effects only last for a set number of turns
      playerAccuracyDecreaseCounter = playerAccuracyDecreaseCounter + 3
      let loweredAccuracy = randomizer(2, 3)/10
      target.attackAcc = target.attackAcc - loweredAccuracy
      this.useAct1 = this.useAct1 - 1
      enemyImage.classList.add('enemy-transform-slide')
      setTimeout(() => {
        boxSound.play()
        boxSound.volume = .7
        // change enemy image to a box
        enemyImage.src = 'https://i.postimg.cc/Y92qRHvh/1149.png'
      }, 1000)
      battleMessages.textContent = `${this.name} hides in a box! ${target.name}'s accuracy is lowered by ${loweredAccuracy}.`
    }  else {
      battleMessages.textContent = `${this.name} tries to hide in a box, but ${target.name} isn't fooled!`
    }
  }
  
  cqc(target) {
     enemyImage.classList.add('enemy-physical-attack')
     if (Math.random() < this.attackAcc) {
      cqcSound.play()
      cqcSound.volume = .3
      let attackDamage = randomizer((this.attack - 2) - target.defense, (this.attack + 3) - target.defense)
      attackDamage = attackDamage < 0 ? 0 : attackDamage
      target.hitPoints = target.hitPoints - attackDamage
      this.useAct2 = this.useAct2 - 1
      playerImage.classList.add('take-hit')
      battleMessages.textContent = `${this.name} uses CQC! ${target.name} receives ${attackDamage} damage.`
    } else {
      battleMessages.textContent = `Metal Gear??? ${this.name} tries to use CQC, but has an existential crisis instead!`
    }
  }

  landmine(target) {
    if (enemyEpicAttackCounter === 0) {
      enemyEpicAttackCounter = enemyEpicAttackCounter + 5
      tickingSound.play()
      tickingSound.volume = .3
      this.useAct3 = this.useAct3 - 1
      battleMessages.textContent = `${this.name} planted a landmine!  T-minus ${enemyEpicAttackCounter} turns to detonation.`
      document.getElementById('bomb-animation-enemy').style.display = 'inline'
      setTimeout(() => {
        document.getElementById('bomb-animation-enemy').style.display = 'none'
      }, 2000)
    }

    // After a countdown of turns, bomb will explode doing huge damage to player
    if (enemyEpicAttackCounter === 1) {
      enemyEpicAttackCounter = 0
      let attackDamage = randomizer(this.attack + 20, this.attack + 30)
      target.hitPoints = target.hitPoints - attackDamage
      explosionSound.play()
      explosionSound.volume = .3
      battleMessages.textContent = `A devastating explosion! ${target.name} suffers ${attackDamage} damage.`
      document.getElementById('explosion-animation-enemy').style.display = 'inline'
      setTimeout(() => {
        document.getElementById('explosion-animation-enemy').style.display = 'none'
      }, 2000)
    }
  }

  tranqDart(target) {
    dartSound.play()
    dartSound.volume = .3
    document.getElementById('dart-animation-enemy').style.display = 'inline'
    setTimeout( () => {
      document.getElementById('dart-animation-enemy').style.display = 'none'
    }, 1000)
    if (Math.random() < this.attackAcc - .2) {
      playerSleepCounter = playerSleepCounter + randomizer(1, 3)
      playerSleep.style.display = 'inline'
      playerSleep.classList.add('sleep-animate')
      this.useAct4 = this.useAct4 - 1
      battleMessages.textContent = `${this.name} hits ${target.name} with a tranq dart! ${target.name} passes out immediately.`
    } else {battleMessages.textContent= `${this.name} fires a tranq dart at ${target.name}, but ${target.name} dodges out of the way!`
    }
  }
}

// Fifth Enemy Class

class Enemy5 extends Character {
  constructor(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4) {
    super(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4)
  }

  maniacalLaugh(target) {
    enemyImage.classList.add('up-and-down-slightly')
    laughSound.play()
    laughSound.volume = .2
    if (Math.random() < this.attackAcc - .1) {
      let randomNum = randomizer(2, 4)
      playerConfuseCounter = playerConfuseCounter + randomNum
      playerConfuse.style.display = 'inline'
      playerConfuse.classList.add('waggle-back-and-forth')
      this.useAct1 = this.useAct1 - 1
      battleMessages.textContent = `${this.name} laughs maniacally! ${target.name} is confused.`
    } else {
      battleMessages.textContent = `${this.name} laughs maniacally, but ${target.name} is in on the joke!`
    }
  }

  bloodOnTheRocks() {
    if (Math.random() < this.buffAcc) {
      iceSound.play()
      iceSound.volume = .3
      document.getElementById('blood-animation-enemy').style.display = 'inline'
      setTimeout (() => {
        document.getElementById('blood-animation-enemy').style.display = 'none'
      }, 2000)
      let healthNum = randomizer(8, 12)
      let attackNum = randomizer(1, 2)
      this.hitPoints = this.hitPoints + healthNum
      this.attack = this.attack + attackNum
      this.useAct2 = this.useAct2 - 1
      battleMessages.textContent = `${this.name} enjoys some Blood on the Rocks! He gains ${healthNum} hit points and his strength is increased by ${attackNum}.`
    } else {
      battleMessages.textContent = `${this.name} tries to enjoy his Blood on the Rocks, but ${player.name}'s bad jokes ruin his appetite!`
    }
  }

  psychicBark(target) {
    document.getElementById('psybark-animation-enemy').style.display = 'inline'
    setTimeout(() => {
      document.getElementById('psybark-animation-enemy').style.display = 'none'
    }, 2000)
    if (Math.random() < this.attackAcc - .1) {
      psychicBarkSound.play()
      psychicBarkSound.volume = .3
      let defenseDecrease = randomizer(1, 2)
      let attackDamage = randomizer((this.attack) - target.defense, (this.attack + 4) - target.defense)
      target.hitPoints = target.hitPoints - attackDamage
      if (target.defense - defenseDecrease > 0) {
        target.defense = target.defense - defenseDecrease
      } else {
        target.defense = 0
      }
      this.useAct3 = this.useAct3 - 1
      battleMessages.textContent = `${this.name} barks directly into ${target.name}'s mind! He takes ${attackDamage} damage and his defense is lowered by ${defenseDecrease}.`
    } else {
      battleMessages.textContent = `${this.name} tries to use psychic bark, but ${target.name}'s mind is a steel trap!`
    }
  }

  vampireBite(target) {
    enemyImage.classList.add('flow-to-and-from-player')
    if (Math.random() < this.attackAcc) {
      vampireBiteSound.play()
      vampireBiteSound.volume = .3
      let attackDamage = randomizer((this.attack + 4) - target.defense, (this.attack + 6) - target.defense) 
      target.hitPoints = target.hitPoints - attackDamage
      this.useAct4 = this.useAct4 - 1
      battleMessages.textContent = `${this.name} uses vampire bite on ${target.name}! He suffers ${attackDamage} damage.`
    } else {
      battleMessages.textContent = `${this.name} tries to use vampire bite, but ${target.name} quickly evades!`
    }
  }
}

// Sixth Enemy Class

class Enemy6 extends Character {
  constructor(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4) {
    super(name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4)
  }

  squirtBottle(target) {
    waterSound.play()
    waterSound.volume = .4
    if (Math.random() < this.attackAcc) {
      let attackDecrease = randomizer(1, 3)
      let defenseDecrease = randomizer(1, 3)
      if (target.attack - attackDecrease > 0) {
        target.attack = target.attack - attackDecrease
      } else {
        target.attack = 0
      }
      if (target.defense - defenseDecrease > 0) {
        target.defense = target.defense - defenseDecrease
      } else {
        target.defense = 0
      }
      document.getElementById('bottle-animation-enemy').style.display = 'inline'
      document.getElementById('squirt-animation-enemy').style.display = 'inline'
      setTimeout(() => {
        document.getElementById('bottle-animation-enemy').style.display = 'none'
      document.getElementById('squirt-animation-enemy').style.display = 'none'
      }, 2000)
      this.useAct1 = this.useAct1 - 1
      battleMessages.textContent = `${this.name} squirts ${target.name} with water, and it is DEVASTATING! His attack and defense are lowered.`
    } else {
      battleMessages.textContent = `${this.name} tries to squirt ${target.name} with water, but ${target.name} dashes out of range!`
    }
  }

  crate(target) {
    if (Math.random() < this.attackAcc - .25) {
      playerStunCounter = playerStunCounter + randomizer(1, 3)
      this.useAct2 = this.useAct2 - 1
      playerImage.classList.add('player-transform-slide')
      setTimeout(() => {
        // turns player image into a crate until they are no longer stunned.
        playerImage.src = 'https://i.postimg.cc/1RdJqx5H/pet-travel-plastic-cage-carrier-box-wooden-table-3d-rendering.png'
      }, 1000)
      battleMessages.textContent = `${this.name} puts ${target.name} in the crate! ${target.name} is stunned by this madness!`
    } else {
      battleMessages.textContent = `${this.name} tries to put ${target.name} in the crate, but gets his hand bit instead!`
    }
  }

  vacuum(target) {
    if (Math.random() < this.attackAcc) {
      let attackDamage = randomizer(this.attack - 2, this.attack) - target.defense
      attackDamage = attackDamage < 0 ? 0 : attackDamage
      target.hitPoints = target.hitPoints - attackDamage
      this.useAct3 = this.useAct3 - 1
      battleMessages.textContent = `${this.name} brings out the vacuum, and ${player.name} can't handle it! It does ${attackDamage} damage.`
      vacuumSound.play()
      vacuumSound.volume = .3
      document.getElementById('vacuum-animation-enemy').style.display = 'inline'
      setTimeout(() => {
        vacuumSound.pause()
        document.getElementById('vacuum-animation-enemy').style.display = 'none'
      }, 2500)
    } else battleMessages.textContent = `${this.name} tries to bring out the vacuum, but ${target.name} won't let him!`
  }

  groomer(target) {
    enemyChargeCounter++
    if (enemyChargeCounter === 1) {
      superchargingSound.play()
      superchargingSound.volume = .4
      enemyImage.classList.add('slow-slide-left')
      document.getElementById('supercharging-animation-enemy').style.display = 'inline'
      setTimeout( () => {
        document.getElementById('supercharging-animation-enemy').style.display = 'none'
      }, 2250)
      battleMessages.textContent = `${this.name} is charging up an attack!`
    } else if (enemyChargeCounter === 2) {
        enemyImage.classList.add('enemy-physical-attack')
        if(Math.random() < this.attackAcc - .2) {
          let attackDamage = randomizer((this.attack + 4), (this.attack + 6))
          attackDamage = attackDamage < 0 ? 0 : attackDamage
          target.hitPoints = target.hitPoints - attackDamage
          enemyChargeCounter = 0
          this.useAct4 = this.useAct4 - 1
          playerImage.classList.add('take-hit')
          battleMessages.textContent = ` Oh the humanity! ${this.name} takes ${target.name} to the groomer! ${target.name} suffers ${attackDamage} damage.` 
          warningSound.play()
          warningSound.volume = .3
          document.getElementById('groomer-animation-enemy').style.display = 'inline'
          setTimeout(() => {
            document.getElementById('groomer-animation-enemy').style.display = 'none'
            warningSound.pause()
          }, 3000)
        } else {
          battleMessages.textContent = `${this.name} tries to take ${target.name} to the groomer, but ${target.name} flees in terror!`
          enemyChargeCounter = 0
        }
    }
  }
}

// ****** Character Instantiations Start Here ******

// name, attack, defense, hitPoints, attackAcc, buffAcc, useAct1, useAct2, useAct3, useAct4

// Little Bax

const player = new Player('Little Bax', 8, 5, 50, .95, .9, 3, 12, 12, 3)

// Baxter the Malcontent

const enemy1 = new Enemy1('Baxter the Malcontent', 7, 0, 30, .85, .8, 5, 5, 2, 18)

// Baxtreet Boy

const enemy2 = new Enemy2('Baxtreet Boy', 7, 3, 40, .85, .9, 12, 5, 10, 3)

// Fancy Pants Bax

const enemy3 = new Enemy3('Fancy Pants Bax', 7, 3, 50, .9, .8, 10, 17, 3, 5)

// Metal Gear Bax

const enemy4 = new Enemy4('Metal Gear Bax', 10, 4, 60, .9, .9, 7, 15, 1, 7)

// Count Baxula

const enemy5 = new Enemy5('Count Baxula', 8, 5, 40, .9, .9, 5, 3, 8, 17)

// Baxter Prime

const enemy6 = new Enemy6('Baxter Prime', 12, 3, 70, .95, .9, 3, 5, 18, 3)

// STATE VARIABLES

// status effect counters

let playerSleepCounter

let playerStunCounter

let playerConfuseCounter

let playerChargeCounter

let enemySleepCounter

let enemyStunCounter

let enemyChargeCounter

let attackBuildCounter

let playerAccuracyDecreaseCounter

let enemyEpicAttackCounter 

// arrays to be cycled through

let enemyArr

let enemyDefaultStats

let enemyImageArr

let backgroundImageArr

let gameOverMessageArr

let victoryMessageArr

let musicArr

// variable to determine after battle screen

let winner

// current volume variable

let currentVolume

// CACHED ELEMENTS

// Screen containers
const startScreen = document.querySelector('.start-screen')
const gameOverScreen = document.querySelector('#game-over-screen')
const victoryScreen = document.querySelector('#victory-screen')
const gameCompletionScreen = document.querySelector('#game-completion-screen')

// Content containers
const battleScreen = document.querySelector('.battle-screen-container')
const battleMessageContainer = document.querySelector('.battle-message-container')
const enemyImageContainer = document.getElementById('enemy-image-container')
const playerImageContainer = document.getElementById('player-image-container')

// Contained elements
const enemyHealth = document.getElementById('enemy-healthbar')
const enemyHealthNum = document.getElementById('enemy-hp')
const playerHealth = document.getElementById('player-healthbar')
const playerHealthNum = document.getElementById('player-hp')
const enemyName = document.getElementById('enemy-name')
const playerName = document.getElementById('player-name')
const enemyImage = document.getElementById('enemy-image')
const playerImage = document.getElementById('player-image')
const battleMessages = document.querySelector('.battle-message-text')

// Start Button
const startBtn = document.getElementById('start-button')

// Action buttons
const everyActionBtn = document.querySelectorAll('.action-button')
const actionBtnArr = Array.from(everyActionBtn)
const actionBtn1 = document.getElementById('action-1')
const actionBtn2 = document.getElementById('action-2')
const actionBtn3 = document.getElementById('action-3')
const actionBtn4 = document.getElementById('action-4')
const nextMoveBtn = document.getElementById('next-move')

// Volume Buttons
const volumeBtnContainer = document.querySelector('.mute-btn-container')
const muteBtn = document.querySelector('.mute-button')
const volumeUpBtn = document.getElementById('volume-increase-button')
const volumeDownBtn = document.getElementById('volume-decrease-button')

// Status Effect Items 
const playerSleep = document.getElementById('sleep-image-player')
const enemySleep = document.getElementById('sleep-image-enemy')
const playerConfuse = document.getElementById('confuse-image-player')

// Special Attack Effects - Enemy Shared
const enemyCharges = document.getElementById('charging-animation-enemy')

// Sound Effects - Player
const barkSound = new Audio('./sound-effects/player/bark.mp3')
const biteSound = new Audio('./sound-effects/player/bite.mp3')
const dashSound = new Audio('./sound-effects/player/dash.mp3')
const cutenessSound = new Audio('./sound-effects/player/cuteness.mp3')

// Sound Effects - Misc
const chargingSound = new Audio('./sound-effects/misc/Charging.mp3')
const sleepingSound = new Audio('./sound-effects/misc/StillAsleep.mp3')
const awakeSound = new Audio('./sound-effects/misc/Wake up.mp3')
const confusedSound = new Audio('./sound-effects/misc/Boing.mp3')
const confusedNoLongerSound = new Audio('./sound-effects/misc/Ta da.mp3')
const playerLossSound = new Audio('./sound-effects/misc/Player Loss.mp3')
const enemyLossSound = new Audio('./sound-effects/misc/Enemy Loss.mp3')
const breakingSound = new Audio('./sound-effects/misc/break_crate.mp3')

// Sound Effects - Enemy1
const canteenSound = new Audio('./sound-effects/enemy1/canteen-swill.mp3')
const loreDumpSound = new Audio('./sound-effects/enemy1/lore-dump.mp3')
const epicThrustSound = new Audio('./sound-effects/enemy1/epic-thrust.mp3')
const halfHeartedSwipeSound = new Audio('./sound-effects/enemy1/halfhearted-swipe.mp3')

// Sound Effects - Enemy2
const autographSound = new Audio('./sound-effects/enemy2/autograph-wow.mp3')
const burningSound = new Audio('./sound-effects/enemy2/burning-desire.mp3')
const breakdanceSound = new Audio('./sound-effects/enemy2/Airhorn blast.mp3')
const singingSound = new Audio('./sound-effects/enemy2/singing.mp3')

// Sound Effects - Enemy 3
const scoffSound = new Audio('./sound-effects/enemy3/scoff.mp3')
const bribeSound = new Audio('./sound-effects/enemy3/bribe.mp3')
const nepotismSound = new Audio('./sound-effects/enemy3/nepotism.mp3')
const shockedSound = new Audio('./sound-effects/enemy3/shocked.mp3')

// Sound Effects - Enemy 4
const boxSound = new Audio('./sound-effects/enemy4/box_thud.mp3')
const cqcSound = new Audio('./sound-effects/enemy4/cqc.mp3')
const tickingSound = new Audio('./sound-effects/enemy4/clock _ticking.mp3')
const explosionSound = new Audio('./sound-effects/enemy4/bomb_explosion.mp3')
const dartSound = new Audio('./sound-effects/enemy4/dart.mp3')

// Sound Effects - Enemy 5
const laughSound = new Audio('./sound-effects/enemy5/laugh.mp3')
const iceSound = new Audio('./sound-effects/enemy5/ice.mp3')
const psychicBarkSound = new Audio('./sound-effects/enemy5/Psychic_bark.mp3')
const vampireBiteSound = new Audio('./sound-effects/enemy5/vampire_bite.mp3')

// Sound Effects - Enemy 6
const waterSound = new Audio('./sound-effects/enemy6/water.mp3')
const whimperingSound = new Audio('./sound-effects/enemy6/dog_whimper.mp3')
const vacuumSound = new Audio('./sound-effects/enemy6/vacuum.mp3')
const warningSound = new Audio('./sound-effects/enemy6/groomer_warning.mp3')
const superchargingSound = new Audio('./sound-effects/enemy6/charge-final-boss.mp3')

// Cute Bax Sound (Game Completion Reward)
const cuteBaxSound = new Audio('./sound-effects/misc/completion-whimper.mp3')

// Background Music
const musicTrack = document.getElementById('music-track')


// EVENT LISTENERS

document.getElementById('launch-button').addEventListener('click', () => {
  document.querySelector('.default-screen').style.display = 'none'
  startScreen.style.display = 'flex'
  volumeBtnContainer.style.display = 'flex'
  musicTrack.play()
  currentVolume = .05
  musicTrack.volume = currentVolume
  musicTrack.loop = true
})

startBtn.addEventListener('click', () => {
  initFirstBattle()
  init()
})

document.getElementById('continue-button').addEventListener('click', () => {
  initNextBattle()
  init()
  nextMoveBtn.style.display = 'none'
})

document.getElementById('reset-button').addEventListener('click', resetToStart)

document.getElementById('back-to-start-button').addEventListener('click', resetToStart)

document.getElementById('completion-reset-button').addEventListener('click', resetToStart)

document.getElementById('try-again-button').addEventListener('click', () => {
  init()
  nextMoveBtn.style.display = 'none'
})

actionBtn1.addEventListener('click', () => {
  player.bark()
})

actionBtn2.addEventListener('click', () => {
  player.bite(enemyArr[0])
})

actionBtn3.addEventListener('click', () => {
  player.dash(enemyArr[0])
})

actionBtn4.addEventListener('click', () => {
  player.cuteness(enemyArr[0])
})

document.getElementById('completion-image').addEventListener('mouseover', () => {
  cuteBaxSound.play()
  cuteBaxSound.volume = .3
  cuteBaxSound.loop = true
})

document.getElementById('completion-image').addEventListener('mouseout', () => {
  cuteBaxSound.pause()
})

nextMoveBtn.addEventListener('click', () => {
  nextMoveBtn.style.display = 'none'
  displayActionButtons()
  removeAnimationClasses()
  endConfusion()
  outOfBox()
})

muteBtn.addEventListener('click', () => {
  if (musicTrack.paused) {
    musicTrack.play()
    musicTrack.volume = currentVolume
    muteBtn.classList.add('clicked')
    setTimeout(() => {
      muteBtn.src = 'https://i.postimg.cc/zvh0v9qG/ufuf.png'
      muteBtn.classList.remove('clicked')
    }, 500)
  } else {
    musicTrack.pause()
    muteBtn.classList.add('clicked')
    setTimeout(() => {
      muteBtn.src = 'https://i.postimg.cc/d1nRNwnX/greens2150520-06.png'
      muteBtn.classList.remove('clicked')
    }, 500)
  }
})

volumeDownBtn.addEventListener('click', () => {
  volumeDownBtn.classList.add('clicked')
  setTimeout(() => {
    volumeDownBtn.classList.remove('clicked')
  }, 500)
  currentVolume = currentVolume - .02
  musicTrack.volume = currentVolume
})

volumeUpBtn.addEventListener('click', () => {
  volumeUpBtn.classList.add('clicked')
  setTimeout(() => {
    volumeUpBtn.classList.remove('clicked')
  }, 500)
  currentVolume = currentVolume + .02
  musicTrack.volume = currentVolume
})

// keydown event listeners

document.addEventListener('keydown', function(event) {
  if (event.key === 'm') {
    if (musicTrack.paused) {
      musicTrack.play()
      musicTrack.volume = currentVolume
      muteBtn.classList.add('clicked')
      setTimeout(() => {
        muteBtn.src = 'https://i.postimg.cc/zvh0v9qG/ufuf.png'
        muteBtn.classList.remove('clicked')
      }, 500)
    } else {
      musicTrack.pause()
      muteBtn.classList.add('clicked')
      setTimeout(() => {
        muteBtn.src = 'https://i.postimg.cc/d1nRNwnX/greens2150520-06.png'
        muteBtn.classList.remove('clicked')
      }, 500)
    }
  }
})

document.addEventListener('keydown', function(event) {
  if (event.key === '-') {
    currentVolume = currentVolume - .02
    musicTrack.volume = currentVolume
  }
})

document.addEventListener('keydown', function(event) {
  if (event.key === '+') {
    currentVolume = currentVolume + .02
    musicTrack.volume = currentVolume
  }
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
}

function initPlayerStats() {
  playerName.textContent = `${player.name}`
  player.attack = 8
  player.defense = 5
  player.hitPoints = 50
  player.attackAcc = .95
  player.buffAcc = .9
  player.useAct1 = 4
  player.useAct2 = 12
  player.useAct3 = 12
  player.useAct4 = 2
  playerHealth.value = player.hitPoints
  playerHealthNum.textContent = `${player.hitPoints}`
  playerImageContainer.classList.add('move-in-left')
  actionBtnUpdate()
  endConfusion()
  outOfBox()
  playerChargeCounter = 0
  playerSleepCounter = 0
  playerStunCounter = 0
  playerConfuseCounter = 0
  playerAccuracyDecreaseCounter = 0
}

function initEnemy() {
  enemyName.textContent = `${enemyArr[0].name}`
  // Reset enemy stats
  for (let i = 0; i < enemyDefaultStats.length; i++) {
    enemyArr[i].attack = enemyDefaultStats[i][0]
    enemyArr[i].defense = enemyDefaultStats[i][1]
    enemyArr[i].hitPoints = enemyDefaultStats[i][2]
    enemyArr[i].attackAcc = enemyDefaultStats[i][3]
    enemyArr[i].buffAcc = enemyDefaultStats[i][4]
    enemyArr[i].useAct1 = enemyDefaultStats[i][5]
    enemyArr[i].useAct2 = enemyDefaultStats[i][6]
    enemyArr[i].useAct3 = enemyDefaultStats[i][7]
    enemyArr[i].useAct4 = enemyDefaultStats[i][8]
  }
  enemyHealth.max = enemyDefaultStats[0][2]
  enemyHealth.value = enemyDefaultStats[0][2]
  enemyHealthNum.textContent = `${enemyArr[0].hitPoints}`
  enemyImage.src = enemyImageArr[0]
  enemyImage.style.display = 'inline'
  enemyImageContainer.classList.add('move-in-right')
  enemyChargeCounter = 0
  enemySleepCounter = 0
  enemyStunCounter = 0
  attackBuildCounter = 0
  enemyEpicAttackCounter = 0
}

function initBattleDisplay() {
  startScreen.style.display = 'none'
  gameOverScreen.style.display = 'none'
  victoryScreen.style.display = 'none'
  gameCompletionScreen.style.display = 'none'
  battleScreen.style.display = 'flex'
  displayActionButtons()
  battleMessages.textContent = 'Get ready to rumble!'
  document.querySelector('.combatant-screen-container').style.backgroundImage = backgroundImageArr[0]
  musicTrack.src = musicArr[0]
  if (muteBtn.src === 'https://i.postimg.cc/d1nRNwnX/greens2150520-06.png') {
    musicTrack.pause()
  } else {
    musicTrack.play()
    musicTrack.volume = currentVolume
  }
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
  enemyDefaultStats = [[7, 0, 30, .85, .8, 5, 5, 2, 18], [7, 3, 40, .85, .9, 12, 5, 10, 3], [7, 3, 50, .9, .8, 10, 17, 3, 5], [10, 4, 60, .9, .9, 7, 15, 1, 7], [8, 5, 40, .9, .9, 5, 3, 8, 17], [12, 3, 70, .95, .9, 3, 5, 18, 3]]
  enemyImageArr = ['https://i.postimg.cc/MZ5z6T94/Baxter-The-Malcontent.png', 'https://i.postimg.cc/9M3Q7n9n/072drbw.png', 'https://i.postimg.cc/kgfSW-qMh/fancy-Bax-final.png', 'https://i.postimg.cc/MZNf6nc5/solidBAX.png', 'https://i.postimg.cc/5xm6P23y/Baxula-final.png', 'https://i.postimg.cc/KvD0y8dj/baxter-prime.png']
  backgroundImageArr = ["url('https://static9.depositphotos.com/1550726/1156/i/450/depositphotos_11560376-stock-photo-fantasy-autumn-forest-with-fog.jpg')", "url('https://i.imgur.com/I2xaf7U.jpg')", "url('https://i.imgur.com/XI4qNhj.jpeg')", "url('https://i.imgur.com/lz5ukSl.png')", "url('https://i.imgur.com/yz15RI8.jpg')", "url('https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2d3MDkyeDk0MGRvam00NXplaTVpaDM2NWcxY3Z4c2JpZml5N3d6eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6sV5haPBF8ZYIHOoeK/giphy.gif')"]
  musicArr = ['./background-music/Unite The Clans.mp3', './background-music/Bad Boys.mp3', './background-music/Dance With Fate.mp3', './background-music/thriller_music.mp3', './background-music/Unholy Knight.mp3', './background-music/Arasaka.mp3']
  victoryMessageArr = ['The next opponent truly dances around the ring!', 'The next opponent always puts his money where his mouth is!', 'The next opponent is sneaky good!', 'The next opponent only fights at night!', 'Are you ready to face your greatest fears?']
}

function initNextBattle() {
  // Remove first item in each array to shift everything forward for the next battle
  enemyArr.shift()
  enemyDefaultStats.shift()
  enemyImageArr.shift()
  backgroundImageArr.shift()
  musicArr.shift()
  victoryMessageArr.shift()
}

// Randomizer Function

function randomizer(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Visually updates player health and action uses, and triggers sleep and stun messages, animations, and sounds

function renderPlayerUpdates() {

  healthUpdates()
  actionBtnUpdate()

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
      battleMessages.textContent = `${player.name} breaks out of his prison!`
      playerStunCounter--
      breakingSound.play()
      breakingSound.volume = .2
      playerImage.classList.add('player-transform-slide')
      setTimeout(() => {
        playerImage.src = 'https://i.imgur.com/0sgCwy1.png'
      }, 1000)
    } else if (playerStunCounter > 1) {
      battleMessages.textContent = `${player.name} is stuck in the crate!`
      playerStunCounter--
      // animation
      whimperingSound.play()
      whimperingSound.volume = .3
      playerImage.classList.add('up-and-down-slightly')
      setTimeout(() => {
        whimperingSound.pause()
      }, 2000)
    }
  }

  renderEnemyUpdates()

  checkWinner()

  setTimeout(() => {fightRound()}, 2000)
}

// Same as player updates, but for current enemy

function renderEnemyUpdates() {

  healthUpdates()

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

function healthUpdates() {
  playerHealth.value = player.hitPoints
  playerHealthNum.textContent = player.hitPoints < 0 ? '0' : `${player.hitPoints}`
  enemyHealth.value = enemyArr[0].hitPoints
  enemyHealthNum.textContent = enemyArr[0].hitPoints < 0 ? '0' : `${enemyArr[0].hitPoints}`
}

// checks to see if there's a winner and triggers victory/defeat messages, animations, and sounds

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

// Brings up either the victory or game over screen based on the winner

function declareWinner() {
  if ((winner === player) && (enemy6.hitPoints <= 0)) {
    setTimeout(() => {
      battleScreen.style.display = 'none'
      gameCompletionScreen.style.display = 'flex'
      musicTrack.src = './background-music/Game-completion.mp3'
      if (muteBtn.src === 'https://i.postimg.cc/d1nRNwnX/greens2150520-06.png') {
        musicTrack.pause()
      } else {
        musicTrack.play()
        musicTrack.volume = currentVolume
        musicTrack.loop = true
      }
    }, 2000)
  } else if (winner === player) {
    setTimeout(() => {
      battleScreen.style.display = 'none'
      victoryScreen.style.display = 'flex'
      document.querySelector('#victory-message').textContent = victoryMessageArr[0]
      musicTrack.src = './background-music/victory-screen.mp3'
      if (muteBtn.src === 'https://i.postimg.cc/d1nRNwnX/greens2150520-06.png') {
        musicTrack.pause()
      } else {
        musicTrack.play()
        musicTrack.volume = currentVolume
        musicTrack.loop = true
      }
    }, 2000)
  } else {
    setTimeout(() => {
      battleScreen.style.display = 'none'
      gameOverScreen.style.display = 'flex'
      document.querySelector('#game-over-message').textContent = gameOverMessageArr[Math.floor(Math.random() * 10)]
      musicTrack.src = './background-music/gameover-screen.mp3'
      if (muteBtn.src === 'https://i.postimg.cc/d1nRNwnX/greens2150520-06.png') {
        musicTrack.pause()
      } else {
        musicTrack.play()
        musicTrack.volume = currentVolume
        musicTrack.loop = true
      }
    }, 2000)  
  }
}

// Primes the enemy and player for animations and sets the enemy's move in motion

function fightRound() {

  removeAnimationClasses()

  if ((enemySleepCounter === 0) && (enemyStunCounter === 0) && (winner === null)) {

    // Determine enemy battle logic based on which enemy it is
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

  setTimeout(() => {
    nextMoveBtn.style.display = 'inline'
  }, 2000)
}  

// The battle logic of the first enemy, Baxter the Malcontent
 
function fightRound1() {

  // Will automatically perform charge attack if he charged up last turn
  
  if (enemyChargeCounter > 0) {
    enemy1.epicThrust(player)
  } else {

    let randomNum = Math.random()

    // If enemy health is low, enemy will have 75% chance of using epic thrust

    if (enemy1.hitPoints <= 15) {
      if ((randomNum > .75) && (enemy1.useAct1 > 0) && (enemy1.hitPoints > 5)) {
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
        else {battleMessages.textContent = `${enemy1.name} skips his turn!`}
      }
   }

    // If enemy health is high, has a 50% chance of using half-hearted swipe and a 50% chance of using either canteen swill or lore dump

    if (enemy1.hitPoints > 15) {
      if ((randomNum > .75) && (enemy1.useAct2 > 0) && (playerSleepCounter === 0)) {
        enemy1.loreDump(player)
      } else if ((randomNum < .25) && (enemy1.useAct1 > 0)) {
        enemy1.canteenSwill()
      } else if (enemy1.useAct4 > 0) {
        enemy1.halfHeartedSwipe(player)
      } else if ((enemy1.useAct2 > 0) && (playerSleepCounter === 0)) {
        enemy1.loreDump(player)
      } else if (enemy1.useAct3 > 0) {
        enemy1.epicThrust(player)
      } else if ((enemy1.useAct1 > 0)) {
        enemy1.canteenSwill()
      } else {
        battleMessages.textContent = `${enemy1.name} skips his turn!`
      }
    }
  }

  // Visually updates player and enemy health and checks again for winner 

  healthUpdates()
  checkWinner()
}

function fightRound2() {
  if (enemyChargeCounter > 0) {
    enemy2.hitTheHighNote(player)
  } else {

    let randomNum = Math.random()

    if (enemy2.hitPoints <= 20) {
      if ((randomNum > .25) && (enemy2.useAct4 > 0)) {
        enemy2.hitTheHighNote(player)
      } else if ((randomNum > .10) && (enemy2.useAct1 > 0)) {
        enemy2.signAutograph(player)
      } else if (enemy2.useAct2 > 0) {
        enemy2.burningDesire(player)
      } else if (enemy2.useAct3) {
        enemy2.breakDance()
      } else {
          battleMessages.textContent = `${enemy2.name} skips his turn!`
        }
    } else if (enemy2.hitPoints > 20) {
      if ((randomNum > .66) && (enemy2.useAct3 > 0)) {
        enemy2.breakDance()
      } else if ((randomNum > .33) && (enemy2.useAct1 > 0) && (enemy2.hitPoints < 40)) {
        enemy2.signAutograph(player)
      } else if (enemy2.useAct2 > 0) {
        enemy2.burningDesire(player)
      } else if ((enemy2.useAct3 > 0) && (enemy1.useAct1 > 0)) {
         if (Math.random() > .5) {
          enemy2.breakDance()
         } else {
          enemy2.signAutograph
         }
      } else if (enemy2.useAct4 > 0) {
        enemy2.hitTheHighNote(player)
      } else {
        battleMessages.textContent = `${enemy2.name} skips his turn!`
      }
    }
  }

  healthUpdates()
  checkWinner()
}

function fightRound3() {

  let randomNum = Math.random()
  
  if (enemy3.hitPoints < 25) {
    if ((randomNum > .66) && (enemy3.useAct3 > 0)) {
      enemy3.nepotism()
    } else if ((randomNum > .33) && (enemy3.useAct2 > 0)) {
      enemy3.bribe(player)
    } else if (enemy3.useAct4 > 0) {
      enemy3.shockedExpression(player)
    } else if (enemy3.useAct3 > 0) {
      enemy3.nepotism()
    } else if (enemy3.useAct2 > 0) {
      enemy1.bribe(player)
    } else if (enemy3.useAct1 > 0) {
      enemy3.scoff(player)
    }
    else {
      battleMessages.textContent = `${enemy3.name} skips his turn!`
    }
  } else {
      if ((randomNum > .5) && (enemy3.useAct4 > 0)) {
        enemy3.bribe(player)
      } else if ((randomNum > .25) && (enemy3.useAct1 > 0)) {
        enemy3.scoff(player)
      } else if (enemy1.useAct4 > 0) {
        enemy3.shockedExpression(player)
      } else if (enemy1.useAct1 > 0) {
        enemy3.scoff(player)
      } else if (enemy3.useAct4 > 0) {
        enemy3.bribe(player)
      } else if (enemy3.useAct3 > 0) {
        enemy3.nepotism()
      }
      else {
        battleMessages.textContent = `${enemy3.name} skips his turn!`
      }
    }

  healthUpdates()
  checkWinner()
}

function fightRound4() {

  let randomNum = Math.random()

  // sets player attack accuracy back to default once the accuracy decrease counter reached 0
  if (playerAccuracyDecreaseCounter > 0) {
   playerAccuracyDecreaseCounter = playerAccuracyDecreaseCounter - 1
   if (playerAccuracyDecreaseCounter === 0) {
    player.attackAcc = .95
   }
  }

  if ((enemy4.hitPoints <= 40) && (enemy4.useAct3 > 0)) {
    enemy4.landmine(player)
  } else {
    if (enemyEpicAttackCounter > 0) {
      if (enemyEpicAttackCounter > 1) {
        enemyEpicAttackCounter = enemyEpicAttackCounter - 1
        if ((randomNum > .66) && (enemy4.useAct1 > 0) && (playerAccuracyDecreaseCounter === 0)) {
          enemy4.hideInBox(player)
        } else if ((randomNum > .33) && (enemy4.useAct3 > 0) && (playerSleepCounter === 0)) {
          enemy4.tranqDart(player)
        } else if ((enemy4.useAct1 > 0) && (playerAccuracyDecreaseCounter === 0) && !(enemyImage.classList.contains('enemy-transform-slide'))) {
          enemy4.hideInBox(player)
        } else if (enemy4.useAct2 > 0) {
          enemy4.cqc(player)
        } else {
        battleMessages.textContent = `${enemy4.name} skips his turn!`
        }
      setTimeout(() => {
        battleMessages.textContent = `${enemyEpicAttackCounter}`
      }, 2000)
      } else {
      enemy4.landmine(player)
      }
    } else {
      if ((enemy4.hitPoints >= 25) || (enemy4.useAct3 === 0)) {
        if ((randomNum > .66) && (enemy4.useAct2 > 0)) { 
          enemy4.cqc(player)
        } else if ((randomNum > .33) && (enemy4.useAct4 > 0) && (playerSleepCounter === 0)) {
          enemy4.tranqDart(player)
        } else if ((enemy4.useAct1 > 0) && (playerAccuracyDecreaseCounter === 0) && !(enemyImage.classList.contains('enemy-transform-slide'))) {
          enemy4.hideInBox(player) 
        } else if (enemy4.useAct2 > 0) {
          enemy4.cqc(player)
        } else if ((enemy4.useAct4 > 0) && (playerSleepCounter === 0)) {
          enemy4.tranqDart(player)
        } else {
          battleMessages.textContent = `${enemy4.name} skips his turn!`
        }
      }
    } 
  }
  healthUpdates()
  checkWinner()
}

function fightRound5() {

  let randomNum = Math.random()

  if (enemy5.hitPoints < 20) {
    if ((Math.random() < .5) && (enemy5.useAct2 > 0)) {
      enemy5.bloodOnTheRocks()
    } else {
      if ((randomNum < .33) && (enemy5.useAct1 > 0) && (playerConfuseCounter === 0)) {
        enemy5.maniacalLaugh(player)
      } else if ((randomNum > .66) && (enemy5.useAct3 > 0) && (player.defense > 0)) {
        enemy5.psychicBark(player)
      } else if (enemy5.useAct4 > 0 ){
        enemy5.vampireBite(player)
      } else {
        battleMessages.textContent = `${enemy5.name} skips his turn!`
      }
    }
  } else if (enemy5.hitPoints >= 20) {
    if ((randomNum < .33) && (enemy5.useAct1 > 0) && (playerConfuseCounter === 0)) {
      enemy5.maniacalLaugh(player)
    } else if ((randomNum > .66) && (enemy5.useAct3 > 0) && (player.defense > 0)) {
      enemy5.psychicBark(player)
    } else if (enemy5.useAct4 > 0) {
      enemy5.vampireBite(player)
    } else {
      battleMessages.textContent = `${enemy5.name} skips his turn!`
    }
  }

  healthUpdates()
  checkWinner()
}

function fightRound6() {

  if (enemyChargeCounter > 0) {
    enemy6.groomer(player)
  } else {
    let randomNum = Math.random()
    if (enemy6.hitPoints <= 45) {
      if ((randomNum > .5) && (enemy6.useAct1 > 0)) {
        enemy6.squirtBottle(player)
      } else if (enemy6.useAct4 > 0) {
        enemy6.groomer(player)
      } else if ((randomNum < .25) && (enemy6.useAct2 > 0) && (playerStunCounter === 0)) {
        enemy6.crate(player)
      } else if (enemy6.useAct3 > 0) {
        enemy6.vacuum(player)
      } else {
        battleMessages.textContent = `${enemy6.name} skips his turn!`
      }
    }

    if (enemy6.hitPoints > 45) {
      if ((randomNum < .33) && (enemy6.useAct2 > 0) && (playerStunCounter === 0)) {
        enemy6.crate(player)
      } else if ((randomNum > .66) && (enemy6.useAct4 > 0)) {
        enemy6.groomer(player) 
      } else if (enemy6.useAct3 > 0) {
        enemy6.vacuum(player)
      } else if (enemy6.useAct1 > 0) {
        enemy6.squirtBottle(player)
      } else {
        battleMessages = `${enemy6.name} skips his turn!`
      }
    }
  }
  
  healthUpdates()
  checkWinner()
}

// Removes the classes associated with various animations to prime the player and enemy to repeat animations if necessary

function removeAnimationClasses() {
  playerImage.classList.remove('player-physical-attack', 'take-hit', 'player-transform-slide', 'up-and-down-slightly')
  enemyImage.classList.remove('enemy-physical-attack', 'take-hit', 'upside-down-spin', 'enemy-transform-slide', 'up-and-down-slightly', 'flow-to-and-from-player', 'slow-slide-left')
  playerSleep.classList.remove('sleep-animate')
  enemySleep.classList.remove('sleep-animate')
  playerConfuse.classList.remove('waggle-back-and-forth')
  enemyImageContainer.classList.remove('move-in-right')
  playerImageContainer.classList.remove('move-in-left')
}

// Full reset to start screen

function resetToStart() {
  victoryScreen.style.display = 'none'
  gameOverScreen.style.display = 'none'
  gameCompletionScreen.style.display = 'none'
  nextMoveBtn.style.display = 'none'
  startScreen.style.display = 'flex'
  musicTrack.src = './background-music/Play.mp3'
  if (muteBtn.src === 'https://i.postimg.cc/d1nRNwnX/greens2150520-06.png') {
    musicTrack.pause()
  } else {
    musicTrack.play()
    musicTrack.loop = true
    musicTrack.volume = currentVolume
  }
}

// Hides action buttons and displays next turn button

function hideActionButtons() {
  for (let button of actionBtnArr) {
    button.style.display = 'none'
  }
}

function displayActionButtons() {
  for (let button of actionBtnArr) {
    button.style.display = 'inline'
  }
}

// This triggers enemy4's animation to leave box

function outOfBox() {
  if ((playerAccuracyDecreaseCounter === 1) && (enemyArr[0] === enemy4)) {
    battleMessages.textContent = `${enemy4.name} leaps out of the box!` 
    enemyImage.classList.add('enemy-transform-slide')
    setTimeout(() => {
    boxSound.play()
    enemyImage.src = 'https://i.postimg.cc/MZNf6nc5/solidBAX.png'
    }, 1000)
  }
}

// Stops the music

function stopMusic() {
  musicTrack.pause()
}

// Is triggered if player is confused and the confuseNum doeesn't meet the value range needed to move

function tooConfused() {
  battleMessages.textContent = `${player.name} is too confused to act!`
  confusedSound.play()
  confusedSound.volume = .3
  playerConfuse.classList.add('waggle-back-and-forth')
  hideActionButtons()
  renderPlayerUpdates()
}

// Ends Baxter's confusion after set number of turns

function endConfusion() {
  if (playerConfuseCounter > 0) {
    playerConfuseCounter--
    if (playerConfuseCounter === 0) {
      playerConfuse.style.display = 'none'
      battleMessages.textContent = `${player.name} shakes off his confusion!`
      confusedNoLongerSound.play()
      confusedNoLongerSound.volume = .3
    }
  }
}

function actionBtnUpdate() {
  actionBtn1.innerHTML = `<span class="action-command">Bark</span><br /> Uses Left: ${player.useAct1}`
  actionBtn2.innerHTML = `<span class="action-command">Bite</span><br /> Uses Left: ${player.useAct2}`
  actionBtn3.innerHTML = `<span class="action-command">Dash</span><br /> Uses Left: ${player.useAct3}`
  actionBtn4.innerHTML = `<span class="action-command">Cuteness</span> <br />Uses Left: ${player.useAct4}`
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

document.addEventListener('keydown', function(event) {
  if (event.key === '6') {
    enemy4.hideInBox(player)
  }
})

document.addEventListener('keydown', function(event) {
  if (event.key === '7') {
    enemy6.groomer(player)
  }
})