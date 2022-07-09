//To flash random colours
var buttonColours = ["red", "blue", "green", "yellow"];

//For answer tracking and checking
var gamePattern = [];
var userClickedPattern = [];

//To start the game
$(document).keypress(nextSequence);

//Game starts by pressing any key
var level = 0;
function nextSequence() {
  $(document).off("keypress");  //stops listening for key presses
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  userClickedPattern = [];
}

$(".btn").click(onClick);

function onClick() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);
  if(level!=0)
   checkAnswer(userClickedPattern.length-1);
}


function checkAnswer(currentIndex)
{
    if(gamePattern[currentIndex] == userClickedPattern[currentIndex])
    {
      if(currentIndex == gamePattern.length - 1)
      {
        setTimeout(nextSequence,1000);
      }
    }
    else{
      $("h1").text("Game Over, press any key to restart");
      var over = new Audio("sounds/wrong.mp3");
      over.play();
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over")
      }, 200);
      level = 0;
      gamePattern = [];
      $(document).keypress(nextSequence);
    }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}
