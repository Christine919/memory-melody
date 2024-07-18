// $("#start-btn").addEventListener("click", playGame);

// var buttonColous = ["red", "blue","yellow", "green", "purple", "orange"];

// var gamePattern = [];
// var userClickedPatten = [];

// let level = 0;

// function playGame() {
//     // Get the elements after the button click
//     const infoElements = $(".info"); // Ensure the class name is correct
//     const levelElement = $("#level");

//     // Check if elements exist before manipulating them
//     if (infoElements.length > 0 && levelElement) {
//         // Hide the instruction and start button
//         for (let i = 0; i < infoElements.length; i++) {
//             infoElements[i].style.visibility = "hidden";
//         }

//         $("#level").text("Level " + level);
//         nextSequence()
//   }
// }

// $(".colorBtn").click(function() {
//     var userChonsenColour = $(this).attr("id");
//     userClickedPatten.push(userChonsenColour);

//     playSound(userChonsenColour);
//     animatePress(userChonsenColour);

//     checkAnswer(userClickedPatten.length - 1);
// });

// function nextSequence() {
//     userClickedPatten = [];
//     level++;
//     $("#level").text("Level " + level);

//     var randomNum = Math.floor(Math.random() * 6);
//     var randomChosenColour = buttonColous[randomNum];
//     gamePattern.push(randomChosenColour);

//     $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
//     playSound(randomChosenColour);
// }

// function playSound(name) {
//     var audio = new Audio("./sounds/ + name + .mp3");
//     audio.play();
// }

// function animatePress(currentColor) {
//     $("#" + currentColor).addClass("pressed");

//     setTimeout(function() {
//         $("#" + currentColor).removeClass("pressed");
//     }, 100);
// }

// function startOver() {
//     level = 0;
//     gamePattern = [];
// }

$(document).ready(function() {
    $("#start-btn").click(playGame);

    var buttonColors = ["red", "blue", "yellow", "green", "purple", "orange"];

    var gamePattern = [];
    var userClickedPattern = [];
    let level = 0;

    function playGame() {
        // Hide the instruction and start button
        $(".info").css("visibility", "hidden");

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
            playSound("wrong");
            $("body").addClass("game-over");

            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);

            $("#level").text("Game Over, Press Start to Restart");

            startOver();
        }
    }

    function startOver() {
        level = 0;
        gamePattern = [];
    }
});
