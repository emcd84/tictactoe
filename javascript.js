const playerFactory = (name, x) => {
    return {name, x, playTurn};

    function playTurn(location) {
        GameBoard.gameboard[location] = x;
        GameController.checkGameOver();
    }
}

const GameBoard = (() => {
    //const gameboard = new Array(9);
    const gameboard = ["X", "O", " ", "X", " ", "O", " ", " ", " "];

    function displayBoard() {
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

    return { gameboard, displayBoard, checkCell, checkWin, checkTie, checkArray };
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

