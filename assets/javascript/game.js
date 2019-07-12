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

// ---------------------------------------------------------
// Refactor Needs:
// ---------------------------------------------------------

// ---------------------------------------------------------
// Use Cases
// // ---------------------------------------------------------
// 1.  game starts in browser 
//     1. page has transparent boxes over background:  Front-Runner, News Feed, Challenger, Contenders, Candidates
//         1. 8 candidate badges appear in candidates field at bottom of screen - order will be randomized (if coding time permits)
//         2. the candidates will have strength numbers in the form of "Favorable 61%" where percent will relate to "health points"
//             1. each candidate has 3 attribute:  health (shown on badge), campaign offensive effectiveness (unseen) and campaign
//               defensive effectiveness (unseen) 
//             2. the three attributes will be randomizes with ranges:  2 weak candidates, 2 low-mid candidates, 2 mid-high and 2 - high;
//               Exact play balance ranges for the attributes is TBD.
//         3. badges will have names at top and head image in middle with nice framework and background
//         5. new feed will have - message:  Welcome to the Democratic Nomination Race - pick yourself a Candidate to play with by clicking it

// 2. player clicks candidate
//     1. the candidate move from Candidate box to the front-runner box
//     2. the remaining candidates move to Contenders box and Candidates box is re-title to "Political Dustbin"
//     3. news feeds changes to  "now pick a contender to campaign against"
//     4. clicking on own candidate once in front-runner box does nothing
//     5. note: the Front-runner does not use their defensive effectiveness rating

// 3. player clicks candidate (fyi: they are now all in contender box)
//     1. the candidate moves to the challenger box
//     2. clickable button appears under News Feed "Campaign Against"
//     3. news feed changes to "Ready to do political battle with <challenger name>?"  Click "Campaign Against" button"
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

//   3. If win then and there are contenders remaining
//       1. News feed reports results of last battle and win condition and prompts player to pick next challenger
//       2. challenger is moved to Poltical Dustbin box
//       2. click on "Campaign Against" button does nothing until use has picked next challenger

//   4. If win and there are no contenders then 
//       1. News feed reports results of last battle and Campaign Win condition (coding time permitting include celebratory animation)
//       2. Campaign button changes wording to "Play Again"  *** (see Expansion Use Case)

// 5. player clicks "play again" and the board resets to its original configuration = see use case for "game starts in browser"

// 6. *** Expansion Use Case - as coding time permits or as refactoring enhancement later
//     1. upon winning the Campaign - i.e. Democratic Nomination a final round for the Presidential Election is held
//     2. hide the contenders and dustbin boxes
//     3. move Trump badge to the Front-Runner box and re-title box to Incumbant
//     4. move player's badge to Challenger box
//     5. change button text to "Election Trail"
//     6. change background to whitehouse image
//     7. new feed should read "Election Night 2020 - campaign against Incumbant via button
//     8. button press computes favorable ratings in simliar manner as early game 
//     9. win and loss sequence to be determined


// ---------------------------------------------------------
// Psuedo List of Objects
// ---------------------------------------------------------
// 1. Objects:
//     1. Game
//         1. Game state
//             1. Pick front-runner, pick opponent, 
//             2. round lost, round won, campaign lost, 
//             3. campaign won, restart 
//             4. Pre election night , post election night 
//             5. Other election states
//         2. Method to attack 
//         3. Method to check for win/loss of round
//         4. Method to check for win/loss of round

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

//     4. Others?

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


// moveBadge("harris","contenders");

 


// ---------------------------------------------------------
// Objects & Methhods:
// ---------------------------------------------------------

// ----------------------------------------------------------
// object for Game
// ----------------------------------------------------------
var game = {
  gameStates: ['pick-candidate','pick-opponent','campaign','round-lost','round-won',
              'campaign-lost','campaign-won','restart','pre-election-night',
              'post-election-night'],
  currentGameState: 'pick-candidate',
  playerCandidateId: "",
  opponentId: "",

  // game start up procedure
  startGame: function() {
    console.log("in game.startGame");
    userInterface.diagnosticDump();
    userInterface.displayNewsFeed('Welcome to the campaign for the 2020 Democratic Nomination.  Choose yourself a candidate by clicking one');
  }
};

// Candidate Object

// ----------------------------------------------------------
// object for user interface - i.e. the html page elements
// ----------------------------------------------------------
var userInterface = {

  // initialize the display
  initDisplay: function() {
    console.log("in userInterface.initDisplay");
    // turn word color to white as previous game result
    // will have set it to red of player did not guess the word
    // wordDisplayElement.style.color = "#ffffff"; 
    // userInterface.displayWordElement();
    // userInterface.hideTermDisplayElement();
    // userInterface.displayUsedLettersElement();
    // userInterface.displayGuessRemainingElement();
    // userInterface.displayWinCountElement();
    // userInterface.displayLossCountElement();
    // userInterface.displayMessageElement("use keys a through z");
  },  

  // move a candidate badge from one div to another
  moveBadge: function(targetId,destinationId) {
    console.log("in userInterface.moveBadge");
    console.log("the target id " + targetId);
    console.log("the destination  " + destinationId);
    $("#" + destinationId).append($("#" + targetId));
  },

  // move candidate to Front-Runner box
  moveCandidateToFrontRunner: function(targetId) {
    console.log("in userInterface.moveCandidateToFrontRunner"); 
    userInterface.moveBadge(targetId,"front-runner");
    game.playerCandidateId = targetId;
    // add class to center badge in box
    $("#" + targetId).addClass('cand-in-upper-box');
  },


 
  
  // move remaining candidates to Contenders box 
  moveCandidatesToContenders: function() {
    console.log("in userInterface.moveCandidatesToContenders"); 
    $("#dustbin>candidate").each(function() {
      userInterface.moveBadge(this.id,"contenders");
    });
    // change title of lower box to 'Political Dustbin'
    $("#dustbin>span").text('Political Dustbin');
    var blurb = 'Welcome to the campaign ' +
                capitolizeWord(game.playerCandidateId) + 
                ' Pick a challenger by clicking on one';
    userInterface.displayNewsFeed(blurb);
  },

  // 2. player clicks candidate
//     1. the candidate move from Candidate box to the front-runner box
//     2. the remaining candidates move to Contenders box and Candidates box is re-title to "Political Dustbin"
//     3. news feeds changes to  "now pick a contender to campaign against"
//     4. clicking on own candidate once in front-runner box does nothing
//     5. note: the Front-runner does not use their defensive effectiveness rating


  // display message element
  displayNewsFeed: function(message) {
    console.log("in userInterface.displayNewsFeed"); 
    $("#news-feed>span").text(message); 
  },

  // hide or show the action "button"
  toggleActionButtonVisibility: function(hide) {
    console.log("in userInterface.hideShowActionButton"); 
    if (hide === "hide") {
      $("#duel").css("visibility","hidden");
    }
    else {
      console.log("in show");
      $("#duel").css("visibility","visible");
    };
  },

  // diagnostic output to console
  diagnosticDump: function() {
    console.log("------------------------")
    console.log("in userInterface.diagnosticDump"); 
    console.log("player candidate: " + game.playerCandidateId);
    console.log("opponent:" + game.opponentId);
    console.log("game state: " + game.currentGameState);
    console.log("------------------------")
  }
};


// ---------------------------------------------------------
// Core Program Flow & Event Listeners:
// ---------------------------------------------------------

// -------------------------------------------------------------------
//  *** Start of game flow *** 
// -------------------------------------------------------------------

game.startGame();


// click event for candidate badges
$(".candidate").on("click", function() {
  console.log("in on.click .candidate")
  // get Id attr of the badge
  var badgeId = $(this).attr("id");
  // console.log("The attr id of the badge is " + badgeId);
  // hard coding the move testing destination

  switch (game.currentGameState) {
    case "pick-candidate": {
      userInterface.moveCandidateToFrontRunner(badgeId);
      userInterface.moveCandidatesToContenders();
    }
      
      break;
  
    default:
      break;
  };

  // var targetDivId = "contenders";
  // userInterface.moveBadge(badgeId, targetDivId);
  // this is great - next step is to fill out detail
  // need to have awareness of the game state
  // and what candidate was clicked so move or not move
  // decisions can be made 
  // Looking at game state will allow the correct target div
  // to be choosen.
  // There is also some class work to be done as candidates
  // in the Front-Runner and Challenger box need some CSS
  // to center with in the Div, but this is not desirable
  // in the Contenders and Candiates(Dustbin) holding pens
  // Finally there are times outside of this click where 
  // we want to automatically move candidates around:
  // candiates to contenders pen; "loser" to the Dustbin.
  // in those cases we are no responding to a click event
  // so maybe the moveBadge function is best kept using
  // the id seletor as parameters instead of actual candidate object
  // returned from $(this) in the click event function
});

// userInterface.toggleActionButtonVisibility("show");