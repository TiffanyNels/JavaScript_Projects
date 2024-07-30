var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0; 

$("#level-title").text("Press A Key to Start");

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

  playSound(userChosenColour);
  buttonAnimation(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);


  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};


function playSound(name) {

  switch (name) {
    case "red":
    var red = new Audio("sounds/red.mp3");
    red.play();
    break;

    case "blue":
    var blue = new Audio("sounds/blue.mp3");
    blue.play();
    break;

    case "green":
    var green = new Audio("sounds/green.mp3");
    green.play();
    break;

    case "yellow":
    var yellow = new Audio("sounds/yellow.mp3");
    yellow.play();
    break;

    default: console.log(name);

  }

};

function buttonAnimation(currentKey) {

  var activeButton = $("#" + currentKey);
  
  activeButton.addClass("pressed");
  
    setTimeout(function() {
      activeButton.removeClass("pressed");
    }, 100);
  
  };

  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
  
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function() {
          nextSequence();
        }, 1000);
      }
    } else {
      console.log("wrong");
      startOver();
    }
  };
  
  function startOver() {
    var wrongSequence = $("body");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    level = 0;
    gamePattern = [];
    started = false;

    wrongSequence.addClass("game-over");
    $("#level-title").text("Game Over");
    wrongAudio.play();

    setTimeout(function() {
      wrongSequence.removeClass("game-over");
      $("#level-title").text("Press Any Key to Restart")
    }, 2000);
    
  };
