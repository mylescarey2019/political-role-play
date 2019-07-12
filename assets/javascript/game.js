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
// Global Variables
// ---------------------------------------------------------

// ---------------------------------------------------------
// Global Functions:
// ---------------------------------------------------------

//  this is a prototype function to solve the question of 
//  how to move a candidate "badge" HTML element from one 
//  part of the web page (a Div) to another part (a different Div)
//  using JQuery
// function moveBadge(badgeId,targetDivId) {
//   // select the page element - in this case the candidate 
//   // which at is currently coded in HTML as <candidate></candidate>
//   // Use the parameter badgeId to select it and the targetDivID
//   // for where to move it to
//   // presumably use JQuery append method in some manner
//   console.log("in global.moveBadge");
//   console.log("the target badge is: " + targetBadge);
//   console.log("the target div is " + targetDiv);
//   var badgeToMove = $(targetBadge);
//   var divToMoveTo = $(targetDiv);
//   // var badgeToMove = $("#sanders");
//   // var divToMoveTo = $("#challenger");
//   console.log("the badge we are moving is: " + badgeToMove);
//   console.log("the div we are moving to is: " + divToMoveTo);
//   // attempt to move badge
//   // $("#challenger").append($("#sanders"));
//   $(divToMoveTo).append(badgeToMove);
//   };

// click event for candidate badges
$(".candidate").on("click", function() {
  console.log("in on.click .candidate")
  // get Id attr of the badge
  var badgeId = $(this).attr("id");
  console.log("The attr id of the badge is " + badgeId);
  // hard coding the move testing destination
  var targetDivId = "contenders";
  moveBadge(badgeId, targetDivId);
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

// move a candidate badge from one div to another
function moveBadge(targetId,destinationId) {
  console.log("in global.moveBadge");
  console.log("the target id " + targetId);
  console.log("the destination d " + destinationId);
  $("#" + destinationId).append($("#" + targetId));
};

// moveBadge("harris","contenders");

 


// ---------------------------------------------------------
// Objects & Methhods:
// ---------------------------------------------------------

// ---------------------------------------------------------
// Core Program Flow & Event Listeners:
// ---------------------------------------------------------

// -------------------------------------------------------------------
//  *** Start of game flow *** 
// -------------------------------------------------------------------

// this is working
// $(".candidate").on("click", function() {
//   console.log("in on.click .candidate")
//   var theCandidateElement = $(this);
//   console.log(theCandidateElement);
//   var targetDiv = "#contenders";
//   moveBadge(theCandidateElement, targetDiv);

// this is working
// function moveBadge(badgeObject,targetDivId) {
//   // select the page element - in this case the candidate 
//   // which at is currently coded in HTML as <candidate></candidate>
//   // Use the parameter badgeId to select it and the targetDivID
//   // for where to move it to
//   // presumably use JQuery append method in some manner
//   console.log("in global.moveBadge");
//   console.log("the target badge is: " + badgeObject);
//   console.log("the target div is " + targetDivId);
//   // var badgeToMove = $(targetBadge);
//   var divToMoveTo = $(targetDivId);
//   // var badgeToMove = $("#sanders");
//   // var divToMoveTo = $("#challenger");
//   console.log("the badge we are moving is: " + badgeObject);
//   console.log("the div we are moving to is: " + divToMoveTo);
//   // attempt to move badge
//   // $("#challenger").append($("#sanders"));
//   $(divToMoveTo).append(badgeObject);
//   };




// var targetBadge = "#" + "gabbard";
// var targetDiv = "#" +"front-runner";
// moveBadge(targetBadge, targetDiv);
// var targetBadge = "#sanders";
// var targetDiv = "#challenger";
// moveBadge(targetBadge, targetDiv);




//   $("#sanders").on("click", function() {
//     var targetBadge = "#sanders";
//   var targetDiv = "#challenger";
//   moveBadge(targetBadge, targetDiv);

    // //  1. create new "copy" of the magnet for the given letter
    // //  2. append it fridge div
    // //  3. the append method causes the object to be removed from its previous location 
    // //     automatically
    // //  4. google to see if there is different "move" algorith out there
    //   var theButtonElement = $(this);
    //   theButtonElement.addClass("letter fridge-color");
    //   theButtonElement.removeClass("letter-button letter-button-color");
    //   // theButtonElement.text($(this).attr("data-letter"));
    
    //   // console.log(theButtonElement);
    //   $("#display").append(theButtonElement);
  
    // });


