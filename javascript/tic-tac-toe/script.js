
const EMPTY = ""

function Cell() {
    let value = EMPTY
    const setValue = (player) => {value = player}
    const getValue = () => value
    const isEmpty = () => value === EMPTY
    return {setValue, getValue, isEmpty}
}

function Gameboard() {
    const board = [[Cell(), Cell(), Cell()],[Cell(), Cell(), Cell()],[Cell(), Cell(), Cell()]]
    const getBoard = () => board
    const getEmptySpots = () => {
        const ret = []
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j].isEmpty()) {
                    ret.push({x:i, y:j})
                }
            }
        }
        return ret
    }
    const setValue = (x,y,player) => {
        board[y][x].setValue(player)
    } 
    const printBoard = () => {
        const boardWithValues = board.map((row) =>
            row.map((cell) => cell.getValue())
        )
        console.log(boardWithValues)
    }
    const isEmpty = (x,y) => {
        return board[y][x].isEmpty()
    }
    const trioIsSame = (trio) => {
        return !trio[0].isEmpty() && trio[0].getValue() === trio[1].getValue() && trio[0].getValue() === trio[2].getValue()
    }
    const checkForWin = () => {
        for (let i = 0; i < 3; i++) {
            let trio = [board[0][i], board[1][i], board[2][i]]
            if (trioIsSame(trio)) return true
            trio =[board[i][0], board[i][1], board[i][2]]
            if (trioIsSame(trio)) return true
        }
        let trio = [board[0][0], board[1][1], board[2][2]]
        if (trioIsSame(trio)) return true
        trio = [board[0][0], board[1][1], board[2][2]]
        if (trioIsSame(trio)) return true
        return false
    }
    const reset = () => {
        for (row of board) {
            for (cell of row) {
                cell.setValue(EMPTY)
            }
        }
    }
    return {getBoard, setValue, printBoard, isEmpty, getEmptySpots, checkForWin, reset}
}

function GameController(player1name="Player 1",player2name="Player 2") {
    const board = Gameboard()
    const players = [{name:player1name,value:"X",ai:false},{name:player2name,value:"O",ai:false}]
    let activePlayer = players[0]
    const switchTurn = () => {activePlayer = activePlayer === players[0] ? players[1] : players[0]}
    const getActivePlayer = () => activePlayer
    const setPlayerAI = (player_number, is_ai) => {
        players[player_number].ai = is_ai
        console.log(players)
    } 
    const printNewRound = () => {
        board.printBoard()
        console.log(`${getActivePlayer().name}'s turn`)
    }
    const placePiece = (x,y) => {
        if (!board.checkForWin() && board.isEmpty(x,y)) {
            console.log(`${getActivePlayer().name} places at ${x}, ${y}`)
            board.setValue(x,y,activePlayer.value)
            return true
        }
        return false
    }
    const makeAIMove = () => {
        const coords = board.getEmptySpots()
        const choice = coords[Math.floor(Math.random() * coords.length)]

    }
    const reset = () => {board.reset()}

    const playRound = (x,y) => {
        if (placePiece(x,y)) {
            if (board.checkForWin()) {
                return true
            }
            switchTurn()
            printNewRound()
            if (activePlayer.ai) {
                makeAIMove()
                switchTurn()
            } 
        }
        
    }
    return {playRound,setPlayerAI,getActivePlayer,reset,getBoard:board.getBoard}
}

function ScreenController() {
    const game = GameController()
    const messageDiv = document.getElementById("message")
    const boardDiv = document.getElementById("board")
    const player1Div = document.getElementById("div_player1")
    const player2Div = document.getElementById("div_player2")

    const updateScreen = () => {
        boardDiv.textContent = ""
        const board = game.getBoard()
        const activePlayer = game.getActivePlayer()
        messageDiv.textContent = `${activePlayer.name}'s turn`

        board.forEach((row, i) => {
            const rowDiv = document.createElement("div")
            rowDiv.classList.add("row")
            row.forEach((cell, j) => {
                const cellButton = document.createElement("button")
                cellButton.classList.add("cell")
                cellButton.dataset.x = j
                cellButton.dataset.y = i
                cellButton.textContent = cell.getValue()
                rowDiv.appendChild(cellButton)
            })
            boardDiv.appendChild(rowDiv)
        })
    }


    function handlePlayerButton(e) {

    }

    const generateButtons = () => {
        const playGameButton = document.getElementById("play_game")
        playGameButton.addEventListener("click", () => {game.reset(); updateScreen();})
        const playerDivs = [player1Div, player2Div]
        for (let i = 0; i < 2; i++) {
            const rowDiv = document.createElement("div")
            rowDiv.classList.add("row")
            const button1 = document.createElement("button")
            button1.textContent = "Human"
            const button2 = document.createElement("button")
            button2.textContent = "AI"
            button1.addEventListener("click", game.setPlayerAI(i, false))
            button2.addEventListener("click", game.setPlayerAI(i, true))
            rowDiv.appendChild(button1)
            rowDiv.appendChild(button2)
            playerDivs[i].appendChild(rowDiv)
        }
    }
    
    


    function clickHandlerBoard(e) {
        const selectedSquare = {x:e.target.dataset.x, y:e.target.dataset.y}
        if (!selectedSquare) return
        console.log(selectedSquare)
        game.playRound(selectedSquare.x, selectedSquare.y)
        updateScreen()
    }
    boardDiv.addEventListener("click", clickHandlerBoard)
    generateButtons()
    updateScreen()
}

ScreenController()