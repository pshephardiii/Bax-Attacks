# Baxter-Battle
Project 1 - turn based battle

![Wireframe Photo](https://i.imgur.com/6slKcgE.jpg)

Basic Idea: Create a turn based battle system where the player and enemies have multiple options.  Make the battle logic so that the following things happen: (a) enemies act in ways that make sense based on how the battle is going, (b) both enemies and player can have status effects that affect their stats and turn-based abilities, (c) allow for charge attacks that take more than one turn to complete, and (d) the battle is visually represented with animations, time delays, and messages.  

1. Create containers for health bars, battle visuals, battle messages, and buttons for player action

2. Health bars
  2.1 Will need a health bar for both player and computer.  They need to reflect the current HitPoints for the respective fighters
  2.2 Player health bar should be just below name of player fighter and enemy health bar should be just below name of enemy
  2.3 I'll probably check out the space battle project that group 3 did to get an idea of how to do health bars

3. Battle visuals
  3.1 Need image of player figure facing up towards enemy (pokemon red style)
  3.2 Need ~6 images of all the enemies facing player one by one.  Will probably stick them all in an array and trigger them one at a time with event listener on a "next opponent" button.
  3.3 I'll make these images myself with photoshop or something... then add them to imgur and link them to html elements.
  3.4 Create animations for both player and enemy that reflect when one is performing an action, getting hurt, healing, etc.  How crazy I go with this will depend on time, but I want at least some animation involved.

4. Player character
  4.1 Create a base class of fighter that has name, HP, and other stats.  
  4.2 Start with one player character that is assigned with a specific subclass that has name, HP, and limited number of action use that corresponds to four methods (ex. fireballUse = 5).  When action use is depleted, player can no longer perform action (use counters and conditionals in methods to display error message if player attempts to use depleted action).  If I have time, I'll introduce options for different player classes that have different methods.
  4.3 Each method should inflict a range of damage points and have a set accuracy.  The basic setup will be attacks and heals, but I could add (if time) defend, moves that require charging, combat buffs (like increasing power, etc.).  This also depends on whether I'll be using stats like strength, etc. or just couching damage within methods.

5. Enemy characters
  5.1 Create ~6 unique subclasses starting out with just one method each (add more after I make sure basic setup works).  
  5.2 Instantiate each class with an enemy object and put them all in an array.
  5.3 Cycle through enemy objects to correspond with enemy images.  These battles will happen in a scripted order, so I can just rely on array index to do this.

6. Button container
  6.1 When in battle, have four buttons to correspond to possible player actions.  Each needs an event listener that triggers the corresponding method.
  6.2 When not in battle, have a start button at beginning, continue and reset button in between battles. 

7. Battle messages
  7.1 Lots of messages to generate here, including prompts to start or continue, battle updates on each attack, victory and defeat messages, etc.
  7.2 I'll have to think about the most efficient way to do this... options include:
    7.2.1 Build battle messages into the class methods (like we did for the space battle)
    7.2.2 Generate messages within event listeners for buttons
    7.2.3 Couch message generation within a function (I'll have to think about how to do this)

8. Battle logic
  8.1 Here's where things could get complicated.  Start out by having enemies perform one attack over and over.  If more actions are added, can either use randomization or conditionals (with battle conditions) to determine enemy actions.
  8.2 The enemy should react to each player action with an action of their own.  IF TIME: try to make it so that the actions are sequential rather than simultaneous... player action happens, THEN enemy action happens.  I'll have to figure out how to do this.
  8.3 When things get more complex, one idea would be to couch enemy reactions within functions.  For instance, have a function that uses conditionals to determine the enemy action (like 50% chance to attack, 50% chance to defend... when HP below 40%, heal, etc.).  Then throw all those functions into the event listeners for the player action buttons.  Should make things more efficient.
  8.4 To test everything, add a cheat code like Group 3 did for space battle

  -------- IF TIME PERMITS --------

9. Music
  9.1 We'd need a container that has music slider bar and mute button.
  9.2 Follow example on our space battle to do this.  
  9.3 Start with one track, then add if time.  It'd be cool to have a different track play for each battle, victory music, defeat music, etc.  I'd probably couch the tracks in an array and use indexes to play a specific track when needed.
  9.4 I'm not completely sure how to change tracks... I'm guessing I can just change the src of the audio, but I'll need to make sure.
  9.5 Figure out how to loop tracks so they don't end before battle finishes.

10. Sound effects
  10.1 Again, follow example on our space battle.
  10.2 Start with just one sound effect for every action, then expand from there.  It'd be cool to have unique sounds for different kinds of actions.
  10.3 It'd also be cool to have a slider bar just for sound effects that doesn't change music.

11. Animations (crazy edition)
  11.1 Have different animations for different actions for both player and enemies.  This could be very time consuming, so only do this if there's plenty of time!
  11.2 Create the animations first, then have them correspond with having a certain CSS class.  Add and remove the class from the relevant images in event listeners.  
  11.3 Challenge: have the animations be sequential rather than simultaneous.  Ex. player attacks, THEN enemy gets hit.  Again, would have to look this up... time delay maybe?

12. Start/End screen
  12.1 Like the space battle by group 3, it'd be cool to have a start screen and an end screen.
  12.2 For start screen, I'm guessing I'd just hide everything and have an event listener for a start button that displays it all.
  12.3 End screen would depend on a conditional which would make everything else disappear and the end screen to appear.  Ex. when player health hits 0, gameover screen comes up.  When enemy array is empty, victory screen comes up.
  12.4 Each "screen" could just be a hidden container in the html that gets triggered under certain conditions.
  12.5 It would also be cool to have unique music for each screen!  I think I'd accomplish this by just changing the track based on conditions.  Once I figure it out, should be straightforward.

13. Complex battle logic
  13.1 Give each enemy four actions as well, and have them react to how the battle is going/what the player is doing with conditionals.  Start simple then keep adding.  I don't mind scripting these battles a bit, but this all really depends on time.

14. Level up system
  14.1 I really doubt I'll have time to do this, but I could implement a level up system such that player stats increase once a certain experience threshold is met.
  14.2 Player stats could be strength, defense, etc.
  14.3 Note: I'll need to think about whether I want to start out with these stats in the beginning or just couch damage within the methods themselves.  

15. Enemy weaknesses
  15.1 Have certain enemies be weak to specific player attacks.  For instance, a fire type could be weak to water attack, etc.
  15.2 I'd start by couching this in the method with conditionals.  If target has certain subclass, do extra damage.  I'm not totally sure this would work, so I'll have to brainstorm other options if it doesn't.

16. Player character selection
  16.1 One way to do this would be to allow players to choose a specific class that has unique methods.  I'd just do this with buttons and event listeners.  After button is pressed, just instantiate a player character of that specific class.  Have name always be the same to make battle logic manageable.
  16.2 A more ambitious approach would be to have a player select screen.  I'd need images and hover effects, and maybe even some animations when a particular player is picked.  I highly HIGHLY doubt I'll have time to do this, but it'd be cool.

17. Unique backgrounds
  17.1 It'd be cool to change the background based on the enemy... maybe even having a moving background for the final boss (I'd have to look up how to incorporate GIFs).
  17.2 I'm guessing I could do this like I would unique music tracks... stuff background images into an array and display them as needed based on index.

Note on status effects:
  Consider increasing or decreasing attack.  Each time a character's attack is affected, I should push the amount of damage it increases by into a global array.  Next, I'll need a unique counter corresponding to that amount of damage.  I could have another array that houses the number 3 for turns left.  I could then use a loop in the fightRound() function to to tick down the number.  Challenge: what to do if I increase attack, then enemy immediately decreases? I could use splice to get rid of zeroes in array, but how to make that work with the damage array?  Ah, same thing... just use splice.
