import { Gameboard } from "./board.js";
import { Player } from "./player.js";
import { COLOR_DICT, SIZE_DICT, HIT, MISS, SHIP1} from "./constants.js";

const CELL_WIDTH = 50
const MAX_SHIPS = 5
const MAX_SHOTS = 1
const BOARD_SIZE = 10
const BOARD_SIZE_SQUARED = BOARD_SIZE * BOARD_SIZE
const GSD = {
    setup:"setup",
    place:"place",
    shoot:"shoot",
    pass:"pass",
    end:"end",
}

const gameBtn = document.getElementById("game-button")
gameBtn.addEventListener("click", () => gameButtonClick())

const player1HumanButton = document.getElementById("player1-human-button")
player1HumanButton.addEventListener("click", () => humanButtonClick(player1HumanButton, player1))
const player2HumanButton = document.getElementById("player2-human-button")
player2HumanButton.addEventListener("click", () => humanButtonClick(player2HumanButton, player2))
function humanButtonClick(btn, player) {
    player.toggleHumanity()
    drawHumanButtons()
}

const shipVertDiv = document.getElementById("ship1-v")
shipVertDiv.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('application/json', JSON.stringify({
        id: e.target.id,
        x: 1,
        y: SIZE_DICT[get_current_ship_id()],
        offsetX: Math.floor(e.offsetX / CELL_WIDTH),
        offsetY: Math.floor(e.offsetY / CELL_WIDTH)
    }))
    shipVertDiv.classList.add('dragging');
})
shipVertDiv.addEventListener('dragend', (e) => {shipVertDiv.classList.remove('dragging');})
const shipHorDiv = document.getElementById("ship1-h")
shipHorDiv.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('application/json', JSON.stringify({
        id: e.target.id,
        x: SIZE_DICT[get_current_ship_id()],
        y: 1,
        offsetX: Math.floor(e.offsetX / CELL_WIDTH),
        offsetY: Math.floor(e.offsetY / CELL_WIDTH)
    }))
    shipHorDiv.classList.add('dragging');
})
shipHorDiv.addEventListener('dragend', (e) => {shipHorDiv.classList.remove('dragging');})

const player1Div = document.getElementById("player1-grid")
const player2Div = document.getElementById("player2-grid")
const message = document.getElementById("message")
const log = document.getElementById("log")

const player1 = new Player(1)
const player2 = new Player(2)
let winner
let activePlayer = player2
let enemyPlayer = player1
let state = GSD.setup

function switchActivePlayer() {
    activePlayer = activePlayer === player1 ? player2 : player1
    enemyPlayer = enemyPlayer === player1 ? player2 : player1
}

function gameButtonClick() {
    switch (state) {
        case GSD.setup:
            //TODO CHANGE THIS
            testSetComputer()
            state = GSD.place
            //testPlaceShips()
            //testPlaceShots()
            //state = GSD.shoot
            switchActivePlayer()
            break;
        case GSD.place:
            if (activePlayer.getNumShips() === MAX_SHIPS) {
                state = GSD.pass
                switchActivePlayer()
            } else {
                activePlayer.undoPlacement()
            }
            break;
        case GSD.shoot:
            state = GSD.pass
            const response = enemyPlayer.handleFire()
            enemyPlayer.clearSelected()
            if (enemyPlayer.allShipsSunk()) {
                winner = activePlayer
                state = GSD.end
            }
            switchActivePlayer()
            break;
        case GSD.pass:
            if (activePlayer.getNumShips() === 0) {state = GSD.place}
            else {state = GSD.shoot}
            break;
        case GSD.end:
            state = GSD.setup
            player1.reset()
            player2.reset()
            break;
    }
    runAI()
    draw()
}



/*
█████ █████  ████ █████ ███ █   █  ███  
  █   █     █       █    █  ██  █ █     
  █   ████   ███    █    █  █ █ █ █  ██ 
  █   █         █   █    █  █  ██ █   █ 
  █   █████ ████    █   ███ █   █  ███  
*/
//#region

function testSetComputer() {
    player1HumanButton.click()
    player2HumanButton.click()
}

function testPlaceShips() {
    player1.board.placeShipI(0,4)
    player1.board.placeShipI(10,13)
    player1.board.placeShipI(20,22)
    player1.board.placeShipI(30,32)
    player1.board.placeShipI(40,41)
    player2.board.placeShipI(0,4)
    player2.board.placeShipI(10,13)
    player2.board.placeShipI(20,22)
    player2.board.placeShipI(30,32)
    player2.board.placeShipI(40,41) 
}

function testPlaceShots() {
    player2.board.receiveAttack([0,0])
    player2.board.receiveAttack([1,0])
    player2.board.receiveAttack([2,0])
    player2.board.receiveAttack([3,0])
    player2.board.receiveAttack([4,0])
    player2.board.receiveAttack([0,1])
    player2.board.receiveAttack([1,1])
    player2.board.receiveAttack([2,1])
    player2.board.receiveAttack([3,1])
    player2.board.receiveAttack([0,2])
    player2.board.receiveAttack([1,2])
    player2.board.receiveAttack([2,2])
    player2.board.receiveAttack([0,3])
    player2.board.receiveAttack([1,3])
    player2.board.receiveAttack([2,3])
    player2.board.receiveAttack([1,4])
}
//#endregion
/*
 ███  ███ 
█   █  █  
█████  █  
█   █  █  
█   █ ███ 
*/
//#region
function runAI() {
    console.log("runAI", state)
    const DELAY = 100
    if (activePlayer.isHuman) {return}
    switch (state) {
        case GSD.setup:
            break;
        case GSD.place:
            aiPlaceShips()
            setTimeout(gameButtonClick, DELAY)
            break;
        case GSD.shoot:
            aiPlaceShots()
            setTimeout(gameButtonClick, DELAY)
            break;
        case GSD.pass:
            gameButtonClick()
            break;
        case GSD.end:
            break;
    }
}

function aiPlaceShips() {
    while (activePlayer.getNumShips() < MAX_SHIPS) {
        const ship_id = get_current_ship_id()
        const length = SIZE_DICT[ship_id]
        const is_vertical = Math.random() < 0.5
        let x1, y1, x2, y2
        if (is_vertical) {
            x1 = randomInt(BOARD_SIZE)
            y1 = randomInt(BOARD_SIZE - length)
            x2 = x1
            y2 = y1 + length - 1

        } else {
            x1 = randomInt(BOARD_SIZE - length)
            y1 = randomInt(BOARD_SIZE)
            x2 =x1 + length - 1
            y2 = y1
        }
        activePlayer.placeShip([x1, y1], [x2, y2])
    }
}
function aiPlaceShots() {
    const board = enemyPlayer.board
    while (board.getNumSelected() < MAX_SHOTS) {
        const i = randomInt(BOARD_SIZE_SQUARED)
        console.log(board.receiveSelectI(i, MAX_SHOTS), board.coords_attacked)
    }
    board.handleFire()
}

//#endregion
/*
█   █ █████ █     ████  █████ ████   ████ 
█   █ █     █     █   █ █     █   █ █     
█████ ████  █     ████  ████  ████   ███  
█   █ █     █     █     █     █  █      █ 
█   █ █████ █████ █     █████ █   █ ████  
*/
//#region

function randomInt(top_value) {
    return Math.floor(Math.random() * top_value)
}

function calculateGridCells(i, obj) {
    let arr = []
    if (obj.x == 1) {
        for (let j = 0; j < obj.y; j++) {
            const cell_num = i - BOARD_SIZE*obj.offsetY + BOARD_SIZE*j
            if (cell_num < BOARD_SIZE_SQUARED && cell_num >= 0) {
                arr.push(cell_num)
            }
        }
    } else if (obj.y == 1) {
        const row = Math.floor(i / BOARD_SIZE)
        for (let j = 0; j < obj.x; j++) {
            const cell_num = i - 1*obj.offsetX + 1*j
            if (Math.floor(cell_num / BOARD_SIZE) === row) {arr.push(cell_num)}
        }
    }
    return arr
}

function handleGridDragover(e, i, cells, board) {
    e.preventDefault();
    const obj = JSON.parse(e.dataTransfer.getData('application/json'));
    const cell_index_array = calculateGridCells(i, obj, cells)
    let invalid = cell_index_array.length !== Math.max(obj.x, obj.y)
    for (const c of cell_index_array) {
        if (!board.isEmptyI(i)) {
            invalid = true
            break
        }
    }
    for (const c of cell_index_array) {
        if (invalid) {cells[c].classList.add("dragover-invalid")}
        else {cells[c].classList.add("dragover")}
    }
}

function handleGridDragleave(e, i, cells) {
    e.preventDefault();
    const obj = JSON.parse(e.dataTransfer.getData('application/json'));
    const cell_index_array = calculateGridCells(i, obj, cells)
    for (const c of cell_index_array) {
        cells[c].classList.remove("dragover")
        cells[c].classList.remove("dragover-invalid")
    }
}

function handleGridDrop(e, i, cells, board) {
    e.preventDefault();
    const obj = JSON.parse(e.dataTransfer.getData('application/json'));
    const cell_index_array = calculateGridCells(i, obj, cells)
    for (const c of cell_index_array) {
        cells[c].classList.remove("dragover")
        cells[c].classList.remove("dragover-invalid")
    }
    const start_x = i - obj.offsetX
    const start_y = i - BOARD_SIZE*obj.offsetY
    const end_x = i + obj.x - 1 - obj.offsetX
    const end_y = i + BOARD_SIZE*obj.y - BOARD_SIZE* obj.offsetY - BOARD_SIZE
    if (end_x < BOARD_SIZE_SQUARED && end_y < BOARD_SIZE_SQUARED) {
        if (obj.x === 1) { // vertical
            for (let j = start_x; j <= end_y; j += BOARD_SIZE) {
                if (!board.isEmptyI(j)) {return}
            } 
            board.placeShipI(start_y, end_y)
        } else if (obj.y === 1) { // horizontal
            for (let j = start_x; j <= end_x; j += 1) {
                if (!board.isEmptyI(j)) {return}
            }
            board.placeShipI(start_x, end_x)
        }
        draw()
    }
}

function handleGridClick(i, cells, board) {
    board.receiveSelectI(i, MAX_SHOTS)
    draw()
    
    
}

function get_current_ship_id() {
    return activePlayer.getNumShips() + SHIP1
}

//#endregion 
/*
████  ████   ███  █   █ 
█   █ █   █ █   █ █   █ 
█   █ ████  █████ █ █ █ 
█   █ █  █  █   █ ██ ██ 
████  █   █ █   █ █   █ 
*/
//#region

function drawHumanButtons() {
    if (player1.isHuman) {
        player1HumanButton.classList.remove('comp')
        player1HumanButton.textContent = "Human"
    } else {
        player1HumanButton.classList.add('comp')
        player1HumanButton.textContent = "Computer"
    }
    if (player2.isHuman) {
        player2HumanButton.classList.remove('comp')
        player2HumanButton.textContent = "Human"
    } else {
        player2HumanButton.classList.add('comp')
        player2HumanButton.textContent = "Computer"
    }
    player1HumanButton.disabled = state !== GSD.setup
    player2HumanButton.disabled = state !== GSD.setup
    
}

function drawGrid(parentDiv, board, isHidden) {
    parentDiv.replaceChildren()
    const cells = []
    for (let i = 0; i < BOARD_SIZE_SQUARED; i++) {
        const cellValue = board.getValueByI(i)
        const cell = document.createElement("div")
        cells.push(cell)
        cell.classList.add("grid-item")
        cell.style.backgroundColor = (isHidden && board.hasNotBeenShot(board.getItoCoord(i))) ? COLOR_DICT["hidden"] : COLOR_DICT[cellValue]

        // Placing
        if (state === GSD.place && !isHidden) {
            cell.addEventListener('dragover', (e) => handleGridDragover(e,i, cells, board))
            cell.addEventListener('dragleave', (e) => handleGridDragleave(e,i, cells))
            cell.addEventListener('drop', (e) => handleGridDrop(e,i, cells, board))
        }

        // Shooting
        if (state === GSD.shoot && isHidden) {
            cell.addEventListener("click", () => handleGridClick(i, cells, board))
        }

        parentDiv.appendChild(cell)
    }
    for (let j of board.selected) {
        console.log("HANDLE GRID CLICK", j)
        drawSelected(cells[j])
    }
}

function clearShipGrid() {
    shipHorDiv.replaceChildren()
    shipVertDiv.replaceChildren()
    shipHorDiv.style.visibility = 'hidden'
    shipVertDiv.style.visibility = 'hidden'
}

function drawShipGrid(parentDiv, ship_id) {
    parentDiv.replaceChildren()
    parentDiv.style.visibility = 'visible'
    for (let i = 0; i < SIZE_DICT[ship_id]; i++) {
        const cell = document.createElement("div")
        cell.classList.add("grid-item")
        console.log(COLOR_DICT[ship_id])
        cell.style.backgroundColor = COLOR_DICT[ship_id]
        parentDiv.appendChild(cell)
    }
}


function drawSelected(cell) {
    cell.classList.add('selected')
}


function draw() {
    drawHumanButtons()
    clearShipGrid()
    const hideBoard1 = activePlayer!==player1
    const hideBoard2 = activePlayer!==player2
    // TODO shouldn't show computer Board || !activePlayer.isHuman)
    switch (state) {
        case GSD.setup:
            gameBtn.style.visibility = 'visible'
            gameBtn.textContent = "Start Game"
            message.textContent = `Start the Game, already!.`
            break;
        case GSD.place:
            gameBtn.style.visibility = 'visible'
            gameBtn.textContent = activePlayer.getNumShips() === MAX_SHIPS ? 'Finish Placing' : 'Undo Placement'
            gameBtn.disabled = activePlayer.getNumShips() === 0
            message.textContent = `Player ${activePlayer.id}, place your ships!`
            drawGrid(player1Div, player1.board, hideBoard1)
            drawGrid(player2Div, player2.board, hideBoard2)
            drawShipGrid(shipVertDiv, get_current_ship_id())
            drawShipGrid(shipHorDiv, get_current_ship_id())
            break;
        case GSD.shoot:
            console.log(enemyPlayer.getNumSelected() !== MAX_SHOTS)
            gameBtn.style.visibility = 'visible'
            gameBtn.disabled = enemyPlayer.getNumSelected() !== MAX_SHOTS
            gameBtn.textContent = "Fire!"
            message.textContent = `Player ${activePlayer.id}, fire your shots!`
            drawGrid(player1Div, player1.board, hideBoard1)
            drawGrid(player2Div, player2.board, hideBoard2)
            break;
        case GSD.pass:
            gameBtn.style.visibility = 'visible'
            gameBtn.textContent = `Pass to Player ${activePlayer.id}`
            message.textContent = `Pass to Player ${activePlayer.id}!`
            drawGrid(player1Div, player1.board, true)
            drawGrid(player2Div, player2.board, true)
            break;
        case GSD.end:
            gameBtn.style.visibility = 'visible'
            gameBtn.textContent = "Restart Game"
            message.textContent = `Player ${winner.id} wins!`
            drawGrid(player1Div, player1.board, false)
            drawGrid(player2Div, player2.board, false)
            break;
    }
}
//#endregion


draw()