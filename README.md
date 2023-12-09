# Bax Attacks!
Project 1 - turn based battle

This is a turn-based fighting game heavily inspired by Pokemon Red, Mike Tyson's Punch-Out, and about a thousand other things. You play as a dog named Little Bax who must defeat six opponents, each of which are variations of Baxter from different genres. You must help Little Bax defeat his inner demons and face his greatest fears! If you succeed, you will receive the greatest reward possible.  Do you have what it takes to survive the Baxter gauntlet? 

![Wireframe Photo](https://i.imgur.com/0l2NtmL.png)

OVERVIEW:

This is a turn-based battle system where the player and enemies have multiple options. The battle logic is such that enemies will react to what the player is doing and how the battle is going, and both the player and enemies can inflict status effect moves that change various stats for themselves and their opponents. Once a combatant's hit points reach 0, the battle is over and the other fighter has won.

PSEUDOCODE:

The first screen is set up with a button to officially launch the game.

You then arrive at the start screen and get prompted to click the start button to begin fighting.

You fight enemies one-by-one and will see a "victory screen" if you win and a "game over screen" if you lose.  You can try any battle over again if you lose or you can choose to return to the start screen.

While in a battle, you will select a move each round with the enemy having an opportunity to respond with a move of their own after your turn.

The "Battle Message" box will keep you updated on the battle progress and will let you know what the various moves do, including how much damage they inflict and how they affect combatant stats.

If you are able to defeat all six enemies, you are taken to the "game completion screen," where a surprise reward awaits you!

INSTRUCTIONS:

You can use the '+' and '-' keys to lower the music volume, and you can either click on the sound button in the top right of the screen or press the 'm' button to mute the music altogether.  

While in battle, press one of the four buttons to perform a move. The name of the move and the number of uses left are written in text on the button.  Be careful: if you run out of uses, you cannot use that move for the rest of the battle!

In between battles, you can click the buttons to either continue (if you had won the previous battle), try again (if you lost), or reset everything and return to the start screen.

If you are able to reach the game completion screen, you can... well, you'll see!

PLAYER MOVES:

Bark - increase player's attack

Bite - strong physical attack on opponent

Dash - physical attack on opponent that also lowers their defense

Cuteness - decrease opponent's attack accuracy

CHARACTER STATS:

Attack - base damage for character's attacks

Defense - amount of damage a character can absorb without losing hit points

Hit Points - once a character loses all of their hit points, they are defeated

Attack Accuracy - the likelihood that a character's offensive move against the opponent will hit

Buff Accuracy = the likelihood that a character's move will successfully boost their own stats

Use Act 1-4: the limit number of uses for each move

STATUS EFFECTS:

Sleep/Stun - character will be unable to perform a move for a set number of turns

Confused - 50% chance that a character will be unable to perform a move each turn until effect disappears

Charge - some moves require a turn to charge before being unleashed on the opponent

SCREENSHOTS: 

![StartScreen](https://i.imgur.com/jWpta2R.png)

![VictoryScreen](https://i.imgur.com/CoFAJwU.png)

![Battle](https://i.imgur.com/3ylOlrS.png)

TECHNOLOGIES USED:

- HTML
- CSS
- Javascript

PROJECT LINK:

https://pshephardiii.github.io/Bax-Attacks/

NEXT STEPS:

Balance the player and enemy attacks, adjust move uses, and set all status effects to stay active for only a few turns.

Give the player a choice of moves, either by adding more moves to the player class, letting them choose a number of moves from a set list, or creating other player characters that one could select.

Set up new status effects for both players and enemies. For instance, there's no current way for the player to make the enemy go to sleep.

Add a level up system that allows the player to improve stats based on experience and/or performance.

Add an element system that the player can use to exploit enemy weaknesses. For instance, one enemy could be weak to fire attacks.

As a bonus reward for completing the game, allow player to fight as one of the enemy characters.
