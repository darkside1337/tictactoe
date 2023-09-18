// BOARD HANDLER :
const GameBoard = (() => {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];

  const renderBoard = () => {
    const board = document.querySelector("#board");
    // empty out the board
    board.innerHTML = "";
    //
    gameBoard.forEach((cell, index) => {
      const square = document.createElement("div");
      square.classList.add("card");
      square.setAttribute("id", `${index}`);
      // Display the content of each cell
      square.innerText = cell;
      board.appendChild(square);
    });
    const squares = document.querySelectorAll(".card");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };
  const update = (index, value) => {
    gameBoard[index] = value;
    renderBoard();
  };
  const getGameBoard = () => gameBoard;
  const renderResults = (message) => {
    const scoreBoard = document.querySelector(".displayResults");
    scoreBoard.innerText = message;
  };
  return {
    renderBoard,
    update,
    getGameBoard,
    renderResults,
  };
})();

/// GAME FLOW

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;
  const playerMaker = (name, marker) => {
    return {
      name,
      marker,
    };
  };
  // initiate game
  const start = () => {
    const playerOneName = document.querySelector("#playerOneName").value;
    const playerTwoName = document.querySelector("#playerTwoName").value;
    players = [
      playerMaker(playerOneName, "X"),
      playerMaker(playerTwoName, "O"),
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    GameBoard.renderBoard();
    const squares = document.querySelectorAll(".card");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };
  // check for win function:
  function checkForWin(board) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  }
  // check for a draw function:
  function checkForDraw(board) {
    return board.every((cell) => cell !== "");
  }

  // click handler that :
  const handleClick = (event) => {
    const target = event.target;
    if (gameOver) return;
    let index = target.id;
    console.log(index);
    // checks if square is already taken
    if (GameBoard.getGameBoard()[index] !== "") return;
    // updates the board with the appropriate marker
    GameBoard.update(index, players[currentPlayerIndex].marker);
    // checks for a winner
    if (checkForWin(GameBoard.getGameBoard())) {
      gameOver = true;
      console.log("x has won");
      GameBoard.renderResults(`${players[currentPlayerIndex].name} has won!`);
    }
    // checks for a draw
    if (checkForDraw(GameBoard.getGameBoard())) {
      gameOver = true;
      console.log("its a draw");
      GameBoard.renderResults("It's a draw");
    }
    // swaps players
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };
  function restart() {
    for (let i = 0; i < 9; i++) {
      GameBoard.update(i, "");
    }
    gameOver = false;
    GameBoard.renderResults("");
  }
  return {
    start,
    handleClick,
    restart,
  };
})();

// start button event handler:
const startButton = document.getElementById("start");
startButton.addEventListener("click", () => Game.start());
// restart button event handle
const restartButton = document.getElementById("restart");
restartButton.addEventListener("click", () => Game.restart());
