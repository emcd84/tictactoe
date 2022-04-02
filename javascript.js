const playerFactory = (name, x) => {
    return {name, x, playTurn};

    function playTurn(location) {
        GameBoard.gameboard[location] = x;
        console.log(GameBoard.gameboard);
    }
}

const GameBoard = (() => {
    //const gameboard = new Array(9);
    const gameboard = ["X", "O", " ", "X", " ", "O", " ", " ", " "];

    function displayBoard() {
        const cellArray = document.querySelectorAll(".square");
        console.log(cellArray);
        for(let i=0; i<9; i++) {
            cellArray[i].textContent = gameboard[i];
        }
    }
    function checkCell(location) {
        if(gameboard[location] === " ") {
            return(true);
        } else {
            return(false);
        }
    }

    return { gameboard, displayBoard, checkCell };
})();

const GameController = (() => {
    let lastPlayed = "O";

    function playGame() {
        playerOne = playerFactory("One", "X");
        playerTwo = playerFactory("Two", "O");
        GameBoard.displayBoard();
        GameController.initializeClickEvents(playerOne, playerTwo);
    }

    function initializeClickEvents(playerOne, playerTwo) {
        squareArr = document.querySelectorAll(".square");
        for(let i=0; i<squareArr.length; i++) {
            squareArr[i].addEventListener('click', () => {
                let location = squareArr[i].getAttribute("id");
                console.log("click -- " + squareArr[i].getAttribute("id"));
                if(GameBoard.checkCell(location)) {
                    if(lastPlayed === "O") {
                        playerOne.playTurn(location);
                        GameBoard.displayBoard();
                        lastPlayed = "X";
                    } else {
                        playerTwo.playTurn(location);
                        GameBoard.displayBoard();
                        lastPlayed = "O";
                    }
                }
            });
        }
    }
    return { playGame, initializeClickEvents };
})();


GameController.playGame();

