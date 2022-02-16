function $(el) {
    return document.querySelector(el);
}
function $$(el) {
    return document.querySelectorAll(el);
}
var statusDisplay = $("[data-status]");
var gameActive = true;
var currentPlayer = "X";
var gameState = ["", "", "", "", "", "", "", "", ""];
var winningMsg = function () { return "Player ".concat(currentPlayer, " has won!"); };
var drawMsg = function () { return "Game ended in a draw"; };
var currentPlayerTurn = function () { return "It's ".concat(currentPlayer, "'s turn."); };
statusDisplay.innerHTML = currentPlayerTurn();
var winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function handleCellClick(ev) {
    var clickedCell = ev.target;
    var clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    if (currentPlayer === "X") {
        clickedCell.style.color = "pink";
        clickedCell.innerHTML = currentPlayer;
    }
    else {
        clickedCell.style.color = "cyan";
        clickedCell.innerHTML = currentPlayer;
    }
}
function handleResultValidation() {
    var roundWon = false;
    for (var i = 0; i < 8; i++) {
        var winCondition = winningConditions[i];
        var a = gameState[winCondition[0]];
        var b = gameState[winCondition[1]];
        var c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMsg();
        gameActive = false;
        return;
    }
    var roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMsg();
        gameActive = false;
        return;
    }
    handlePlayerChange();
}
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}
function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    $$(".cell").forEach(function (cell) { return cell.innerHTML = ""; });
}
$$(".cell").forEach(function (cell) { return cell.addEventListener("click", handleCellClick); });
$("[data-reset]").addEventListener("click", handleRestartGame);
