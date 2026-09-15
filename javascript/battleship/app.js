import {Player} from "./player.js"
import {COLOR_DICT, SIZE_DICT, NOTHING, MISS, HIT, SHIP1, SHIP2, SHIP3, SHIP4, SHIP5, NAME_DICT} from "./constants.js"
let grabbed_cell = 0
const CELL_WIDTH = 50



function playerButtonClick(button, player) {
    if (player.isHuman) {
        player.isHuman = false
        button.textContent = "AI"
        button.style.backgroundColor="blue"
        button.style.color="white"
    } else {
        player.isHuman = true
        button.textContent = "Human"
        button.style.backgroundColor="white"
        button.style.color="black"
    }
}

function cellButtonClick(i, cell, enemyPlayer) {
    if (![GSD.player1PlacingShips, GSD.player1PlacingShots, GSD.player2PlacingShips, GSD.player2PlacingShots].includes(gameState)) {
        return
    }
    const player = enemyPlayer === player1 ? player2 : player1
    if ([GSD.player1PlacingShots, GSD.player2PlacingShots].includes(gameState)) {
        enemyPlayer.attemptShot(i, player.getNumberShotsPossible())
    } else if ([GSD.player1PlacingShips, GSD.player2PlacingShips].includes(gameState)) {

    }

    
    drawByState()
}



function fireButtonClick() {
    if (gameState === GSD.player1PlacingShots) {
        const fire_response = player2.fire()
        for (const ship of fire_response) {
            if (ship !== undefined) {
                add_to_log(`Player 2's ${NAME_DICT[ship]} has been sunk.`)
            }
        }
    }
    else if (gameState === GSD.player2PlacingShots) {
        const fire_response = player1.fire()
        for (const ship of fire_response) {
            if (ship !== undefined) {
                add_to_log(`Player 1's ${NAME_DICT[ship]} has been sunk.`)
            }
        }
    } else if (gameState === GSD.player1PlacingShips) {
        player1.undo_ship()
        ship_num -= 1
        drawShipGrid(shipVertDiv, get_current_ship_color())
        drawShipGrid(shipHorDiv, get_current_ship_color())
    } else if (gameState === GSD.player2PlacingShips) {
        player2.undo_ship()
        ship_num -= 1
        drawShipGrid(shipVertDiv, get_current_ship_color())
        drawShipGrid(shipHorDiv, get_current_ship_color())
    }
    
    drawByState()
    handleStateChange()
}

function drawShipGrid(parentDiv, ship_id) {
    parentDiv.replaceChildren()
    console.log("DRAW SHIP GRID", ship_num, ship_id)
    for (let i = 0; i < SIZE_DICT[ship_id]; i++) {
        const cell = document.createElement("div")
        cell.classList.add("grid-item")
        console.log(COLOR_DICT[ship_id])
        cell.style.backgroundColor = COLOR_DICT[ship_id]
        parentDiv.appendChild(cell)
    }

}

function calculateGridCells(i, obj) {
    let arr = []
    if (obj.x == 1) {
        for (let j = 0; j < obj.y; j++) {
            const cell_num = i - 10*obj.offsetY + 10*j
            if (cell_num < 100 && cell_num >= 0) {
                arr.push(cell_num)
            }
        }
    } else if (obj.y == 1) {
        let we_got_zero_mod = false
        for (let j = 0; j < obj.x; j++) {
            const cell_num = i - 1*obj.offsetX + 1*j
            if (cell_num % 10 === 0 && j != 0) {we_got_zero_mod = true}
            if (cell_num < 100 && cell_num >= 0 && !we_got_zero_mod) {
                arr.push(cell_num)
            }
        }
    }
    return arr
}

function drawGrid(parentDiv, player, isHidden, is_placing=false) {
    parentDiv.replaceChildren()
    const cells = []
    for (let i = 0; i < 100; i++) {
        const cellValue = player.getCellValue(i)
        const cellSelected = player.getSelected(i)
        const cell = document.createElement("div")
        cells.push(cell)
        cell.classList.add("grid-item")
        cell.style.backgroundColor = (isHidden && ![MISS, HIT].includes(cellValue)) ? COLOR_DICT["hidden"] : COLOR_DICT[cellValue]
        if (is_placing) {
            cell.addEventListener('dragover', (e) => {
                e.preventDefault();
                const obj = JSON.parse(e.dataTransfer.getData('application/json'));
                const cell_index_array = calculateGridCells(i, obj, cells)
                let invalid = cell_index_array.length !== Math.max(obj.x, obj.y)
                for (const c of cell_index_array) {
                    if (player.getCellValue(c) !== NOTHING) {
                        invalid = true
                        break
                    }
                }
                for (const c of cell_index_array) {
                    if (invalid) {cells[c].classList.add("dragover-invalid")}
                    else {cells[c].classList.add("dragover")}
                }
                
            })
            cell.addEventListener('dragleave', (e) => {
                e.preventDefault();
                const obj = JSON.parse(e.dataTransfer.getData('application/json'));
                const cell_index_array = calculateGridCells(i, obj, cells)
                for (const c of cell_index_array) {
                    cells[c].classList.remove("dragover")
                    cells[c].classList.remove("dragover-invalid")
                }
            })
            cell.addEventListener('drop', (e) => {
                e.preventDefault();
                const obj = JSON.parse(e.dataTransfer.getData('application/json'));
                const cell_index_array = calculateGridCells(i, obj, cells)
                for (const c of cell_index_array) {
                    cells[c].classList.remove("dragover")
                    cells[c].classList.remove("dragover-invalid")
                }
                if ((i + obj.x - 1 - obj.offsetX) < 100 && (i + 10*obj.y - 10* obj.offsetY - 10) < 100) {
                    if (obj.x === 1) {
                        // I have to figure out which squares in the grid need to be changed
                        for (let j = i - 10*obj.offsetY; j <= (i + 10*obj.y - 10* obj.offsetY - 10); j += 10) {
                            if (player.getCellValue(j) != NOTHING) {
                                return
                            }
                        } 
                        player.place_ship(i - 10*obj.offsetY, i + 10*obj.y - 10* obj.offsetY - 10)
                        drawGrid(parentDiv, player, isHidden, is_placing) 
                        handle_valid_ship_placement()
                    } else if (obj.y === 1) {
                        const cell_index_array = calculateGridCells(i, obj, cells)
                        let invalid = cell_index_array.length !== Math.max(obj.x, obj.y)
                        for (const c of cell_index_array) {
                            if (player.getCellValue(c) !== NOTHING) {
                                invalid = true
                                break
                            }
                        }
                        if (!invalid) {
                            player.place_ship(i - obj.offsetX, i + obj.x - 1 - obj.offsetX)
                            drawGrid(parentDiv, player, isHidden, is_placing) 
                            handle_valid_ship_placement()
                        }
                    }
                    
                    
                }
            })
        }
        cell.style.borderColor = cellSelected ? "white" : "black"

        // check if hidden
        
        if (isHidden) {
            cell.addEventListener("click", () => cellButtonClick(i, cell, player))
        }
        
        parentDiv.appendChild(cell)
    }
}

function drawFireButton(textContent, isHidden) {
    const button = fireButton
    button.textContent = textContent
    let player
    let enemyPlayer
    button.style.visibility = !isHidden ? "visible" : "hidden"
    if (gameState === GSD.player1PlacingShots) {
        enemyPlayer = player1
        player = player2
    } else if (gameState === GSD.player2PlacingShots) {
        enemyPlayer = player2
        player = player1
    }
    if ([GSD.player1PlacingShots, GSD.player2PlacingShots].includes(gameState)) {
        if (player.getNumberSelectedShots() == enemyPlayer.getNumberShotsPossible()) {
            button.disabled = false
            button.style.backgroundColor = "red"
        } else {
            button.disabled = true
            button.style.backgroundColor = "white"
        }
    } else if ([GSD.passToPlayer1, GSD.passToPlayer2].includes(gameState)) {
        button.disabled = false
    } else if ([GSD.player1PlacingShips, GSD.player2PlacingShips].includes(gameState)) {
        button.disabled = ship_num === 0
    }
}

function handle_valid_ship_placement() {
    ship_num += 1
    console.log("SHIP NUM", ship_num, gameState)
    if (ship_num >= 5) {
        if (gameState === GSD.player1PlacingShips) {
            ship_num = 0
            console.log("SHIP NUM SET TO 0")
            gameState = GSD.passToPlayer2
        } else {
            gameState = GSD.passToPlayer1
        }
    }
    handleStateChange()
}

function resetBoards() {
    player1.reset()
    player2.reset()
}

function handle_ai_player(current_player) {
    console.log("HANDLE AI", gameState)
    const enemy_player = player1 === current_player ? player2 : player1;
    switch (gameState) {
        case GSD.player1PlacingShips:
            console.log("AI SHIP")
            current_player.ai_place_ships()
            gameState = GSD.player2PlacingShips
            ship_num = 5
            break;
        case GSD.player2PlacingShips:
            current_player.ai_place_ships()
            gameState = GSD.player1PlacingShots
            ship_num = 5
            handleStateChange()
            break;
        case GSD.player1PlacingShots:
            console.log(enemy_player.board)
            current_player.ai_place_shots(enemy_player)
            break;
        case GSD.player2PlacingShots:
            current_player.ai_place_shots(enemy_player)

            break;
    }
    
}

function handleStateChange() {
    console.log("HANDLE STATE CHANGE" + gameState, player1.isHuman)
    
    switch (gameState) {
        case GSD.waitingToStart:
            ship_num = 0;
            gameState = GSD.player1PlacingShips;
            if (!player1.isHuman) {handleStateChange()}
            break;
        case GSD.player1PlacingShips:
            if (!player1.isHuman) {handle_ai_player(player1)}
            console.log(player1.ship_coords, player1.ship_coords.length)
            if (player1.ship_coords.length === 5 && !player2.isHuman) {
                handle_ai_player(player2)
            }
            break;
        case GSD.player2PlacingShips:
            if (!player2.isHuman) {handle_ai_player(player2)}
            break;
        case GSD.player1PlacingShots:
            console.log("p1PS player 1 AI should go", !player1.isHuman)
            if (player2.allIsSunk()) {
                gameState = GSD.gameOver
                winner = "Player 1"
            } else {
                console.log("p1PS player 1 AI should go", !player1.isHuman)
                if (!player1.isHuman) {handle_ai_player(player1)}
                gameState = GSD.passToPlayer2
            }
            break;
        case GSD.player2PlacingShots:
            // if game over go to gameover
            if (player1.allIsSunk()) {
                gameState = GSD.gameOver
                winner = "Player 2"
            } else {
                gameState = GSD.passToPlayer1
                if (!player2.isHuman) {handle_ai_player(player2)}
            }
            break;
        case GSD.gameOver:
            console.log("GAME IS OVER")
            gameState = GSD.waitingToStart
            resetBoards()
            break;
        case GSD.passToPlayer1:
            if (ship_num >= 5) {
                gameState = GSD.player1PlacingShots
                console.log("1 place shots")
                if (!player1.isHuman) {handle_ai_player(player1)}
            } else {
                ship_num = 0
                gameState = GSD.player1PlacingShips
                console.log("1 place ships")
            }
            break;
        case GSD.passToPlayer2:
            if (ship_num >= 5) {
                gameState = GSD.player2PlacingShots
                console.log("2 place shots", ship_num)
                if (!player2.isHuman) {handle_ai_player(player2)}
            } else {
                ship_num = 0
                gameState = GSD.player2PlacingShips
                console.log("2 place ships", ship_num)
            }
            break;
    }
    drawByState()
    console.log("HANDLE STATE CHANGE DONE", gameState)
}

function set_p(text) {
    const p = document.getElementById("winner")
    p.textContent = text
    console.log(text)
}
function clear_log() {log.innerText = ""}
function add_to_log(text) {
    console.log("A2L", text)
    if (log.innerText == "") {log.innerText = text} 
    else {log.innerText += "\n" + text} 
}

function get_current_ship_size() {
    console.log("SIZE", ship_num)
    switch (ship_num) {
        case 0: return 5
        case 1: return 4
        case 2: return 3
        case 3: return 3
        case 4: return 2
        default: return 0
    }
}

function get_current_ship_color() {
    switch(ship_num) {
        case 0: return SHIP1
        case 1: return SHIP2
        case 2: return SHIP3
        case 3: return SHIP4
        case 4: return SHIP5
        default: return NOTHING
    }
}

function drawByState() {
    const hidden = true
    drawFireButton("", hidden)
    shipVertDiv.style.visibility = 'hidden'
    shipHorDiv.style.visibility = 'hidden'
    player1HumanButton.disabled = true
    player2HumanButton.disabled = true
    switch (gameState) {
        case GSD.waitingToStart:
            clear_log()
            startGameBtn.disabled = false
            startGameBtn.textContent = "Start Game"
            player1HumanButton.disabled = false
            player2HumanButton.disabled = false
            drawGrid(player1Div, player1, !hidden)
            drawGrid(player2Div, player2, !hidden)
            set_p("Start the Game!")
            break;
        case GSD.player1PlacingShips:
            startGameBtn.disabled = true
            drawGrid(player1Div, player1, !hidden, true)
            drawGrid(player2Div, player2, !hidden) //CHANGE to hidden
            drawFireButton("Undo Placement", !hidden)
            shipVertDiv.style.visibility = 'visible'
            shipHorDiv.style.visibility = 'visible'
            drawShipGrid(shipVertDiv, get_current_ship_color())
            drawShipGrid(shipHorDiv, get_current_ship_color())
            set_p("Player 1, place your ships!")
            break;
        case GSD.player2PlacingShips:
            startGameBtn.disabled = true
            drawGrid(player1Div, player1, !hidden) //CHANGE to hidden
            drawGrid(player2Div, player2, !hidden,true)
            drawFireButton("Undo Placement", !hidden)
            shipVertDiv.style.visibility = 'visible'
            shipHorDiv.style.visibility = 'visible'
            drawShipGrid(shipVertDiv, get_current_ship_color())
            drawShipGrid(shipHorDiv, get_current_ship_color())
            set_p("Player 2, place your ships!")
            break;
        case GSD.player1PlacingShots:
            startGameBtn.disabled = true
            drawGrid(player1Div, player1, !hidden)
            drawGrid(player2Div, player2, !hidden) //CHANGE to hidden
            drawFireButton("Fire", !hidden)
            set_p(`Player 1, place ${player1.getNumberShotsPossible()} shots`)
            break;
        case GSD.player2PlacingShots:
            startGameBtn.disabled = true
            drawGrid(player1Div, player1, !hidden) //CHANGE to hidden
            drawGrid(player2Div, player2, !hidden)
            drawFireButton("Fire", !hidden)
            set_p(`Player 2, place ${player2.getNumberShotsPossible()} shots`)
            break;
        case GSD.gameOver:
            startGameBtn.disabled = false
            startGameBtn.textContent = "Reset Game"
            console.log("WINNER WINNER")
            drawGrid(player1Div, player1, !hidden)
            drawGrid(player2Div, player2, !hidden)
            set_p(`${winner} is the winner!`)
            break;
        case GSD.passToPlayer1:
            startGameBtn.disabled = true
            drawFireButton("Pass to Player 1", !hidden)
            drawGrid(player1Div, player1, !hidden) //CHANGE to hidden
            drawGrid(player2Div, player2, !hidden) //CHANGE to hidden
            set_p("Player 2, pass to Player 1!")
            break;
        case GSD.passToPlayer2:
            startGameBtn.disabled = true
            drawFireButton("Pass to Player 2", !hidden)
            drawGrid(player1Div, player1, !hidden) //CHANGE to hidden
            drawGrid(player2Div, player2, !hidden) //CHANGE to hidden
            set_p("Player 1, pass to Player 2!")
            break;
    }   
}


const GSD = { // Game State Dict
    waitingToStart:0,
    player1PlacingShips:1,
    player2PlacingShips:2,
    player1PlacingShots:3,
    player2PlacingShots:4,
    gameOver:5,
    passToPlayer1:6,
    passToPlayer2:7,
}
let gameState = GSD["waitingToStart"]

const startGameBtn = document.getElementById("start-game-button")
startGameBtn.addEventListener("click", () => {
    handleStateChange() 
    drawByState()
})

let winner
let ship_num = 0
const player1 = new Player(1)
const player2 = new Player(2)

const player1HumanButton = document.getElementById("player1-human-button")
const player2HumanButton = document.getElementById("player2-human-button")
player1HumanButton.addEventListener("click", () => playerButtonClick(player1HumanButton, player1))
player2HumanButton.addEventListener("click", () => playerButtonClick(player2HumanButton, player2))

const fireButton = document.getElementById("fire-button")
fireButton.addEventListener("click", () => fireButtonClick())

const shipVertDiv = document.getElementById("ship1-v")
const shipHorDiv = document.getElementById("ship1-h")
shipVertDiv.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('application/json', JSON.stringify({
        id: e.target.id,
        x: 1,
        y: get_current_ship_size(),
        offsetX: Math.floor(e.offsetX / CELL_WIDTH),
        offsetY: Math.floor(e.offsetY / CELL_WIDTH)
    }))
    shipVertDiv.classList.add('dragging');
})
shipHorDiv.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('application/json', JSON.stringify({
        id: e.target.id,
        x: get_current_ship_size(),
        y: 1,
        offsetX: Math.floor(e.offsetX / CELL_WIDTH),
        offsetY: Math.floor(e.offsetY / CELL_WIDTH)
    }))
    shipHorDiv.classList.add('dragging');
})
shipVertDiv.addEventListener('dragend', (e) => {
    shipVertDiv.classList.remove('dragging');
})
shipHorDiv.addEventListener('dragend', (e) => {
    shipHorDiv.classList.remove('dragging');
})

const player1Div = document.getElementById("player1-grid")
const player2Div = document.getElementById("player2-grid")
const log = document.getElementById("log")
drawByState()
