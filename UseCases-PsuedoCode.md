# Project Title

RPG Game - Theme Democratic Candidates

## Description

User picks candidate and battles one by one to win nomination.
(and advance to general election round)

![Democratic Nomination](assets/images/wireframe.png)

## Requirement Note

Game tuning - the demo requirment stated that a low level character should
be able to win and high level character should be able to lose

That is the case with this implementation, but given that in this game you
face 7 oponents versus 3 in the demo achieving the above is more complex.

I have take measures to add variablity in the characters.  I low hit point (Health)
one might have a strong counter attack and high hit point one might have low counter attack.
The characters have a general range of health in bell curve.

So yes you can win with a low level character but not easily and not often.
And yes a high level character can lose even if starting out against low level ones as
they may run into a strong counter attacker.

Finally - this design features the main campaign and then a bonus boss round in the form
of the general 2010 Election against the sitting president. It was necessary if getting
to this round to have the player's heath refreshed a bit and attack rating reset a bit
to make for a compelling/competive bonus round.


## User Stories / Use Cases

1.  game starts in browser 
    1. page has transparent boxes over background:  Front-Runner, News Feed, Challenger, Contenders, Candidates
        1. 8 candidate badges appear in candidates field at bottom of screen - order will be randomized
        2. the candidates will have strength numbers in the form of "Favorable" percentages where percent will equate to "health points"
            1. each candidate has 3 attribute:  health (shown on badge), campaign offensive effectiveness (unseen) and campaign
              defensive effectiveness (unseen) 
            2. the three attributes will be randomizes with ranges:  2 weak candidates, 2 low-mid candidates, 2 mid-high and 2 - high;
              Exact play balance ranges for the attributes is TBD.
        3. badges will have names at top and head image in middle with nice framework and background
        5. news feed will have - message:  Welcome to the Democratic Nomination Race - pick yourself a Candidate to play with by clicking it

2. player clicks candidate
    1. the candidate move from Candidate box to the front-runner box
    2. the remaining candidates move to Contenders box and Candidates box is re-title to "Political Dustbin"
    3. news feeds changes to  "now pick a contender to campaign against"
    4. clicking on own candidate once in front-runner box does nothing
    5. note: the Front-runner does not use their defensive effectiveness rating

3. player clicks candidate (fyi: they are now all in contender box)
    1. the candidate moves to the challenger box
    2. clickable button appears under News Feed "Campaign Against"
    3. news feed changes to "Ready to do political battle with (challenger's namve here)?"  Click "Campaign Against" button"
    4. clicking on candidate once in challeger box does nothing
    4. clicking on another candidate in contender box does nothing

4. player clicks "Campaign Against" button
    1. Campaign calculation takes place.
        1.  Front-Runner deals reduction to Challengers favorable rating via their offensive effectiveness.
        2.  Challenger deals reduction to Front-Runner via their defensive effectiveness
        3.  Front-Runner's offensive effectiveness increments by base amount (ex. if base starts at 8 then after first campaign effectiveness goes to 16, then 24, 32, etc.)
        3.  Front-runner losses if favorable rating drops to 0 or below 
        4.  Front-Runner wins if Challenger favorable rating drops to 0 or below (but check for loss first then win)
        5.  Campaign continues otherwise

  2. If loss then
      1. News feed reports results of last battle and loss condition
      2. Front-Runner badge moves to dustbin box and challenger moves to Front-Runner box
      3. Campaign button changes wording to "Play Again"
      4. player clicks "play again" and the board resets to its original configuration = see use case for "game starts in browser"

  3. If win then and there are contenders remaining
      1. News feed reports results of last battle and win condition and prompts player to pick next challenger
      2. challenger is moved to Poltical Dustbin box
      2. click on "Campaign Against" button does nothing until use has picked next challenger

  4. If win and there are no contenders then 
      1. News feed reports results of last battle and Campaign Win condition 
      2. Campaign button & news feed change to Presidental Election bonus round wording

  5. *** Bonuse Round Use Case 
      1. upon winning the Campaign - i.e. Democratic Nomination a final round for the Presidential Election is held
      2. hide the contenders and dustbin boxes
      3. move Trump badge to the Front-Runner box and re-title box to Incumbant
      4. move player's badge to Challenger box
      5. change button text  - there will be an extra click step to build anticipate and allow for additional 
         news feed messaging and other page layout adjustments
      6. change background to whitehouse image & title bar from "Road to 2020" to "Election Night"
      7. new feed should read "Election Night 2020 - campaign against Incumbant via button
      8. After the long Democratic campaign the player's health needs to be refreshed to allow for a competive Election Round
          1. set player favorable to 3 times existing value - this will typically bring into the 30 to 60 % range
          2. set player offensive effectiveness lower - to 2 times the base rate - otherwise it would have too high having previously benn built up
      8. button press computes favorable ratings in simliar manner as early game repeating attack rounds until win/loss
      9. win and loss sequence displayed on screen
      10. chance to "Play Again" presented.

### Psuedo Code - notes

1. Global variables
    1. few if any
2. Objects:
    1. Game
        1. Game state
            1. Pick front-runner, pick opponent, 
            2. round lost, round won, campaign lost, 
            3. campaign won, restart 
            4. Pre election night , post election night 
            5. Other election states
        2. Method to attack 
        3. Method to check for win/loss of round
        4. Method to check for win/loss of campaign
        5. Method to check for win/loss of election
        6. other helper methods (game reset, etc.)

    2. Candidate 
        1. Candidate arrays (5, element array)
            1. Name
            2. Base attack, current attack, health,      
            3. defense
        2. Strength arrray: 
            1. 2 low, 2 mid-low, 2 mid-high, 2-high
        3. Method to generate & randomly assign to candidate arrays

    3. User interface 
        1. Method to move badge 
        2. Methods to update box titles
        3. Methods to hide show boxes
        4. Method for button text and show hide 
        5. Methods for news feed

3. Event listeners
    1. click event for .candidate class (the badges)
    2. click event for the multipurpose attack/next page button