const defaultConfig = {
    game_title: "Tic Tac Toe",
    footer_text: "Maintained and Copyright by Team Fakibazz © 2025",
    primary_color: "#9b00ff", 
    secondary_color: "#2979ff", 
    background_start: "#1e3c72",
    background_end: "#2a5298",
    text_color: "#ffffff"
};

let config = { ...defaultConfig };

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#rebtn");
let newBtn = document.querySelector("#newgame");
let msgcont = document.querySelector(".msg");
let mcg = document.querySelector("#mesg");

let turnX = true;
let moveCount = 0;
let boxState = Array(9).fill("");

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

console.log("Game initialized with default config:", config);

boxes.forEach((box, index) => {
    box.addEventListener("click", function() {
        console.log(`Box ${index} clicked. Current value: "${this.innerText}"`);

        if (this.innerText.trim() !== "" || msgcont.classList.contains("show")) {
            console.log("Box already filled or game over, ignoring click.");
            return;
        }

        const currentPlayer = turnX ? "X" : "O";
        this.innerText = currentPlayer;
        this.classList.add(turnX ? "x" : "o");

        if(turnX) {
             this.style.color = config.primary_color;
             this.style.textShadow = `0 0 10px ${config.primary_color}`;
        } else {
             this.style.color = config.secondary_color;
             this.style.textShadow = `0 0 10px ${config.secondary_color}`;
        }

        boxState[index] = currentPlayer;
        moveCount++;
        console.log(`Move count: ${moveCount}. Next turn: ${turnX ? "O" : "X"}`);

        turnX = !turnX;

        checkWinner();
    });
});

function checkWinner() {
    console.log("Checking for winner...");
    let isWinner = false;

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boxState[a] !== "" && boxState[a] === boxState[b] && boxState[b] === boxState[c]) {
            boxes[a].classList.add("win");
            boxes[b].classList.add("win");
            boxes[c].classList.add("win");
            console.log(`Winner found! Player ${boxState[a]} at positions [${a}, ${b}, ${c}]`);
            showWinner(boxState[a]);
            isWinner = true;
            return;
        }
    }

    if (!isWinner && moveCount === 9) {
        console.log("No winner. It's a draw.");
        showDraw();
    }
}

function showWinner(player) {
    console.log(`Showing winner: Player ${player}`);
    mcg.style.color = player === "X" ? "#15E854" : "#f093fb";
    mcg.innerText = `🎉 Congratulations! Player ${player === "X" ? "1" : "2"} Wins!`;
    msgcont.classList.add("show");
}

function showDraw() {
    console.log("Displaying draw message.");
    mcg.style.color = "#ff9800";
    mcg.innerText = "🤝 Match Draw!";
    msgcont.classList.add("show");
}

function resetGame() {
    console.log("Resetting game...");
    boxes.forEach((box, index) => {
        box.innerText = "";
        box.classList.remove("x", "o", "win");
        box.style.color = ""; 
        box.style.textShadow = "";
        boxState[index] = "";
    });
    moveCount = 0;
    turnX = true;
    msgcont.classList.remove("show");
}

resetBtn.addEventListener("click", () => { console.log("Reset button clicked"); resetGame(); });
newBtn.addEventListener("click", () => { console.log("New Game button clicked"); resetGame(); });

async function onConfigChange(newConfig) {
    console.log("Config change detected:", newConfig);
    config = { ...config, ...newConfig };

    document.getElementById('game-title').textContent = config.game_title;
    document.getElementById('footer').textContent = config.footer_text;

    const primary = config.primary_color;
    const secondary = config.secondary_color;
    const bgStart = config.background_start;
    const bgEnd = config.background_end;
    const txtColor = config.text_color;

    document.body.style.background = `linear-gradient(135deg, ${bgStart} 0%, ${bgEnd} 100%)`;
    document.querySelector('h1').style.color = txtColor;
    document.getElementById('footer').style.color = txtColor;

    const xBoxes = document.querySelectorAll('.box.x');
    xBoxes.forEach(box => {
        box.style.color = primary;
        box.style.textShadow = `0 0 10px ${primary}`;
    });

    const oBoxes = document.querySelectorAll('.box.o');
    oBoxes.forEach(box => {
        box.style.color = secondary;
        box.style.textShadow = `0 0 10px ${secondary}`;
    });

    const newGameBtn = document.querySelector('#newgame');
    newGameBtn.style.background = `linear-gradient(145deg, ${primary}, ${adjustColor(primary, 40)})`;

    console.log("Config applied successfully.");
}

function adjustColor(color, amount) {
    console.log(`Adjusting color: ${color} by ${amount}`);
    return color; 
}

if (window.elementSdk) {
    console.log("Initializing elementSdk...");
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities: (config) => ({
            recolorables: [
                {
                    get: () => config.background_start,
                    set: (v) => { console.log("Changing background_start:", v); config.background_start = v; window.elementSdk.setConfig({background_start: v}); }
                },
                {
                    get: () => config.background_end,
                    set: (v) => { console.log("Changing background_end:", v); config.background_end = v; window.elementSdk.setConfig({background_end: v}); }
                },
                {
                    get: () => config.primary_color,
                    set: (v) => { console.log("Changing primary_color:", v); config.primary_color = v; window.elementSdk.setConfig({primary_color: v}); }
                },
                {
                    get: () => config.secondary_color,
                    set: (v) => { console.log("Changing secondary_color:", v); config.secondary_color = v; window.elementSdk.setConfig({secondary_color: v}); }
                }
            ]
        }),
        mapToEditPanelValues: (config) => new Map([
            ["game_title", config.game_title],
            ["footer_text", config.footer_text]
        ])
    });
}
