let score = 0;

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
        document.getElementById("selection").classList.add("hide");
        document.getElementById("selected").classList.remove("hide");
        let player = document.getElementById("player")
        let house = document.getElementById("house")
        let btns = document.getElementById("selection").getElementsByTagName("span");
        let rndInt = Math.floor(Math.random() * 3)
        let houseChoice = btns.item(rndInt)
        player.classList = classes;
        player.classList.remove("icon");
        player.classList.add("border");
        player.childNodes[1].src=img;
        house.classList = houseChoice.classList
        house.childNodes[1].src = btns.item(rndInt).childNodes[0].src
        // Win lose draw
        player = player.classList.toString().replace(" ","").replace("border","")
        house = house.classList.toString().replace(" ","").replace("border","")
        if (player == house) {
            document.getElementById("draw").classList.remove("hide");
        } else if (player == "rock") {
            if (house == "paper") {
                //lose
                document.getElementById("lose").classList.remove("hide");
            } else {
                //win
                document.getElementById("win").classList.remove("hide");
                score++;
            }
        } else if (player == "paper") {
            if (house == "scissors") {
                //lose
                document.getElementById("lose").classList.remove("hide");
            } else {
                //win
                document.getElementById("win").classList.remove("hide");
                score++;
            }
        } else if (player == "scissors") {
            if (house == "rock") {
                //lose
                document.getElementById("lose").classList.remove("hide");
            } else {
                //win
                document.getElementById("win").classList.remove("hide");
                score++;
            }
        }
        document.getElementById("playerScore").innerText = score;
    });
}

// Reset game
document.getElementById("againBtn").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("win").classList.add("hide");
    document.getElementById("lose").classList.add("hide");
    document.getElementById("draw").classList.add("hide");
    document.getElementById("selected").classList.add("hide");
    document.getElementById("selection").classList.remove("hide");
})
