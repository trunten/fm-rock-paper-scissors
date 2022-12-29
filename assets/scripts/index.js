let score = 0;
let mode = "";
let turn = 1;

console.log(document.querySelectorAll("#selected .heading"));

let btns = document.getElementById("selection").getElementsByTagName("span");
for (let btn of btns) {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        let img = e.target.src;
        if (!img) {
            img = e.target.childNodes[0].src;
        }
        let classes = e.target.classList;
        if (window.getComputedStyle(document.getElementById("rules")).display != 'none') {
            document.getElementById("closeBtn").click();    
        }
        let player = document.getElementById("player")
        let house = document.getElementById("house")
        if (mode == 1) {
            let btns = document.getElementById("selection").getElementsByTagName("span");
            let rndInt = Math.floor(Math.random() * 3)
            let houseChoice = btns.item(rndInt)
            house.classList = houseChoice.classList
            house.childNodes[1].src = btns.item(rndInt).childNodes[0].src
            player.classList = classes;
            player.classList.remove("icon");
            player.classList.add("border");
            player.childNodes[1].src=img;
        } else {
            if (turn === 1) {
                player.classList = classes;
                player.classList.remove("icon");
                player.classList.add("border");
                player.childNodes[1].src=img;
                turn = 2;
                document.getElementById("heading").innerText = "Player Two";
                alert("Pass to Player TWO");
                return;
            } else {
                house.classList = classes;
                house.classList.remove("icon");
                house.classList.add("border");
                house.childNodes[1].src=img;
                turn = 1;
            }
        }

        //Hide selection
        document.getElementById("heading").classList.add("hide");
        document.getElementById("selection").classList.add("hide");
        document.getElementById("selected").classList.remove("hide");

        // Win lose draw
        player = player.classList.toString().replace(" ","").replace("border","")
        house = house.classList.toString().replace(" ","").replace("border","")
        let outcome = ""
        if (player == house) {
            outcome = "draw";
        } else if (player == "rock") {
            if (house == "paper") {
                //lose
                outcome = mode == 2 ? "p2" : "lose";
                score--;
            } else {
                //win
                outcome = mode == 2 ? "p1" : "win";
                score++;
            }
        } else if (player == "paper") {
            if (house == "scissors") {
                //lose
                outcome = mode == 2 ? "p2" : "lose";
                score--;
            } else {
                //win
                outcome = mode == 2 ? "p1" : "win";
                score++;
            }
        } else if (player == "scissors") {
            if (house == "rock") {
                //lose
                outcome = mode == 2 ? "p2" : "lose";
                score--;
            } else {
                //win
                outcome = mode == 2 ? "p1" : "win";
                score++;
            }
        }
        document.getElementById(outcome).classList.remove("hide");
        if (mode == 1) { document.getElementById("playerScore").innerText = score; }
    });
}

//Pick mode
for (let btn of document.getElementById("mode").children) {
    btn.addEventListener("click", setGameMode);
}

function setGameMode(e) {
    e.preventDefault();
    mode = e.target.getAttribute("mode");
    let head = document.getElementById("heading");
    let players = document.querySelectorAll("#selected .heading");
    if (mode == 1) {
        head.innerText = "Pick Your Weapon";
        players[0].innerText = "You Picked"
        players[1].innerText = "House Picked"
    } else {
        head.innerText = "Player One";
        players[0].innerText = "Player 1 Picked"
        players[1].innerText = "Player 2 Picked"
        // document.getElementById("score").children[0].innerText = "Two Player"
        document.getElementById("playerScore").innerText = "#"
    }
    reset();
    e.target.parentNode.classList.add("hide");
}

// Reset game
document.getElementById("againBtn").addEventListener("click", reset);
document.getElementById("fullReset").addEventListener("click", fullReset);

function reset(e) {
    if (e) { e.preventDefault(); }
    document.getElementById("p1").classList.add("hide");
    document.getElementById("p2").classList.add("hide");
    document.getElementById("win").classList.add("hide");
    document.getElementById("lose").classList.add("hide");
    document.getElementById("draw").classList.add("hide");
    document.getElementById("selected").classList.add("hide");
    document.getElementById("selection").classList.remove("hide");
    document.getElementById("heading").classList.remove("hide");
    document.getElementById("heading").innerText = (mode == 1 ? "Pick Your Weapon" : "Player One");
    turn = 1;
}

function fullReset(e) {
    reset(e);
    document.getElementById("selection").classList.add("hide");
    document.getElementById("heading").classList.add("hide");
    document.getElementById("mode").classList.remove("hide");
    mode = "";
}
