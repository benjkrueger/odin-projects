
const EMPTY = ""

function Cell() {
    let value = EMPTY
    const setValue = (player) => {value = player}
    const getValue = () => value
    const isEmpty = () => value === EMPTY
    return {setValue, getValue, isEmpty}
}

function Gameboard(new_board=[[Cell(), Cell(), Cell()],[Cell(), Cell(), Cell()],[Cell(), Cell(), Cell()]]) {
    const board = new_board
    const getBoard = () => board
    const copyBoard = () => {
        return Gameboard(board)
    }
    const getEmptySpots = () => {
        const ret = []
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[j][i].isEmpty()) {
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
            if (trioIsSame(trio)) return {"done":true, winner:board[0][i].getValue()}
            trio =[board[i][0], board[i][1], board[i][2]]
            if (trioIsSame(trio)) return {"done":true, winner:board[i][0].getValue()}
        }
        let trio = [board[0][0], board[1][1], board[2][2]]
        if (trioIsSame(trio)) return {"done":true, winner:board[0][0].getValue()}
        trio = [board[0][2], board[1][1], board[2][0]]
        if (trioIsSame(trio)) return {"done":true, winner:board[2][0].getValue()}
        let board_is_full = true
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j].isEmpty()) {board_is_full = false; break;}
            }
        }
        if (board_is_full) {
            return {"done":true, winner:"none"}
        }
        return {"done":false, winner:"none"}
    }
    const reset = () => {
        for (row of board) {
            for (cell of row) {
                cell.setValue(EMPTY)
            }
        }
    }
    const getUtility = (player_value) => {     
        const winner = checkForWin().winner
        if (winner === player_value) {return 100} 
        else if (winner === "none") {return 0} 
        else {return -100}
    }

    const getMinMaxMove = (player) => {
        coords = getEmptySpots()
        for (const coord of coords) {
            console.log(coord.x, coord.y)
            const test_board = copyBoard()
            test_board.setValue(coord.x, coord.y, player)
            console.log(test_board.getUtility(player))
        }
    } 

    return {getUtility, getMinMaxMove, getBoard, setValue, printBoard, isEmpty, getEmptySpots, checkForWin, reset}
}

function GameController(player1name="Player 1",player2name="Player 2") {
    const STATES = ["WAITING", "AI", "HUMAN"]
    const board = Gameboard()
    const players = [{name:player1name,value:"X",ai:false},{name:player2name,value:"O",ai:false}]
    let activePlayer = players[0]
    let state = STATES[0]
    let turn = 0

    const getState = () => {return state}

    const switchTurn = () => {
        turn++
        if (turn > 12) {
            state = "WAITING"; return;
        }
        console.log("SWITCH TURN", turn)
        
        const win = board.checkForWin()
        console.log(win)
        if (win.done) {state = "WAITING"; activeplayer = players[0]; return;}
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
        if (activePlayer.ai) {
            state = "AI"
            makeAIMove()
        } else if (!activePlayer.ai) {
            state = "HUMAN"
        }
    }
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
        if (!board.checkForWin().done && board.isEmpty(x,y)) {
            console.log(`${getActivePlayer().name} places at ${x}, ${y}`)
            board.setValue(x,y,activePlayer.value)
            return true
        }
        return false
    }

    const getRandomMove = () => {
        const coords = board.getEmptySpots()
        return coords[Math.floor(Math.random() * coords.length)]
    }

    const getMinmaxMove = () => {
        //https://blog.aaronccwong.com/2018/i-created-an-ai-that-beats-me-at-tic-tac-toe/
        const utility = board.getMinMaxMove(activePlayer.value)

    }

    const makeAIMove = () => {
        const coords = board.getEmptySpots()
        //getMinmaxMove()
        const choice = getRandomMove()
        placePiece(choice.x, choice.y)
        const win = board.checkForWin()
        if (win.done) {
            state = "WAITING"
            console.log("WIN", win)
            return true
        }
        switchTurn()
    }
    const reset = () => {
        turn = 0
        board.reset()
        state = activePlayer.ai ? "AI" : "HUMAN"
        console.log(state)
        if (state === "AI") {
            makeAIMove()
        }
    }

    const playRound = (x,y) => {
        if (state === "HUMAN") {
            if (placePiece(x,y)) {
                const win = board.checkForWin()
                console.log(win) 
                if (win.done) {
                    state = "WAITING"
                    console.log("WIN")
                    return true
                }
                switchTurn()
                printNewRound()
            }
        } 
        console.log(x,y,"Play Round", activePlayer)
    }

    const getWinString = () => {
        const win = board.checkForWin()
        if (!win.done) {
            return "Start the game already!"
        } else {
            if (win.winner === "none") {
                return "Cat's Game!"
            }
            return win.winner + " is the winner!"
        }
    }

    return {getWinString,getState,playRound,setPlayerAI,getActivePlayer,reset,getBoard:board.getBoard}
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
        const state = game.getState()
        console.log(state)
        if (state !== "WAITING") {
            messageDiv.textContent = `${activePlayer.name}'s turn`
        } else {
            messageDiv.textContent = `${game.getWinString()}`
        }
        


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
        playGameButton.addEventListener("click", () => {
            game.reset()
            updateScreen()
        })
        const playerDivs = [player1Div, player2Div]
        for (let i = 0; i < 2; i++) {
            const rowDiv = document.createElement("div")
            rowDiv.classList.add("row")
            const button1 = document.createElement("button")
            button1.textContent = "Human"
            const button2 = document.createElement("button")
            button2.textContent = "AI"
            button1.addEventListener("click", () => {
                game.setPlayerAI(i, false)
                button1.classList.add('active_button')
                button2.classList.remove('active_button')
            })
            button2.addEventListener("click", () => {
                game.setPlayerAI(i, true)
                button1.classList.remove('active_button')
                button2.classList.add('active_button')
            })
            button2.click()
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
    setInterval(updateScreen, 1000)
}

ScreenController()