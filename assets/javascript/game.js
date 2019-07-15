// ---------------------------------------------------------
// javascript Democratic Nomination Role Playing Game
// ---------------------------------------------------------
// Summary:
// This is a simple RPG game where player chooses from 8 
// democratic candidates and then "campaigns" against them 
// one by one or until defeated by one of them
// This is an exercise in using JQuery to manage the DOM.
// Candidate "badges" are moved from Div to Div on the page
// depending on game state.  Badge content updates and game messages
// also utilize JQuery.
// ---------------------------------------------------------

// ---------------------------------------------------------
// Methodology:
// ---------------------------------------------------------
// Logic layer:  javascript object/methods, button click events
//   game "state" variable to control the "story board" flow.
//   no use of classes (yet)
// 
// Web-Page:  non-responsive layout wih some hard set dimensions
//   JQuery for dynamic activty of onpage objects and styles.
// 
// The "state" logic guides the experience and page activity
// as the player progress thru the decision tree/story board
// and the program respondes to the play results.
// 
// State flow allows for game reset after completion


// ---------------------------------------------------------
// Refactor Needs:
// ---------------------------------------------------------
// Logic layer:  - ugly parallel arrays to hold candidate 
//   attributes (need cleaner way do this with objects I belive)
//    General cleanup of names and looking to consolidate some 
//    smaller helper methods
// 
// Styling layer:  CSS needs cleanup and consolidation also

// ---------------------------------------------------------
// Enhancements:
// ---------------------------------------------------------
// Election Night was the planned enhancement and it
//   ended up making it into this release
// 
// Would like to do page using Bootstrap for additional practice

// ---------------------------------------------------------
// Use Cases
// ---------------------------------------------------------
// ## User Stories / Use Cases

// 1.  game starts in browser 
//     1. page has transparent boxes over background:  Front-Runner, News Feed, Challenger, Contenders, Candidates
//         1. 8 candidate badges appear in candidates field at bottom of screen - order will be randomized
//         2. the candidates will have strength numbers in the form of "Favorable" percentages where percent will equate to "health points"
//             1. each candidate has 3 attribute:  health (shown on badge), campaign offensive effectiveness (unseen) and campaign
//               defensive effectiveness (unseen) 
//             2. the three attributes will be randomizes with ranges:  2 weak candidates, 2 low-mid candidates, 2 mid-high and 2 - high;
//               Exact play balance ranges for the attributes is TBD.
//         3. badges will have names at top and head image in middle with nice framework and background
//         5. news feed will have - message:  Welcome to the Democratic Nomination Race - pick yourself a Candidate to play with by clicking it

// 2. player clicks candidate
//     1. the candidate move from Candidate box to the front-runner box
//     2. the remaining candidates move to Contenders box and Candidates box is re-title to "Political Dustbin"
//     3. news feeds changes to  "now pick a contender to campaign against"
//     4. clicking on own candidate once in front-runner box does nothing
//     5. note: the Front-runner does not use their defensive effectiveness rating

// 3. player clicks candidate (fyi: they are now all in contender box)
//     1. the candidate moves to the challenger box
//     2. clickable button appears under News Feed "Campaign Against"
//     3. news feed changes to "Ready to do political battle with (challenger's namve here)?"  Click "Campaign Against" button"
//     4. clicking on candidate once in challeger box does nothing
//     4. clicking on another candidate in contender box does nothing

// 4. player clicks "Campaign Against" button
//     1. Campaign calculation takes place.
//         1.  Front-Runner deals reduction to Challengers favorable rating via their offensive effectiveness.
//         2.  Challenger deals reduction to Front-Runner via their defensive effectiveness
//         3.  Front-Runner's offensive effectiveness increments by base amount (ex. if base starts at 8 then after first campaign effectiveness goes to 16, then 24, 32, etc.)
//         3.  Front-runner losses if favorable rating drops to 0 or below 
//         4.  Front-Runner wins if Challenger favorable rating drops to 0 or below (but check for loss first then win)
//         5.  Campaign continues otherwise

//   2. If loss then
//       1. News feed reports results of last battle and loss condition
//       2. Front-Runner badge moves to dustbin box and challenger moves to Front-Runner box
//       3. Campaign button changes wording to "Play Again"
//       4. player clicks "play again" and the board resets to its original configuration = see use case for "game starts in browser"

//   3. If win then and there are contenders remaining
//       1. News feed reports results of last battle and win condition and prompts player to pick next challenger
//       2. challenger is moved to Poltical Dustbin box
//       2. click on "Campaign Against" button does nothing until use has picked next challenger

//   4. If win and there are no contenders then 
//       1. News feed reports results of last battle and Campaign Win condition 
//       2. Campaign button & news feed change to Presidental Election bonus round wording

//   5. *** Bonuse Round Use Case 
//       1. upon winning the Campaign - i.e. Democratic Nomination a final round for the Presidential Election is held
//       2. hide the contenders and dustbin boxes
//       3. move Trump badge to the Front-Runner box and re-title box to Incumbant
//       4. move player's badge to Challenger box
//       5. change button text  - there will be an extra click step to build anticipate and allow for additional 
//          news feed messaging and other page layout adjustments
//       6. change background to whitehouse image & title bar from "Road to 2020" to "Election Night"
//       7. new feed should read "Election Night 2020 - campaign against Incumbant via button
//       8. After the long Democratic campaign the player's health needs to be refreshed to allow for a competive Election Round
//           1. set player favorable to 3 times existing value - this will typically bring into the 30 to 60 % range
//           2. set player offensive effectiveness lower - to 2 times the base rate - otherwise it would have too high having previously benn built up
//       8. button press computes favorable ratings in simliar manner as early game repeating attack rounds until win/loss
//       9. win and loss sequence displayed on screen
//       10. chance to "Play Again" presented.

// ### Psuedo Code - notes

// 1. Global variables
//     1. few if any
// 2. Objects:
//     1. Game
//         1. Game state
//             1. Pick front-runner, pick opponent, 
//             2. round lost, round won, campaign lost, 
//             3. campaign won, restart 
//             4. Pre election night , post election night 
//             5. Other election states
//         2. Method to attack 
//         3. Method to check for win/loss of round
//         4. Method to check for win/loss of campaign
//         5. Method to check for win/loss of election
//         6. other helper methods (game reset, etc.)

//     2. Candidate 
//         1. Candidate arrays (5, element array)
//             1. Name
//             2. Base attack, current attack, health,      
//             3. defense
//         2. Strength arrray: 
//             1. 2 low, 2 mid-low, 2 mid-high, 2-high
//         3. Method to generate & randomly assign to candidate arrays

//     3. User interface 
//         1. Method to move badge 
//         2. Methods to update box titles
//         3. Methods to hide show boxes
//         4. Method for button text and show hide 
//         5. Methods for news feed

// 3. Event listeners
//     1. click event for .candidate class (the badges)
//     2. click event for the multipurpose attack/next page button

// ---------------------------------------------------------
// Global Variables
// ---------------------------------------------------------

// ---------------------------------------------------------
// Global Functions:
// ---------------------------------------------------------

 // capitolize a word
 function capitolizeWord(word) {
   return word.charAt(0).toUpperCase() + word.slice(1);
 };

 // random number - min and max included
 function randomIntFromInterval(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
 };

// ---------------------------------------------------------
// Objects & Methhods:
// ---------------------------------------------------------

// ----------------------------------------------------------
// object for Candidates
// ----------------------------------------------------------
var candidate = {
//         1. Candidate arrays (5, element array)
//             1. Name
//             2. Base attack, current attack, health,      
//             3. defense
//             4. isMovable
  candidateName: ['biden','harris','delaney','williamson','sanders','booker','inslee','gabbard','trump'],
  candidateIsMovable: [true,true,true,true,true,true,true,true,false],
  candidateBaseOffense: [0,0,0,0,0,0,0,0,0],
  candidateBaseDefense: [0,0,0,0,0,0,0,0,0],
  candidateCurrentOffense: [0,0,0,0,0,0,0,0,0],
  candidateHealth: [0,0,0,0,0,0,0,0,0],
  // helper arrays for randomization and reset of candidate attributes
  typeOfProfile: [],
  profileType: [],
  profileHealth: [],
  profileAttack: [],
  profileDefense: [],
  electionHealthResetFactor: 0,
  electionOffenseResetFactor: 0,
  attackMin: 0,
  attackMax: 0,
  defenseMin: 0,
  defenseMax: 0,
  lowFactorAdjust: 0,
  highFactorAdjust: 0,
  lowFactorAdjustDown: 0,

  // game character profile tuning ideas
  // starting with:
  //   1. randomly build 8 profiles with type equating to Health number range
  //   2. add in attach / defense profile - not dependant on Health number
  //   3. typical first turning ranges will be:
  //      Type  Health
  //      a     80
  //      a-    72
  //      b     64
  //      b-    56
  //      c     48
  //      c-    40
  //      d     32
  //      d-    24     
  //    Add in random +/- varience 
  //  Attack / Defense profiles - first tuning attempt will be:
  //      Attack   Defense
  //      1 to 8   1 to 8  * with some varience within

  // this is the profile Type array
  buildProfileArray: function() {
    this.typeOfProfile = ['a','a-','b','b-','c','c-','d','d-'];
    console.log("type of profiles: " + this.typeOfProfile);

    for ( i = 0; i < 8; i++) {
        var profile = this.typeOfProfile[Math.floor(Math.random() * this.typeOfProfile.length)];
        this.typeOfProfile.splice(this.typeOfProfile.indexOf(profile),1);
        this.profileType[i] = profile;
      }  
    },

  // this is the profile Health array
  buildHealthArray: function() {
    for ( i = 0; i < 8; i++) {
      // assign value with a varience
      switch (this.profileType[i]) {
        case 'a': {  
          this.profileHealth[i] = 70 + randomIntFromInterval(-5,3);
          break;
        }
        case 'a-': {  
          this.profileHealth[i] = 65 + randomIntFromInterval(-5,3);
          break;
        }
        case 'b': {  
          this.profileHealth[i] = 60 + randomIntFromInterval(-3,2);
          break;
        }
        case 'b-': {  
          this.profileHealth[i] = 55 + randomIntFromInterval(-3,2);
          break;
        }
        case 'c': {  
          this.profileHealth[i] = 50 + randomIntFromInterval(-1,1);
          break;
        }
        case 'c-': {  
          this.profileHealth[i] = 45 + randomIntFromInterval(-1,1);
          break;
        }
        case 'd': {  
          this.profileHealth[i] = 40 + randomIntFromInterval(-1,2);
          break;
        }
        case 'd-': {  
          this.profileHealth[i] = 35 + randomIntFromInterval(1,2);
          break;
        }
        default:
          break;
      }
    }
  },


  //  establish tuning factors
  setTuningFactors: function() {
    console.log("in candidates.setTuningFactors");
    // combinations tested with:
    // test 1:  attack 2,7 defense 1,8 election health reset 3x, election offense reset 3x
    // test 1:  the balance wasn't too bad, seemed pretty hard for low % candidate to win campaign
    // test 2:  attack 2,8, defense 1,6  reset health 3x, reset offense 2x - trying this one to try and help lower % candidates
    // test 2:  but maybe it will also help higher % candidates too much 

    // reset factors for the player if they advance to the bonus round
    candidate.electionHealthResetFactor = 2.5,
    candidate.electionOffenseResetFactor = 1.8,
    candidate.attackMin = 2,
    candidate.attackMax = 7,
    candidate.defenseMin = 1,
    candidate.defenseMax = 8,
    candidate.lowFactorAdjust = 2,
    candidate.lowFactorAdjustDown = -2,
    candidate.highFactorAdjust = -1
  },

  // this is the profile attack array
  buildAttackArray: function() {
    console.log("in candidates.buildAttackArray");
    for ( i = 0; i < 8; i++) {
      if (this.profileType[i] === 'a' || this.profileType[i] === 'a-') {
        // var attackMod = this.attackMax  + this.highFactorAdjust
        console.log('a: ' + i + " " + this.attackMin + " " + (this.attackMax + this.highFactorAdjust));
        this.profileAttack[i] = randomIntFromInterval(this.attackMin,this.attackMax + this.highFactorAdjust); 
      }
      else if (this.profileType[i] === 'd' || this.profileType[i] === 'd-') {
        // var attackMod = this.attackMax + this.lowFactorAdjust;
        console.log('d: ' + i + " " + this.attackMin + " " + (this.attackMax + this.lowFactorAdjust));
        this.profileAttack[i] = randomIntFromInterval(this.attackMin,this.attackMax + this.lowFactorAdjust); 
      } 
      else {
        this.profileAttack[i] = randomIntFromInterval(this.attackMin,this.attackMax); 
      }
    }
  },

  // this is the profile defense array
  buildDefenseArray: function() {
    console.log("in candidates.buildDefenseArray");
    for ( i = 0; i < 8; i++) {
      // high health get slightly lower defense
      if (this.profileType[i] === 'a' || this.profileType[i] === 'a-') {
        console.log('a: ' + i + " " + this.defenseMin + " " + (this.defenseMax + this.highFactorAdjust));
        this.profileDefense[i] = randomIntFromInterval(this.defenseMin,this.defenseMax + this.highFactorAdjust); 
      } 
      // low health get slightly lower defense
      else if (this.profileType[i] === 'd' || this.profileType[i] === 'd-') {
            console.log('d: ' + i + " " + this.defenseMin + " " + (this.defenseMax + this.lowFactorAdjustDown));
            this.profileDefense[i] = randomIntFromInterval(this.defenseMin,this.defenseMax + this.lowFactorAdjustDown); 
      } else {
            this.profileDefense[i] = randomIntFromInterval(this.defenseMin,this.defenseMax); 
      }
    }
  },

 

  // assign profile so each of the candidates
  setCandidateStats: function() {
    console.log("in candidates.setCandidatesStats");
    this.setTuningFactors();
    this.buildProfileArray();
    for (i = 0; i < 8; i++) {
      console.log("profile type " + i + " is " + candidate.profileType[i]);
    };

    this.buildHealthArray();
    for (i = 0; i < 8; i++) {
      console.log("profile health " + i + " is " + candidate.profileHealth[i]);
    };

    this.buildAttackArray();
    for (i = 0; i < 8; i++) {
      console.log("profile attack " + i + " is " + candidate.profileAttack[i]);
    };

    this.buildDefenseArray();
    for (i = 0; i < 8; i++) {
      console.log("profile defense " + i + " is " + candidate.profileDefense[i]);
    };

    // for loop goes in here and then assign values to candidates using correlated index
    this.candidateIsMovable = [true,true,true,true,true,true,true,true,false];
    for (i = 0; i < 8; i++) {
      this.candidateHealth[i] = this.profileHealth[i];
      // update the badges on the page to reflect assigned health
      userInterface.updatePrintableFavorables(candidate.candidateName[i]);
      this.candidateBaseOffense[i] = this.profileAttack[i];
      this.candidateCurrentOffense[i] = this.profileAttack[i];
      this.candidateBaseDefense[i] = this.profileDefense[i];
    }
    
    // diagnostic logging
    // for (let i = 0; i < 8; i++) {
    //   console.log("candidate name : " + candidate.candidateName[i]);
    //   console.log("candidate health : " + candidate.candidateHealth[i]);
    //   console.log("candidate base off : " + candidate.candidateBaseOffense[i]);
    //   console.log("candidate base def : " + candidate.candidateBaseDefense[i]);
    //   console.log("candidate current off : " + candidate.candidateCurrentOffense[i]);
    //  }
    // userInterface.diagnosticDump();
  }
};



// ----------------------------------------------------------
// object for Game
// ----------------------------------------------------------
var game = {
  gameStates: ['pick-candidate','pick-opponent','campaign','round-lost','round-won',
              'campaign-lost','campaign-won','restart','pre-election-night','election-night',
              'election-lost','election-won'],
  currentGameState: 'pick-candidate', 
  playerCandidateId: "",
  opponentId: "",
  turnResult: "",
  opponentsRemaining: 7,
  isElectionNight: false,

  // game start up procedure
  // as of 7-13 this is deprecated / can be removed
  // startGame: function() {
  //   console.log("in game.startGame");
  //   // userInterface.diagnosticDump();
  //   $("#contenders-top").css("visibility","hidden");
  //   $("#contenders").css("visibility","hidden");
  //   userInterface.displayNewsFeed('Welcome to the campaign for the 2020 Democratic Nomination.  Choose yourself a candidate by clicking one');
  //   candidate.setCandidateStats();
  // },

  // restart a game
  // as of 7-13 this both game start & restart
  resetGame: function() {
    console.log("in game.resetGame");
    // refactoring to not call startGame() - these were in startGame()
    $("#contenders-top").css("visibility","hidden");
    $("#contenders").css("visibility","hidden");
    userInterface.displayNewsFeed('Welcome to the campaign for the 2020 Democratic Nomination.  Choose yourself a candidate');

    playerCandidateId = "";
    opponentId = "";
    turnResult = "";
    game.opponentsRemaining = 7;
    game.isElectionNight = false;
    $("#back-ground").attr("src","assets/images/demoFloor.jpg");
    $("#dustbin-top>span").text('Candidates');
    userInterface.toggleActionButtonVisibility("hide");
    // need to gather up the badges and move them to Candidates box and remove the classes
    $("candidate:not(#trump)").each(function() {
      $("#" + this.id).removeClass('cand-in-upper-box cand-in-dustbin cand-img-in-dustbin');
      userInterface.moveBadge(this.id,"dustbin");
    });
    $("#challenger-top").removeClass("outgoing-prez");
    $("#trump").css("visibility","hidden");
    $("#trump").removeClass("card-in-upper-box");
    userInterface.moveBadge("trump","trump-home");
    $("#dustbin-top").css("visibility","visible");
    $("#dustbin").css("visibility","visible");
    $("#front-runner-top>span").text("Front-Runner");
    $("#challenger-top>span").text("Challenger");
    $("#header>span").text("Road to 2020 - Democratic Showdown");
    candidate.setCandidateStats();
    game.currentGameState = 'pick-candidate';
  },

  // perform game turn 
  executeTurn: function () {
    console.log("in game.executeTurn");
    // perform a battle round
    var roundResult = game.battleEngine(this.playerCandidateId,this.opponentId);
    this.turnResult = roundResult.third;
    console.log("round results are: attacker took: " + roundResult.first + 
                " defender took: " + roundResult.second + " the attacker " +
                roundResult.third);

    if (this.turnResult === "win") {
      this.opponentsRemaining--;
      // console.log("in game.executeTurn - round was won");
      // you won the round if candidates remain fight on
      if (this.opponentsRemaining > 0) {
        // console.log("in game.executeTurn - round was won, more opponents");
        userInterface.moveCandidateToDustbinBox(game.opponentId);
        var blurb = capitolizeWord(game.opponentId) + "'s favorables have plumented and funds have dried up." +
        " You are the victor.  Choose the next opponent"
        userInterface.displayNewsFeed(blurb);
        game.currentGameState = 'pick-opponent';
      }
      // you won the round if no more candidates get ready for the election next
      else {
        // console.log("in game.executeTurn - round was won, no more opponents");
        userInterface.moveCandidateToDustbinBox(game.opponentId);
        var blurb = capitolizeWord(game.opponentId) + "'s falters at the convention. You have won the Nomination!" 
                     + "  Are you ready for Election night?"
        userInterface.displayNewsFeed(blurb);
        game.currentGameState = "campaign-won";
        $("#duel>span").text("Election Night 2020");
      }
    } 
    // either you lost round or battle not finished yet
    else if (this.turnResult === "loss") {
              // console.log("in game.executeTurn - round was lost");
              game.campaignLost();
            }
         else if (this.turnResult === "continue") {
          //  round is not over yet
          // console.log("in game.executeTurn - rounds continue");
          var blurb = "You dropped " + roundResult.first + "%  " + capitolizeWord(game.opponentId) + " dropped " + roundResult.second +"%.  Continue campaign"
          userInterface.displayNewsFeed(blurb);
         }
              else if (this.turnResult === "election-win") {
                  //  this is an election win
                  game.electionWon();
              }
                   else if (this.turnResult === "election-loss") {
                    //  this is an "election-loss"
                    game.electionLost();
                   };
  },

  // perform election turn 
  //  depracated - logic moved to the general executeTurn mehtod
  // executeElectionTurn: function () {
  //   console.log("in game.executeElectionTurn");
  //   // forcing win during initial testing
  //   this.turnResult = "loss";
  
  //   if (this.turnResult === "win") {
  //       game.electionWon();
  //     }
  //     else {
  //       game.electionLost();
  //     };
  // },

  // campaign has been lost
  campaignLost: function () {
    console.log("in game.campaignLost");
    userInterface.moveCandidateToDustbinBox(this.playerCandidateId);

    // if you both hit zero you lose
    if (candidate.candidateHealth[candidate.candidateName.indexOf(game.opponentId)] === 0) {
      var blurb = "Virtual Tie, " + capitolizeWord(game.playerCandidateId) + ".  But floor convention backs your opponent. Play again?";
    } 
    else {
      var blurb = "Your favorables have sunk, you are broke and have to withdrawal from the race."; 
      + "  Do you want to play again?";
    };

    userInterface.displayNewsFeed(blurb);
    game.currentGameState = 'restart';
    $("#duel>span").text("Play Again");
},


  // stage the election night
  preElection: function () {
    console.log("in game.preElection");
    $("header>span").text("Welcome to Election Night 2020");
    userInterface.moveBadge(this.playerCandidateId,"challenger");
    $("#front-runner-top>span").text("Incumbent");
    $("#challenger-top>span").text("Nominee");
    userInterface.displayNewsFeed("Trump vs " + capitolizeWord(this.playerCandidateId)
                          + ".  Polls showing a toss-up.  You feel re-energized! Favorables are up!");
    $("#duel>span").text("Final Campaign");
    $("#contenders-top").css("visibility","hidden");
    $("#contenders").css("visibility","hidden");
    $("#dustbin-top").css("visibility","hidden");
    $("#dustbin").css("visibility","hidden");
    $("#back-ground").attr("src","assets/images/whitehouseStorm.jpg");
 
    game.opponentId = "trump";
    $("#" + game.opponentId).css("visibility","visible");   
    userInterface.moveBadge(game.opponentId,"front-runner"); 
    $("#" + game.opponentId).addClass("cand-in-upper-box")
    game.isElectionNight = true;
    // refresh the nominee
    // make health = health * the election health reset factor up to limit of 80%
    var newHealth = Math.round(candidate.candidateHealth[candidate.candidateName.indexOf(game.playerCandidateId)] * candidate.electionHealthResetFactor);
    if (newHealth > 80 ) {
      newHealth = 80;
      candidate.candidateHealth[candidate.candidateName.indexOf(game.playerCandidateId)] = newHealth;
    } 
    else if (newHealth < 33) {
          newHealth = 33;
          candidate.candidateHealth[candidate.candidateName.indexOf(game.playerCandidateId)] = newHealth;
        }
        else {
          candidate.candidateHealth[candidate.candidateName.indexOf(game.playerCandidateId)] = newHealth;
        };
    
    // reset offensive attack to 3 * the base rate

    // console.log("nominee: base off: " + 
    // candidate.candidateBaseOffense[candidate.candidateName.indexOf(game.playerCandidateId)] );
    // console.log("nominee: curr off: " + 
    // candidate.candidateCurrentOffense[candidate.candidateName.indexOf(game.playerCandidateId)] );
    
    // make attack = base * the election attack reset factor
    candidate.candidateCurrentOffense[candidate.candidateName.indexOf(game.playerCandidateId)] = 
    Math.round(candidate.candidateBaseOffense[candidate.candidateName.indexOf(game.playerCandidateId)] * candidate.electionOffenseResetFactor);

    // console.log("nominee: base off: " + 
    // candidate.candidateBaseOffense[candidate.candidateName.indexOf(game.playerCandidateId)] );
    // console.log("nominee: curr off: " + 
    // candidate.candidateCurrentOffense[candidate.candidateName.indexOf(game.playerCandidateId)] );

    // update Trump attributes in candidate array
    // compute a base defense and health
    var trumpDefense = randomIntFromInterval(6,10);
    var trumpHealth  = randomIntFromInterval(46,76);
    candidate.candidateBaseOffense[candidate.candidateName.indexOf(game.opponentId)] = 0;
    candidate.candidateCurrentOffense[candidate.candidateName.indexOf(game.opponentId)] = 0;
    candidate.candidateBaseDefense[candidate.candidateName.indexOf(game.opponentId)] = trumpDefense;
    candidate.candidateHealth[candidate.candidateName.indexOf(game.opponentId)] = trumpHealth;

    userInterface.updatePrintableFavorables(game.playerCandidateId);
    userInterface.updatePrintableFavorables(game.opponentId);  
    userInterface.diagnosticDump();
  },

  // start the election night
  startElection: function () {
    console.log("in game.startElection");
    $("header>span").text("Welcome to Election Night 2020");
    $("#front-runner-top>span").text("Incumbent");
    $("#challenger-top>span").text("Nominee");
    userInterface.displayNewsFeed("Last hour before polls close - this is your final push.");
    $("#duel>span").text("Battle Onward");
  },

  // election has been won
  electionWon: function () {
    console.log("in game.electionWon");
    // if both reach zero - you win, but need different description
    if (candidate.candidateHealth[candidate.candidateName.indexOf(game.playerCandidateId)] === 0) {
      var blurb = "Hanging Chads.   " + capitolizeWord(game.playerCandidateId) + ", Supreme Court decides - you have won the 2020 election.  Play again?"
      userInterface.displayNewsFeed(blurb);
    } 
    else {
      var blurb = "Congradulations!  " + capitolizeWord(game.playerCandidateId) + " has won the 2020 election.  Play again?"
      userInterface.displayNewsFeed(blurb);
    };

    userInterface.moveBadge(game.opponentId,"challenger");
    userInterface.moveBadge(game.playerCandidateId,"front-runner");
    $("#front-runner-top>span").text("President Elect");
    $("#challenger-top>span").text("Outgoing President");
    $("#challenger-top").addClass("outgoing-prez");
    game.currentGameState = 'restart';
    $("#duel>span").text("Play Again");
  },

  // election has been lost
  electionLost: function () {
    console.log("in game.electionLost");
    // I think this if branch is unreachable because ties go down as a player win and this is the loss method
    if (candidate.candidateHealth[candidate.candidateName.indexOf(game.opponentId)] === 0) {
      var blurb = "Hanging Chads.  " + capitolizeWord(game.playerCandidateId) + ", Supreme Court decides - Trump wins 2020 election.  Play again?"
      userInterface.displayNewsFeed(blurb);
    } 
    else {
      var blurb = "Trump becomes a two-term President winning the 2020 election.  Play again?"
      userInterface.displayNewsFeed(blurb);
    };
    $("#front-runner-top>span").text("President Re-Elect");
    $("#front-runner-top").addClass("prez-re");
    $("#challenger-top>span").text("Losing Nominee");
    $("#challenger-top").addClass("outgoing-prez");
    game.currentGameState = 'restart';
    $("#duel>span").text("Play Again");
  },


  // battle engine - candidate vs candidate
  battleEngine(attackerId, defenderId) {
    console.log("in game.battleEngine");
    // console.log("attacker is : " + capitolizeWord(attackerId));
    // console.log("attacker curr off: " + candidate.candidateCurrentOffense[candidate.candidateName.indexOf(attackerId)]);
    // console.log("attacker health: " + candidate.candidateHealth[candidate.candidateName.indexOf(attackerId)]);
    // console.log("defender is : " + capitolizeWord(defenderId));
    // console.log("defender def: " + candidate.candidateBaseDefense[candidate.candidateName.indexOf(defenderId)]);
    // console.log("defender health: " + candidate.candidateHealth[candidate.candidateName.indexOf(defenderId)]);
    // console.log("is this Election night: " + this.isElectionNight);

    // assign impact
    // save what this attack's results will be 
    var damageToAttacker = candidate.candidateBaseDefense[candidate.candidateName.indexOf(defenderId)];
    var damageToDefender = candidate.candidateCurrentOffense[candidate.candidateName.indexOf(attackerId)];

    // apply the results and level up the attacker's current attack value
    candidate.candidateHealth[candidate.candidateName.indexOf(attackerId)] -= candidate.candidateBaseDefense[candidate.candidateName.indexOf(defenderId)];
    candidate.candidateHealth[candidate.candidateName.indexOf(defenderId)] -= candidate.candidateCurrentOffense[candidate.candidateName.indexOf(attackerId)];
    candidate.candidateCurrentOffense[candidate.candidateName.indexOf(attackerId)] += candidate.candidateBaseOffense[candidate.candidateName.indexOf(attackerId)];

    // for display niceness treat health < 0 to be 0
    if (candidate.candidateHealth[candidate.candidateName.indexOf(attackerId)] < 0) {
      candidate.candidateHealth[candidate.candidateName.indexOf(attackerId)] = 0;
    };

    if (candidate.candidateHealth[candidate.candidateName.indexOf(defenderId)] < 0) {
      candidate.candidateHealth[candidate.candidateName.indexOf(defenderId)] = 0;
    };

    userInterface.updatePrintableFavorables(attackerId);
    userInterface.updatePrintableFavorables(defenderId);
    
    // console.log("attacker is : " + capitolizeWord(attackerId));
    // console.log("attacker curr off: " + candidate.candidateCurrentOffense[candidate.candidateName.indexOf(attackerId)]);
    // console.log("attacker health: " + candidate.candidateHealth[candidate.candidateName.indexOf(attackerId)]);
    // console.log("defender is : " + capitolizeWord(defenderId));
    // console.log("defender def: " + candidate.candidateBaseDefense[candidate.candidateName.indexOf(defenderId)]);
    // console.log("defender health: " + candidate.candidateHealth[candidate.candidateName.indexOf(defenderId)]);

    // determine attack result in terms of attacker:  win, loss, continue
    if (candidate.candidateHealth[candidate.candidateName.indexOf(attackerId)] === 0) {
      if (this.isElectionNight) {
        // election night loss
        return { first: damageToAttacker, second: damageToDefender, third: "election-loss"}
      }
      else {
        // democratic nomination loss
        return { first: damageToAttacker, second: damageToDefender, third: "loss"}
      }
    }
    else {
          if (candidate.candidateHealth[candidate.candidateName.indexOf(defenderId)] === 0) {
            if (this.isElectionNight) {
              // this is election night win
              return { first: damageToAttacker, second: damageToDefender, third: "election-win"}
            }
            else {
              // this is democratic campaign win
              return { first: damageToAttacker, second: damageToDefender, third: "win"}
            }
          } 
          else { 
            // this means continue the battle - this is for either election night or for campaign
              return { first: damageToAttacker, second: damageToDefender, third: "continue"}
              }
      }
  }
};


// ----------------------------------------------------------
// object for user interface - i.e. the html page elements
// ----------------------------------------------------------
var userInterface = {
  // move a candidate badge from one div to another
  moveBadge: function(targetId,destinationId) {
    // console.log("in userInterface.moveBadge");
    // console.log("the target id " + targetId);
    // console.log("the destination  " + destinationId);
    $("#" + destinationId).append($("#" + targetId));
  },

  // move candidate to Front-Runner box
  moveCandidateToFrontRunnerBox: function(targetId) {
    console.log("in userInterface.moveCandidateToFrontRunnerBox"); 
    userInterface.moveBadge(targetId,"front-runner");
    candidate.candidateIsMovable[candidate.candidateName.indexOf(targetId)] = false;
    game.playerCandidateId = targetId;
    // add class to center badge in box
    $("#" + targetId).addClass('cand-in-upper-box');
  },

  // move candidate to Dustbin Box
  moveCandidateToDustbinBox: function(targetId) {
    console.log("in userInterface.moveCandidateToDustbinBox"); 
    userInterface.moveBadge(targetId,"dustbin");
    candidate.candidateIsMovable[candidate.candidateName.indexOf(targetId)] = false;
    // add classrd to fade badge in box
    $("#" + targetId).addClass('cand-in-dustbin');
    $("#" + targetId).addClass('cand-img-in-dustbin');
    // remove class that used for upper box
    $("#" + targetId).removeClass('cand-in-upper-box');
  },

  // move contender to Challenger box
  moveContenderToChallengerBox: function(targetId) {
    console.log("in userInterface.moveContenderToChallengerBox"); 
    userInterface.moveBadge(targetId,"challenger");
    game.opponentId= targetId;
    // add class to center badge in box
    $("#" + targetId).addClass('cand-in-upper-box');
    var blurb = 'Are you ready to do political battle with ' +
                capitolizeWord(targetId) +
                '?';
    $("#duel>span").text("Campaign Against");
    userInterface.displayNewsFeed(blurb);
    userInterface.toggleActionButtonVisibility('show');
  },
  

  // move remaining candidates to Contenders box 
  moveCandidatesToContendersBox: function() {
    console.log("in userInterface.moveCandidatesToContendersBox"); 
    $("#dustbin>candidate").each(function() {
      userInterface.moveBadge(this.id,"contenders");
    });
    // change title of lower box to 'Political Dustbin'
    $("#dustbin-top>span").text('Political Dustbin');
    var blurb = 'Welcome to the campaign ' +
                capitolizeWord(game.playerCandidateId) + 
                '.' + '  Pick a challenger';
    userInterface.displayNewsFeed(blurb);
  },


  // display message element
  displayNewsFeed: function(message) {
    console.log("in userInterface.displayNewsFeed"); 
    $("#news-feed>span").text(message); 
  },

  // hide or show the action "button"
  toggleActionButtonVisibility: function(action) {
    console.log("in userInterface.hideShowActionButton"); 
    if (action === "hide") {
      $("#duel").css("visibility","hidden");
    }
    else if (action = "show")  {
      $("#duel").css("visibility","visible");
    };
  },

  // update printable favorables text
  updatePrintableFavorables(badgeId) {
    console.log("in userInterface.updatePrintableFavorables"); 
    var favorables = "Favorable: " + candidate.candidateHealth[candidate.candidateName.indexOf(badgeId)] + "%";
    // console.log("badge is: " + badgeId + "favorable is: " + favorables);
    $("#" + badgeId + ">h6").text(favorables);
  },
  

  // diagnostic output to console
  diagnosticDump: function() {
    console.log("------------------------")
    console.log("in userInterface.diagnosticDump"); 
    console.log("player candidate: " + game.playerCandidateId);
    console.log("opponent:" + game.opponentId);
    console.log("game state: " + game.currentGameState);
    console.log("opponents remaining: " + game.opponentsRemaining);
    console.log("player health :" + candidate.candidateHealth[candidate.candidateName.indexOf(game.playerCandidateId)]);
    console.log("player curr off :" + candidate.candidateCurrentOffense[candidate.candidateName.indexOf(game.playerCandidateId)]);
    console.log("player base off :" + candidate.candidateBaseOffense[candidate.candidateName.indexOf(game.playerCandidateId)]);
    console.log("player base def :" + candidate.candidateBaseDefense[candidate.candidateName.indexOf(game.playerCandidateId)]);
    console.log("opponent health :" + candidate.candidateHealth[candidate.candidateName.indexOf(game.opponentId)]);
    console.log("opponent curr off :" + candidate.candidateCurrentOffense[candidate.candidateName.indexOf(game.opponentId)]);
    console.log("opponent base off :" + candidate.candidateBaseOffense[candidate.candidateName.indexOf(game.opponentId)]);
    console.log("opponent base def :" + candidate.candidateBaseDefense[candidate.candidateName.indexOf(game.opponentId)]);
    console.log("length is: " + candidate.candidateHealth.length);
    for (let i = 0; i < candidate.candidateHealth.length; i++) {
      console.log("candidate name : " + candidate.candidateName[i]);
      console.log("candidate health : " + candidate.candidateHealth[i]);
      console.log("candidate base off : " + candidate.candidateBaseOffense[i]);
      console.log("candidate base def : " + candidate.candidateBaseDefense[i]);
      console.log("candidate current off : " + candidate.candidateCurrentOffense[i]);
     };
    console.log("------------------------")
  }
};


// ----------------------------------------------------------------------------
//  START OF GAME FLOW
// ----------------------------------------------------------------------------

// refactoring attempt to only have one master Game() function
// game.startGame();
game.resetGame();


// click event for candidate badges
$(".candidate").on("click", function() {
  console.log("in on.click .candidate")
  // get Id attr of the badge
  var badgeId = $(this).attr("id");
  // console.log("The attr id of the badge is " + badgeId);

  if (candidate.candidateIsMovable[candidate.candidateName.indexOf(badgeId)]) {
    switch (game.currentGameState) {
      case "pick-candidate": {
        $("#contenders-top").css("visibility","visible");
        $("#contenders").css("visibility","visible");
        userInterface.moveCandidateToFrontRunnerBox(badgeId);
        userInterface.moveCandidatesToContendersBox();
        game.currentGameState = 'pick-opponent';
        // userInterface.diagnosticDump();
        break;
      }
      case "pick-opponent": {
        userInterface.moveContenderToChallengerBox(badgeId);
        game.currentGameState = 'campaign';
        // userInterface.diagnosticDump();
        break;
      }      
      default:
        break;
    };
  };
});

// click event for action button
$("#duel").on("click", function() {
  console.log("in on.click .duel");
  // userInterface.diagnosticDump();
  switch (game.currentGameState) {
    case "campaign": {
      game.executeTurn();
      break;
    }
    case "campaign-won": {
      game.preElection();
      game.currentGameState = 'pre-election-night';
      break;
    }       
    case "pre-election-night": {
      game.startElection();
      game.currentGameState = 'campaign' //'election-night';
      break;
    } 
    // need to change this so it flows thru executeTurn
    // will need a boolean so we know it is the election
    // round and will need to refresh the nominee to they
    // they can win or lose - probably take existing health * 3
    // and reset their attack rating
    // will also have to populate Trumps stats and 
    // push it into a ninth position on the candidate arrays
    // so that existing logic for managing the battle round 
    // can be used almost as-is
    // 
    // case "election-night": {
    //   // game.executeElectionTurn();
    //   game.currentGameState = 'campaign';
    //   break;
    // } 
    case "restart": {
      game.resetGame();
      // depracated:
      // game.startGame();
      break;
    } 
    default:
      break;
  };
});

