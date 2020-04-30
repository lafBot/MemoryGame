const cards = Array.from(document.getElementsByClassName("card"));
const button = document.querySelector("button");
let totalFlips = 0;
let matchedCards = 0;
let highScore = Number(JSON.parse(localStorage.getItem("highScore"))) || Infinity;
let flipCount = 0;
let noClicking = false;
let card1 = null;
let card2 = null;

//restore highscore from memory if applicable
if (highScore != Infinity) {
    document.querySelector("#high-score").innerText = highScore;
}

//NewGame button listener
button.addEventListener("click", function newGame(){
    totalFlips = 0;
    matchedCards = 0;
    flipCount = 0;
    cards.forEach(card => card.classList.remove("visible"));
    setTimeout(function shuffle() {
        for (let i = cards.length - 1; i > 0; i--) {
            let shuffleIndex = Math.floor(Math.random() * (i+1));
            cards[shuffleIndex].style.order = i;
            cards[i].style.order = shuffleIndex;
        }
    }, 500);
    document.querySelector("#flips").innerText = 0;
});

cards.forEach(card => {
    card.addEventListener('click', function(e) {
    let parent = e.target.parentElement.parentElement;

    //first flip
    if (flipCount < 1 && noClicking === false) {
        parent.classList.add("visible");
        card1 = parent;
        flipCount ++;
        totalFlips ++;
        document.querySelector("#flips").innerText = totalFlips;
    //second flip
    } else if (flipCount = 1 && noClicking === false) {
        card2 = parent;
        noClicking = true;
        totalFlips ++;
        document.querySelector("#flips").innerText = totalFlips;
        parent.classList.add("visible");
            if (card1.firstElementChild.firstElementChild.getAttribute('src') !== card2.firstElementChild.firstElementChild.getAttribute('src')) {
                setTimeout(function() {
                card1.classList.remove("visible");
                card2.classList.remove("visible");
                card1 = null;
                card2 = null;
                noClicking = false;
                }, 1000);
            }
            else {
                matchedCards ++;
                card1 = null;
                card2 = null;
                noClicking = false;
            } 
        //edit high score if necessary
        if (matchedCards === 8 && totalFlips < highScore) {
            highScore = totalFlips;
            document.querySelector("#high-score").innerText = highScore;
            localStorage.setItem("highScore", JSON.stringify(highScore));
        }
        return flipCount = 0;
    }
});
});
