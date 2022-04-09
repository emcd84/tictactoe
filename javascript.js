//logic is all kinds of messed up, may need to rebuild with more OOP care

const playerFactory = (name, x) => {
    return {name, x, playTurn};

    function playTurn(location) {
        console.log(GameBoard.gameboard);
        console.log("playTurn called");
        console.log(GameBoard.gameboard[location]);
        console.log(x);
        GameBoard.gameboard[location] = x;
        GameController.checkGameOver();
    }
}

const GameBoard = (() => {
    let lastPlayed = "O";

    //const gameboard = new Array(9);
    let gameboard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

    function displayBoard() {
        console.log("displayBoard called");
        const cellArray = document.querySelectorAll(".square");
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

    function checkWin() {
        if(checkArray(gameboard.slice(0,3))) {
            return(true);
        } else if(checkArray(gameboard.slice(3,3))) {
            return(true);
        } else if(checkArray(gameboard.slice(6,3))) {
            return(true);
        } else if(checkArray([gameboard[0], gameboard[3], gameboard[6]])) {
            return(true);
        } else if(checkArray([gameboard[2], gameboard[5], gameboard[8]])) {
            return(true);
        } else if(checkArray([gameboard[0], gameboard[4], gameboard[8]])) {
            return(true);
        } else if(checkArray([gameboard[2], gameboard[4], gameboard[6]])) {
            return(true);
        } else {
            return(false);
        }
    }

    function checkTie() {
        let full = true;
        for(let i=0; i<gameboard.length; i++) {
            if(!(gameboard[i] === "X" || gameboard[i] === "O")) {
                full = false;
                break;
            }
        }
        return(full);
    }


    function checkArray(array) {
        if(!(array[0] === "X" || array[0] === "O")) return(false);

        let match = true;
        for(let i=0; i<array.length; i++) {
            if(!(array[i] === array[0])) {
                match = false;
                break;
            }
        }

        return(match);
    }

    function setupEventListeners() {
        const cellArray = document.querySelectorAll(".square");
        for(let i=0; i<cellArray.length; i++) {
            cellArray[i].addEventListener('click', () => {
                console.log("event listener triggered");
                let location = cellArray[i].getAttribute("data-attribute");
                if(checkCell(location)) {
                    console.log(gameboard);
                    console.log(lastPlayed);
                    if(lastPlayed == "O") {
                        console.log("O path");
                        playerOne.playTurn(location);
                        displayBoard();
                        lastPlayed = "X";
                    } else {
                        console.log("X path");
                        playerTwo.playTurn(location);
                        GameBoard.displayBoard();
                        lastPlayed = "O";
                    }
                    console.log(gameboard);
                }
            });
        }

        let returnButton = document.querySelector("#restart-button");
        returnButton.addEventListener('click', () => {
            console.log("click");
            gameboard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
            console.log(gameboard)
            displayBoard();
        });
    }

    return { gameboard, displayBoard, checkCell, checkWin, checkTie, checkArray, setupEventListeners };
})();

const GameController = (() => {

    function playGame() {
        playerOne = playerFactory("One", "X");
        playerTwo = playerFactory("Two", "O");
        GameBoard.displayBoard();
        GameBoard.setupEventListeners(playerOne, playerTwo);
    }

    function initializeClickEvents(playerOne, playerTwo) {
        let squareArr = document.querySelectorAll(".square");
        for(let i=0; i<squareArr.length; i++) {
            squareArr[i].addEventListener('click', () => {
                let location = squareArr[i].getAttribute("data-attribute");
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

        let returnButton = document.querySelector("#restart-button");
        returnButton.addEventListener('click', () => {
            console.log("click");
            console.log(GameBoard.gameboard);
            GameBoard.gameboard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
            console.log(GameBoard.gameboard);
            GameBoard.displayBoard();
        });
    }

    function checkGameOver() {
        if(GameBoard.checkWin()) {
            console.log("Win!");
        } else if(GameBoard.checkTie()) {
            console.log("Tie.");
        }
    }

    

    return { playGame, initializeClickEvents, checkGameOver };
})();


GameController.playGame();

