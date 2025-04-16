
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var isGameStarted = false;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);
    $("." + randomChosenColor).fadeOut(100).fadeIn(100);
    level++;
    $("h1").text("Level " + level);
}

function playSound(name) {
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play()
    $("." + name).fadeOut(100).fadeIn(100);
}

function animatePress(currentColor) {
    console.log("." + currentColor);
    $("div.btn." + currentColor).addClass("pressed");
    setTimeout(function() {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === (currentLevel+1)) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
            userClickedPattern.length = 0;
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern.length = 0;
    userClickedPattern.length = 0;
    isGameStarted = false;
};

$("div.btn").click(function(event) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

$("html").keydown(function() {
    if (!isGameStarted) {
        nextSequence();
        $("h1").text("Level " + level);
    }
    isGameStarted = true;
})


