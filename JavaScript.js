//THIS CODE IS ALL FOR THE TITLE-SCREEN:
const canvasTitleScreen = document.getElementById('canvas-titlescreen'); //create a variable to store canvas for titlescreen


// draw the background image for the title screen
window.onload = function () {
    canvasTitleScreen.style.background = "url(titlescreen.png)";
};

const playButton = "play-button"; // the id name of the play button stored in a variable
const optionsButton = "options-button"; // the id name of the option button stored in a variable
//function to move buttons:
function moveButtons(button, xValueButton, yValueButton) {
    document.getElementById(button).style.left = xValueButton;
    document.getElementById(button).style.top = yValueButton;
};
moveButtons(playButton, "44.5%", "55%"); //move the play button
moveButtons(optionsButton, "42%", "70%"); //move the options button



function playGame() {
    window.location.href = "HtmlGame.html";
};

function openOptions() {
    alert("         How to play the game" + '\n' +
        "The page you are on currently is the Title-Screen" + '\n' +
        '\n' + "To Play the game, click the Play button" + '\n' + '\n' +
        "Once you are in the game you will be greeted with the introduction, click Next to get into the game or Return to return to the main menu " + '\n' +
        '\n' + "Now you can start enjoying the game, you will have to make choices and based on your choices the outcome of the game will change" + '\n' + '\n' +
        "Also you will be able to move your character, THE KING, from left to right using the left and right arrow keys, when you go to the right, you will see a nice animation, when you go left you will see him freakishly rolling back"
        + '\n' + '\n' + "Based on your choices the outcome will change, but there is one choice where there is a 50/50 chance that you will get a different outcome"
        + '\n' + '\n' + "The merchant's dialogue  is in the white dialogue box, and you can answer using the buttons underneath" + '\n' + '\n' +
        "                               Enjoy the game");
};
//THIS IS WHERE THE CODE FOR THE TITLE-SCREEN ENDS

