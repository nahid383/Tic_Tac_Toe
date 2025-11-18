let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#rebtn");
let newBtn = document.querySelector("#newgame");
let msgcont = document.querySelector(".msg");
let mcg = document.querySelector("#mesg");

let trunX = true;
let moveCount = 0;

const winPatterns = [
    [0,1,2], [0,3,6], [0,4,8],
    [1,4,7], [2,5,8], [2,4,6],
    [3,4,5], [6,7,8]
];

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        console.log(`Box ${index} clicked`);

        if (trunX) {
            console.log("Clicked X");
            box.innerText = "X";
            box.classList.add("x");
            box.classList.remove("o");
        } else {
            console.log("Clicked O");
            box.innerText = "O";
            box.classList.add("o");
            box.classList.remove("x");
        }

        trunX = !trunX;
        box.disabled = true;

        box.classList.remove("animate");
        void box.offsetWidth;
        box.classList.add("animate");

        moveCount++;
        console.log("Move count:", moveCount);

        checkWinner();
    });
});

function checkWinner() {
    for (let pattern of winPatterns) {
        let p1 = boxes[pattern[0]].innerText;
        let p2 = boxes[pattern[1]].innerText;
        let p3 = boxes[pattern[2]].innerText;

        if (p1 !== "" && p1 === p2 && p2 === p3) {
            console.log("Winner:", p1);
            showWinner(p1);
            return;
        }
    }

    if (moveCount === 9) {
        console.log("Game Draw!");
        showDraw();
    }
}

function showWinner(winner) {
    hideTitle();

    if (winner === "X") {
        mcg.style.color = "#15E854";
        mcg.innerText = "🎉 Congratulations, Winner is Player 1";
    } else {
        mcg.style.color = "red";
        mcg.innerText = "🎉 Congratulations, Winner is Player 2";
    }

    msgcont.classList.remove("hide");
    boxes.forEach(box => box.disabled = true);
}

function showDraw() {
    hideTitle();
    mcg.style.color = "orange";
    mcg.innerText = "🤝 Match Draw!";
    msgcont.classList.remove("hide");
    boxes.forEach(box => box.disabled = true);
}

function resetGame() {
    console.log("Game Reset!");

    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
        box.classList.remove("animate", "x", "o");
    });

    msgcont.classList.add("hide");
    mcg.classList.remove("show");
    trunX = true;
    moveCount = 0;
    showTitle();
}

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);

function hideTitle() {
    let title = document.querySelector("h1");
    title.classList.remove("fade-in");
    title.classList.add("fade-out");
}

function showTitle() {
    let title = document.querySelector("h1");
    title.classList.remove("fade-out");
    title.classList.add("fade-in");
}
