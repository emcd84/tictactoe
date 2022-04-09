const playerFactory = (name, x) => {

    function playTurn(location) {
        GameBoard.editCell(location, x);
        GameController.winOccurs(GameController.checkWinOrTie(GameBoard.gameboard));
    }

    return { name, x, playTurn };
}

const GameBoard = (() => {
    let gameboard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    let lastPlayed = "O";

    function populateBoard() {
        const squares = document.querySelectorAll(".square");
        for(let i=0; i<squares.length; i++) {
            squares[i].textContent = GameBoard.gameboard[i];
        }
    }

    function setBoard(array) {
        gameboard = array;
        populateBoard();
    }

    function editCell(location, value) {
        GameBoard.gameboard[location] = value;
    }

    function resetBoard() {
        GameBoard.gameboard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        GameBoard.lastPlayed = "O";
        populateBoard();
    }

    function checkCell(location) {
        if(GameBoard.gameboard[location] === " ") {
            return(true);
        } else {
            return(false);
        }
    }

    function setupEventListeners(playerOne, playerTwo) {
        const cellArray = document.querySelectorAll(".square");
        for(let i=0; i<cellArray.length; i++) {
            cellArray[i].addEventListener('click', () => {
                if(GameController.gameActive === true) {
                    let location = cellArray[i].getAttribute("data-attribute");
                    if(checkCell(location)) {
                        if(GameBoard.lastPlayed == "O") {
                            playerOne.playTurn(location);
                            populateBoard();
                            GameBoard.lastPlayed = "X";
                        } else {
                            playerTwo.playTurn(location);
                            populateBoard();
                            GameBoard.lastPlayed = "O";
                        }
                    }
                }
            });
        }
    }

    return { gameboard, lastPlayed, populateBoard, setBoard, editCell, resetBoard, checkCell, setupEventListeners };
})();

const GameController = (() => {
    let gameActive = true;

    function playGame() {
        playerOne = playerFactory("Player One", "X");
        playerTwo = playerFactory("Player Two", "O");

        GameBoard.setupEventListeners(playerOne, playerTwo);
        setupResetButton();
        GameBoard.populateBoard();
        //GameBoard.setBoard([" ", " ", " ", " ", " ", " ", " ", " ", " "]);
    }

    function toggleGameActive() {
        if(gameActive) {
            gameActive = false;
        } else {
            gameActive = true;
        }
    }

    function setupResetButton() {
        const resetButton = document.querySelector("#restart-button");
        resetButton.addEventListener('click', () => {
            GameBoard.resetBoard();
            GameController.gameActive = true;

            const body = document.querySelector("body");
            const winnerDisplay = document.querySelector(".winner-display");
            
            body.removeChild(winnerDisplay);
        });

    }

    function checkTie(gameboard) {
        let full = true;
        for(let i=0; i<gameboard.length; i++) {
            if(!(gameboard[i] === "X" || gameboard[i] === "O")) {
                full = false;
                break;
            }
        }
        return(full);
    }


    function checkWinOrTie(gameboard) {
        if(gameboard[0] === "X" & gameboard[1] === "X" & gameboard[2] === "X") {
            return "X";
        } else if(gameboard[3] === "X" & gameboard[4] === "X" & gameboard[5] === "X") {
            return "X";
        } else if(gameboard[6] === "X" & gameboard[7] === "X" & gameboard[8] === "X") {
            return "X";
        } else if(gameboard[0] === "X" & gameboard[4] === "X" & gameboard[8] === "X") {
            return "X";
        } else if(gameboard[2] === "X" & gameboard[4] === "X" & gameboard[6] === "X") {
            return "X";
        } else if(gameboard[0] === "X" & gameboard[4] === "X" & gameboard[8] === "X") {
            return "X";
        } else if(gameboard[0] === "X" & gameboard[3] === "X" & gameboard[6] === "X") {
            return "X";
        } else if(gameboard[1] === "X" & gameboard[4] === "X" & gameboard[7] === "X") {
            return "X";
        } else if(gameboard[2] === "X" & gameboard[5] === "X" & gameboard[8] === "X") {
            return "X";
        } else if(gameboard[0] === "O" & gameboard[1] === "O" & gameboard[2] === "O") {
            return "O";
        } else if(gameboard[3] === "O" & gameboard[4] === "O" & gameboard[5] === "O") {
            return "O";
        } else if(gameboard[6] === "O" & gameboard[7] === "O" & gameboard[8] === "O") {
            return "O";
        } else if(gameboard[0] === "O" & gameboard[4] === "O" & gameboard[8] === "O") {
            return "O";
        } else if(gameboard[2] === "O" & gameboard[4] === "O" & gameboard[6] === "O") {
            return "O";
        } else if(gameboard[0] === "O" & gameboard[4] === "O" & gameboard[8] === "O") {
            return "O";
        } else if(gameboard[0] === "O" & gameboard[3] === "O" & gameboard[6] === "O") {
            return "O";
        } else if(gameboard[1] === "O" & gameboard[4] === "O" & gameboard[7] === "O") {
            return "O";
        } else if(gameboard[2] === "O" & gameboard[5] === "O" & gameboard[8] === "O") {
            return "O";
        } else if(checkTie(gameboard)) {
            return "Tie";
        }
    }

    function winOccurs(winner) {
        if(winner === "X" || winner === "O" || winner === "Tie") {     
            GameController.gameActive = false;       
            const body = document.querySelector("body");

            const winnerDisplayDiv = document.createElement('div');
            winnerDisplayDiv.classList.add("winner-display");

            const textDiv = document.createElement('text');
            textDiv.classList.add("winner-text");

            const message = document.createElement('h3');
            const submessage = document.createElement('h3');
            
            const nameFormOne = document.querySelector("#name_one");
            const nameFormTwo = document.querySelector("#name_two");
            let nameOne = nameFormOne.value;
            let nameTwo = nameFormTwo.value;
            if(nameOne === "") nameOne = "Player One";
            if(nameTwo === "") nameTwo = "Player Two";

            if(winner === "X") {
                message.textContent = nameOne + " is the winner!";
                submessage.textContent = "Suck it, " + nameTwo + "!";
            } else if(winner === "O") {
                message.textContent = nameTwo + " is the winner!";
                submessage.textContent = "Suck it, " + nameOne + "!";
            } else if(winner === "Tie") {
                message.textContent = "Tie.";
                submessage.textContent = "You'll have to play again!";
            }

            textDiv.appendChild(message);
            textDiv.appendChild(submessage);
            winnerDisplayDiv.appendChild(textDiv);

            body.appendChild(winnerDisplayDiv);
        }
    }

    return { playGame, setupResetButton, checkTie, checkWinOrTie, winOccurs, gameActive, toggleGameActive };
})();

GameController.playGame();