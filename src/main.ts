function $(el: string){
  return document.querySelector(el)
}
function $$(el: string){
  return document.querySelectorAll(el)
}

var statusDisplay = $("[data-status]")
let gameActive: boolean = true
type player = "X" | "O"
let currentPlayer: player = "X"
let gameState = ["", "", "", "", "", "", "", "", ""]
const winningMsg = () => `Player ${currentPlayer} has won!`
const drawMsg = () => `Game ended in a draw`
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn.`
statusDisplay.innerHTML = currentPlayerTurn()
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function handleCellClick(ev){
  const clickedCell = ev.target
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-index")
  )
  if (gameState[clickedCellIndex] !== "" || !gameActive){
    return
  }
  handleCellPlayed(clickedCell, clickedCellIndex)
  handleResultValidation()
}
function handleCellPlayed(clickedCell, clickedCellIndex){
  gameState[clickedCellIndex] = currentPlayer
  if (currentPlayer === "X") {
    clickedCell.style.color = "pink"
    clickedCell.innerHTML = currentPlayer
  } else {
    clickedCell.style.color = "cyan"
    clickedCell.innerHTML = currentPlayer
  }
}
function handleResultValidation(){
  let roundWon: boolean = false
  for(let i=0; i<8; i++){
    const winCondition = winningConditions[i]
    let a = gameState[winCondition[0]]
    let b = gameState[winCondition[1]]
    let c = gameState[winCondition[2]]
    if(a==='' || b==='' || c===''){
      continue
    }
    if(a===b && b===c){
      roundWon = true
      break
    }
  }
  if(roundWon){
    statusDisplay.innerHTML = winningMsg()
    gameActive = false
    return
  }
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMsg()
    gameActive = false
    return
  }
  handlePlayerChange()
}
function handlePlayerChange(){
  currentPlayer = currentPlayer === "X" ? "O" : "X"
  statusDisplay.innerHTML = currentPlayerTurn()
}
function handleRestartGame(){
  gameActive = true
  currentPlayer = 'X'
  gameState = ["", "", "", "", "", "", "", "", ""]
  statusDisplay.innerHTML = currentPlayerTurn()
  $$(".cell").forEach(
    cell => cell.innerHTML = ""
  )
}

$$(".cell").forEach(
  cell => cell.addEventListener("click", handleCellClick)
)
$("[data-reset]").addEventListener("click", handleRestartGame)