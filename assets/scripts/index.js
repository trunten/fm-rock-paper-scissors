let score = [[0,0],[0,0]]; //Array because I plan to show wins/losses and P1 vs. P2 seperately in the future.
let mode = 0;
let turn = 1;
let weapons = {};
let players;

async function gameStart(playerChoice) { //async function so I can have a slight delay in a loop
    let playerOne = players[0];
    let playerTwo = players[1];
    viewRules(false);
    if (mode === 1) {
        let arr = Object.keys(weapons);
        let computerChoice = arr[Math.floor(Math.random() * arr.length)];
        updatePlayer(playerOne, playerChoice);
        updatePlayer(playerTwo); // Updates with no weapon to give blank button
        viewSelection(false);
        viewSelected(true);
        //Loop for a bit (with delay) to give a pulsing animation on computer player's button to build suspense! :P 
        for (let i = 0; i < 8; i++) {
            let scale = (i % 2) ? 1.05 : 1
            playerTwo.style = `transform: scale(${scale})`
            await new Promise(r => setTimeout(r, 300));            
        }
        playerTwo.style = ""; //Reset element style to nothing.
        updatePlayer(playerTwo, computerChoice);
    } else {
        if (turn === 1) {
            updatePlayer(playerOne, playerChoice);
            turn = 2;
            document.getElementById("heading").innerText = "Player Two";
            alert("Pass to Player TWO");
        } else {
            updatePlayer(playerTwo, playerChoice);
            turn = 1;
            viewSelection(false);
            viewSelected(true);
        }
    }
    calcualteOutcome();
}

//Sets the game mode (1 or 2 player)
function setGameMode(e) {    
    e.preventDefault();
    mode = parseInt(e.target.getAttribute("mode"));
    let head = document.getElementById("heading");
    let playerHeadings = document.querySelectorAll("#selected .heading");
    if (mode == 1) {
        head.innerText = "Pick Your Weapon";
        playerHeadings[0].innerText = "You Picked"
        playerHeadings[1].innerText = "House Picked"
        document.getElementById("playerScore").innerText = score[mode-1][0];
    } else {
        head.innerText = "Player One";
        playerHeadings[0].innerText = "Player 1 Picked"
        playerHeadings[1].innerText = "Player 2 Picked"
        // document.getElementById("score").children[0].innerText = "Two Player"
        document.getElementById("playerScore").innerText = "#"
    }
    reset();
}

//Updates the element 'player' with the the appropriate img, classes and type for 'weapon'
function updatePlayer(player, weapon) {
    if(player && weapon) {
        player.classList = weapons[weapon]["class"];
        player.childNodes[1].src=weapons[weapon]["img"];
        player.setAttribute("type", weapon);
    } else if (player) {
        player.classList = "border";
        player.childNodes[1].src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="; //1px transparent image
        player.setAttribute("type", "");
    }
}

// Shows (true) or Hides (false) the "weapon" selection element based on "show" param (boolean)
function viewSelection(show) {
    if (show) {
        document.getElementById("heading").classList.remove("hide");
        document.getElementById("selection").classList.remove("hide");
    } else {
        document.getElementById("heading").classList.add("hide");
        document.getElementById("selection").classList.add("hide");
    }
}

// Shows (true) or Hides (false) the player selections element based on "show" param (boolean)
function viewSelected(show) {
    if (show) {
        document.getElementById("selected").classList.remove("hide");
    } else {
        document.getElementById("selected").classList.add("hide");
    }
    
}

// Shows (true) or Hides (false) the rules modal based on "show" param (boolean)
function viewRules(show) {
    if (show){
        document.getElementById("rules").classList.remove("hide");
    } else if (window.getComputedStyle(document.getElementById("rules")).display != 'none') {
        document.getElementById("rules").classList.add("hide");
    }
}

// Shows (true) or Hides (false) the mode seleciton element based on "show" param (boolean)
function viewModeSelect(show) {
    if (show) {
        document.getElementById("mode").classList.remove("hide");
    } else {
        document.getElementById("mode").classList.add("hide");
    }
    
}

// Shows (true) or Hides (false) the otuytcome element based on "show" param (boolean)
function viewOutcome(show) {
    if (show) {
        document.getElementById("outcome").classList.remove("hide");
        document.getElementById("againBtn").classList.remove("hide");
    } else {
        document.getElementById("outcome").classList.add("hide");
        document.getElementById("againBtn").classList.add("hide");
    }
}

// Calcualtes win, lose or draw, unhides the outcome element and updates score accordingly
function calcualteOutcome() {    
    let outcome = ""
    let playerOne = players[0].getAttribute("type");
    let playerTwo = players[1].getAttribute("type")
    if (playerOne == playerTwo) {
        outcome = "Draw";
    } else if ((playerOne == "rock" && playerTwo === "scissors") 
            || (playerOne == "paper" && playerTwo === "rock")
            || (playerOne == "scissors" && playerTwo === "paper")) {
        //win
        outcome = mode == 2 ? "Player 1 Wins" : "You Win";
        score[mode-1][0]++;
    } else {
        //lose
        outcome = mode == 2 ? "Player 2 Wins" : "You Lose";
        // score[mode-1][1]++;
        score[mode-1][0]--;
    }
    document.getElementById("outcome").innerText = outcome;
    viewOutcome(true);
    if (mode == 1) { document.getElementById("playerScore").innerText = score[mode-1][0]; }
}

// Resets game state back to the "weapon" selection screen and hides the rules modal if showing
function reset(e) {
    if (e) { e.preventDefault(); }
    turn = 1;
    viewOutcome(false);
    viewSelected(false);
    viewModeSelect(false);
    viewRules(false);
    viewSelection(true);
    document.getElementById("modeSelectBtn").classList.remove("invisible");
    document.getElementById("heading").innerText = (mode == 1 ? "Pick Your Weapon" : "Player One");
}

// Full reset of the game. Takes user back to mode selection screen, hiding all other elements and resetting the score
function fullReset(e) {
    reset(e);
    mode = 0;
    score = [[0,0],[0,0]];
    viewSelection(false);
    viewModeSelect(true)
    document.getElementById("modeSelectBtn").classList.add("invisible");
    document.getElementById("playerScore").innerText = "#"
}

// ---------------
// Initialisation
// ---------------
window.onload = () => {
    players = [document.getElementById("player"), document.getElementById("house")];

    // ---------------------
    // Click/Event Handlers
    // --------------------

    // "Weapon" buttons
    for (let btn of document.querySelectorAll("#selection span")) {
        weapons[btn.getAttribute("type")] = {"img": btn.childNodes[0].src, "class": btn.classList};
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            gameStart(e.target.classList.toString().replace(/(border|icon|\s*)/g,""));
        });
    }

    // Rules button
    document.getElementById("rulesBtn").addEventListener("click", (e) => {
        e.preventDefault();
        viewRules(true);
    });

    // Close Rules button
    document.getElementById("closeBtn").addEventListener("click", (e) => {
        e.preventDefault();
        viewRules(false);
    });

    // Reset game buttons
    document.getElementById("againBtn").addEventListener("click", reset);
    document.getElementById("modeSelectBtn").addEventListener("click", fullReset);

    // One Player and Two Player Buttons
    for (let btn of document.getElementById("mode").children) {
        btn.addEventListener("click", setGameMode);
    }
}