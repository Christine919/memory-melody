$(document).ready(function() {
    $("#start-btn").click(playGame);
    $("#play-again-btn").click(startOver);

    var buttonColors = ["red", "blue", "yellow", "green", "purple", "orange"];
    var gamePattern = [];
    var userClickedPattern = [];
    let level = 0;

    function playGame() {
        // Hide the instruction and start button
        $(".info").hide();
        $("#game-over").hide();
        // Show the level display
        updateLevelDisplay(level);
        nextSequence();
    }

    $(".colorBtn").click(function() {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    });

    function nextSequence() {
        userClickedPattern = [];
        level++;
        updateLevelDisplay(level);

        var randomNum = Math.floor(Math.random() * buttonColors.length);
        var randomChosenColor = buttonColors[randomNum];
        gamePattern.push(randomChosenColor);

        $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);
    }

    function playSound(name) {
        var audio = new Audio(`./sounds/${name}.mp3`);
        audio.play();
    }

    function animatePress(currentColor) {
        $("#" + currentColor).addClass("pressed");

        setTimeout(function() {
            $("#" + currentColor).removeClass("pressed");
        }, 100);
    }

    function updateLevelDisplay(currentLevel) {
        $("#level").text("Level " + currentLevel).show();
    }

    function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function() {
                    nextSequence();
                }, 1000);
            }
        } else {
            gameOver();
        }
    }

    function gameOver() {
        playSound("wrong");
        $("body").addClass("game-over-warning");

        setTimeout(function() {
            $("body").removeClass("game-over-warning");
        }, 200);

        $("#level").hide();
        $("#final-level").text("You reached level " + level);
        $("#game-over").show();
    }

    function startOver() {
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        $(".info").show();
        $("#game-over").hide();
        playGame();
    }
});
