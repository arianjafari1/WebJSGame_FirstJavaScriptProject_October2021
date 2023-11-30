const canvas = document.getElementById('canvas-game'); //create a variable to store canvas for game
const context = canvas.getContext('2d'); //set the context to 2d so canvas methods already built-in can be accessed
canvas.height = 720; //set the height of canvas
canvas.width = 1280; // set the width of canvas

//draw the background of the game:
const background = new Image();
background.src = "images/backgroundgame.png";
function drawBackground() {
    context.drawImage(background, 0, 0);
};

//draw the merchant character
const merchant = new Image();
merchant.src = "sprites/merchant.png";
function drawMerchant() {
    context.drawImage(merchant, 1000, 200);
};

const keys = [];

//variable for player character
const player = {
    x: 0,
    y: 200,
    width: 52,
    height: 55,
    frameX: 0, //frames are for cropping character out of the multitude of images from the sprite sheet
    frameY: 0,
    speed: 2,
    moving: false
};
const playerSprite = new Image();
playerSprite.src = "sprites/kingsprite.png"

//moving the player left and right
window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
    player.moving = true;
});
window.addEventListener("keyup", function (e) {
    delete keys[e.keyCode];
    player.moving = false;
});
//key 39 is right arrow
//key 37 is left arrow
function movePlayer() {
    if (keys[39] && player.x < 1000) {
        player.x += player.speed;
        player.frameY = 1;
        player.frameX = 1;
    };
    if (keys[37] && player.x > 10) {
        player.x -= player.speed;
    };
};
function animateWalking() {
    if (player.frameX < 4 && player.moving) {
        player.frameX++;
    } else
        player.frameX = 0;

};
//moving the player left and right ends

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    //first parametar img, is for the image, the one starting with s stand for source, to crop from the sprite only the image we want to show
    // and the last 4 starting with d from the destination, as in the destination of the canvas are where the sprite should be drawn and how big it should be
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
};
drawSprite(playerSprite, 0, 0, player.width, player.height, 0, 0, player.width, player.height);

//function to write dialogue, default height for 1st line is 476(default),for other line change to 2nd: 505, 3rd: 530, 4th: 553:
const firstLine = 476;
const secondLine = 505;
const thirdLine = 530;
const fourthLine = 553;
function writeDialogue(text, heightLine = firstLine) { 
    context.font = "25px Comic Sans MS";
    context.fillText(text, 5, heightLine)
};



const firstChoiceBtnPos = "30%"; //replace the "buttonPos" paramater from function "createButtons" to create the first button
const secondChoiceBtnPos = "55%"; //replace the "buttonPos" paramater from function "createButtons" to create the second button
function createButtons(dialogueString, buttonIdString, buttonPos) { // this is the function to create dialogue buttons for the game
    let btn = document.createElement("button");
    btn.type = "button";
    btn.style.position = "absolute";
    btn.style.left = buttonPos;
    btn.style.top = "73.5%"
    btn.style.zIndex = 2;
    btn.style.border = "1px solid #006400";
    btn.style.padding = "30px 5px";
    btn.style.borderRadius = "8px";
    btn.style.fontSize = "15px"
    btn.style.fontFamily = "cursive";
    btn.id = buttonIdString;
    btn.innerHTML = dialogueString;
    document.body.appendChild(btn);

};
function changeButtonInnerHTML(btnIdToChangeText, dialogueToChangeTo) { // function to change the innerHTML text of the buttons
        document.getElementById(btnIdToChangeText).innerHTML = dialogueToChangeTo;
    };


//all the dialogue stored in arrays, with "lineBegins" and "ends" meaning that all of those arrays from start to end are meant to go in 1 dialogue tree:
const introDialogue = [/*lineBegins*/'This tale begins when "The King", a ruler of a medieval magical kingdom, hears of a travelling merchant who'
    , 'supposedly has learnt the path to immortality. You, The King, will summon him to court to judge whether he'
    , 'tells truth or lie, and see whether this information can help in your quest to eternal life.' /*ends*/
    , "Next", "Return to Menu"];
const merchantGoodDialogueLines = [/*lineBegins*/"I see myself summoned by the great king, why have you given me this great honour your majesty?"/*ends*/
    , /*lineBegins*/"Ah, yes, the rumours about me knowing the way to immortality. Are these the rumours you are talking about,", "your grace?" /*ends*/
    , /*lineBegins*/"Yes, my king, they are true. And I suppose I wasn’t summoned here just to talk. What else is it you want,"
    , "your grace, do you wish to learn how to become immortal?"/*ends*/
    , /*lineBegins*/"The path to immortality is achieved by drinking certain potions, the formulas of those potions are unknown to"
    , "me, as these potions have been passed on from my ancestors up until I got them. I was the only one brave"
    , "enough to drink them, though they need to be drunk in a very careful fashion as too much can kill."/*ends*/
    , /*lineBegins*/"(*king drinks the potion, and then the Merchant speaks) How are you feeling, my king? Do you wish to"
    , "proceed with the second and final potion, it may be risky?"/*ends*/
    , /*lineBegins*/"(*the king feels energized all the sudden and thinks that it might have worked)"
    , "(*Merchant smirks and then speaks) Yes, my king, you may now be immortal, but this doesn’t make you young"
    , "forever, so it may be a curse.(*merchant laughs in an evil fashion and disappears, leaving the king shocked)", "GAME IS WON!"/*ends*/];
const merchantBadDialogueLines = [/*lineBegins*//*the first line of dialogue from here is the same as for the good dialogue*//*ends*/
/*lineBegins*/"If you are questioning my belief in the gods, you grace, I can assure you that it is not something that you"
    , "should worry about. Whereas for the rumours, it is something too dangerous to talk about."/*ends*/
    , "So be it, my king, if you really wish to hear it, yes, the rumours about me finding the way to immortality are"
    , "true. Why have I been summoned here after all, your grace, do you want to learn my secrets?"/*ends*/
    , "VERY WELL, your GRACE! If you wish to know the secrets, you will need to drink two potions that have been"
    , "passed down generation after generation in my family, until they reached me, I am the first to be brave",
    "enough to drink them."/*ends*/, /*linebegins*/"How are you feeling? Don’t worry if you are feeling a bit woozy, it is normal. Let’s proceed to the next potion."/*ends*/
    ,/*lineBegins*//*there is a 50% chance that the player gets the same ending as the good one*//*ends*/
    /*lineBegins*/"(*the intoxication levels of the king have gone way too high, and he starts feeling very sick)"
    , "For the way you treated me from the start, I could tell that you are not a ruler that is worth the power of"
    , "eternal life.(*the merchant smirks and disappears as the king is clutching to his throat, dying from"
    , "suffocation caused by the overwhelming toxins in the potion). GAME IS LOST!"];
const kingGoodDialogueLines = ["I’ve heard interesting rumours about you.", "Yes. Are they true?", "Yes, that is what I wish. What do I need to do?"
    , "Immortality is what I wish. I will drink the potion.", "I feel strange, but I'll be fine. I will drink the next potion.", "GAME IS WON!- Restart game"
    , "GAME IS WON!- Return to the main menu"];
const kingBadDialogueLines = ["I’ve heard heretical rumours about you that worry me.", "As the representative of the Gods, I say what is dangerous or not."
    , "I order you to show me your secrets.", "Immortality is what I crave. I’ll drink the first potion.", "No, I am done. I will not risk my life."
    , "GAME IS lost!- Try again", "Return to the main menu"];





//variables for createButtons(), writeAndChangeDialogue() and for the even listener for the buttons:
    var dialogueGoodKing = introDialogue[3];
    var dialogueBadKing = introDialogue[4];
    var idOfFirstBtn = "choice1";
    var idOfSecondBtn = "choice2";
    let dialogueLineOne = introDialogue[0];
    let dialogueLineTwo = introDialogue[1];
    let dialogueLineThree = introDialogue[2];
    let dialogueLineFour = "";
    createButtons(dialogueGoodKing, idOfFirstBtn, firstChoiceBtnPos); //create first button for good choices
    createButtons(dialogueBadKing, idOfSecondBtn, secondChoiceBtnPos); //create first button for good choices
function getRandomInt(max) { // function for randomness
    return Math.floor(Math.random() * max);
}


function selectDialogue() { //even listeners for dialogue selection using buttons made in a function
//even listners for the buttons, to change the the dialogue and the text on the buttons:
    document.getElementById(idOfFirstBtn).addEventListener("click", function() { //event listener for choice 1 button
        if (dialogueLineOne === introDialogue[0]) {
            dialogueLineOne = merchantGoodDialogueLines[0];
            dialogueLineTwo = "";
            dialogueLineThree = "";
            dialogueLineFour = "";
            changeButtonInnerHTML(idOfFirstBtn, kingGoodDialogueLines[0]);
            changeButtonInnerHTML(idOfSecondBtn, kingBadDialogueLines[0]);
        } else if (dialogueLineOne === merchantGoodDialogueLines[0]) {
            dialogueLineOne = merchantGoodDialogueLines[1];
            dialogueLineTwo = merchantGoodDialogueLines[2];
            dialogueLineThree = "";
            dialogueLineFour = "";
            changeButtonInnerHTML(idOfFirstBtn, kingGoodDialogueLines[1]);
            changeButtonInnerHTML(idOfSecondBtn, "No choice");
        } else if (dialogueLineOne === merchantGoodDialogueLines[1]) {
            dialogueLineOne = merchantGoodDialogueLines[3];
            dialogueLineTwo = merchantGoodDialogueLines[4];
            dialogueLineThree = "";
            dialogueLineFour = "";
            changeButtonInnerHTML(idOfFirstBtn, kingGoodDialogueLines[2]);
            changeButtonInnerHTML(idOfSecondBtn, kingBadDialogueLines[2]);
        } else if (dialogueLineOne === merchantGoodDialogueLines[3] || dialogueLineOne === merchantBadDialogueLines[2]) {
            dialogueLineOne = merchantGoodDialogueLines[5];
            dialogueLineTwo = merchantGoodDialogueLines[6];
            dialogueLineThree = merchantGoodDialogueLines[7];
            dialogueLineFour = "";
            changeButtonInnerHTML(idOfFirstBtn, kingGoodDialogueLines[3]);
            changeButtonInnerHTML(idOfSecondBtn, kingBadDialogueLines[3]);
        } else if (dialogueLineOne === merchantGoodDialogueLines[5] || dialogueLineOne === merchantBadDialogueLines[4]) {
            dialogueLineOne = merchantGoodDialogueLines[8];
            dialogueLineTwo = merchantGoodDialogueLines[9];
            dialogueLineThree = "";
            dialogueLineFour = "";
            changeButtonInnerHTML(idOfFirstBtn, kingGoodDialogueLines[4]);
            changeButtonInnerHTML(idOfSecondBtn, kingBadDialogueLines[4]);
        } else if (dialogueLineOne === merchantGoodDialogueLines[8] || dialogueLineOne === merchantBadDialogueLines[7]) {
            dialogueLineOne = merchantGoodDialogueLines[10];
            dialogueLineTwo = merchantGoodDialogueLines[11];
            dialogueLineThree = merchantGoodDialogueLines[12];
            dialogueLineFour = merchantGoodDialogueLines[13];
            changeButtonInnerHTML(idOfFirstBtn, kingGoodDialogueLines[5]);
            changeButtonInnerHTML(idOfSecondBtn, kingGoodDialogueLines[6]);
            alert("You have won.");
        } else if (dialogueLineOne === merchantGoodDialogueLines[10] || dialogueLineOne === merchantBadDialogueLines[8]) {
            window.location.href = "HtmlGame.html";
        }
    });
    document.getElementById(idOfSecondBtn).addEventListener("click", function () { //event listener for choice 2 button
        if (dialogueLineOne === introDialogue[0]) {
            window.location.href = "HtmlStart.html";
        } else if (dialogueLineOne === merchantGoodDialogueLines[0]) {
            dialogueLineOne = merchantBadDialogueLines[0];
            dialogueLineTwo = merchantBadDialogueLines[1];
            dialogueLineThree = "";
            dialogueLineFour = "";
            changeButtonInnerHTML(idOfFirstBtn, "No Choice");
            changeButtonInnerHTML(idOfSecondBtn, kingBadDialogueLines[1]);
        } else if (dialogueLineOne === merchantBadDialogueLines[0]) {
            dialogueLineOne = merchantBadDialogueLines[2];
            dialogueLineTwo = merchantBadDialogueLines[3];
            dialogueLineThree = "";
            dialogueLineFour = "";
            changeButtonInnerHTML(idOfFirstBtn, kingGoodDialogueLines[2]);
            changeButtonInnerHTML(idOfSecondBtn, kingBadDialogueLines[2]);
        } else if (dialogueLineOne === merchantBadDialogueLines[2] || dialogueLineOne === merchantGoodDialogueLines[3]) {
            dialogueLineOne = merchantBadDialogueLines[4];
            dialogueLineTwo = merchantBadDialogueLines[5];
            dialogueLineThree = merchantBadDialogueLines[6];
            dialogueLineFour = "";
            changeButtonInnerHTML(idOfFirstBtn, kingGoodDialogueLines[3]);
            changeButtonInnerHTML(idOfSecondBtn, kingBadDialogueLines[3]);
        } else if (dialogueLineOne === merchantBadDialogueLines[4] || dialogueLineOne === merchantGoodDialogueLines[5]) {
            dialogueLineOne = merchantBadDialogueLines[7];
            dialogueLineTwo = "";
            dialogueLineThree = "";
            dialogueLineFour = "";
            changeButtonInnerHTML(idOfFirstBtn, kingGoodDialogueLines[4]);
            changeButtonInnerHTML(idOfSecondBtn, kingBadDialogueLines[4]);
        } else if (dialogueLineOne === merchantBadDialogueLines[7] || dialogueLineOne === merchantGoodDialogueLines[8]) { //adding randomness of 50/50 as to whether the player gets good or bad ending
            let badGoodEnding = getRandomInt(2); //calling function and storing it in a variablle, to either get 0, 1 for randomness
            switch (badGoodEnding) { // adding the randomness with switch statement
                case 0: //if the variable is 0 then do:
                    dialogueLineOne = merchantBadDialogueLines[8];
                    dialogueLineTwo = merchantBadDialogueLines[9];
                    dialogueLineThree = merchantBadDialogueLines[10];
                    dialogueLineFour = merchantBadDialogueLines[11];
                    changeButtonInnerHTML(idOfFirstBtn, kingBadDialogueLines[5]);
                    changeButtonInnerHTML(idOfSecondBtn, kingBadDialogueLines[6]);
                    alert("You have lost");
                    break;
                case 1: // if the variable is 1, then do:
                    dialogueLineOne = merchantGoodDialogueLines[10];
                    dialogueLineTwo = merchantGoodDialogueLines[11];
                    dialogueLineThree = merchantGoodDialogueLines[12];
                    dialogueLineFour = merchantGoodDialogueLines[13];
                    changeButtonInnerHTML(idOfFirstBtn, kingGoodDialogueLines[5]);
                    changeButtonInnerHTML(idOfSecondBtn, kingGoodDialogueLines[6]);
                    alert("You have won.");
                    break;
        }
        } else if (dialogueLineOne === merchantGoodDialogueLines[10] || dialogueLineOne === merchantBadDialogueLines[8]) {
            window.location.href = "HtmlStart.html";
        }
    });
};
selectDialogue();


//function for calling the writeDialogue() to write dialogue and have it called in the update():
function writeAndChangeDialogue() {
    writeDialogue(dialogueLineOne, firstLine); //create dialogue for first line of the screen
    writeDialogue(dialogueLineTwo, secondLine); //create dialogue for second line of the screen
    writeDialogue(dialogueLineThree, thirdLine); //create dialogue for third line of the screen
    writeDialogue(dialogueLineFour, fourthLine); //create dialogue for fourth line of the screen
};


function update() { //update function to keep updating every function or code thrown in here
    drawBackground();
    drawMerchant();
    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width * 4, player.height * 4);
    writeAndChangeDialogue();
    movePlayer();
    animateWalking()
    requestAnimationFrame(update);
};
update();