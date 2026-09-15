const Player = require("./player.js")
const Cell = require("./cell.js")

const NOTHING_ = 0
const MISS_ = 1
const HIT_ = 2

player1 = new Player(1, true)
player2 = new Player(2, true)
size = 10
cells1 = Array.from({ length: size }, () => Array(size).fill(0));
cells2 = Array.from({ length: size }, () => Array(size).fill(0));


function cell_click_handler(cell, player, x, y) {
    console.log("CELL CLICK", player, x, y, this)
    if (player.id === 1) {
        if (player.can_select()) {
            player.select_coord(x,y)
            cells1[y][x].toggle_select()
        }
    }
    else if (player.id === 2) {
        if (player.can_select()) {
            player.select_coord(x,y)
            cells2[y][x].toggle_select()
        }
    }

}

function set_cell(player, x, y, cell) {
    const num = player.get_cell(x,y)
    const cel = player.get_cell(x,y)
    const ship_nums = player.get_ship_numbers()
    console.log(ship_nums, cel)
    if (cel === NOTHING_) {
        cell.style.backgroundColor = "blue"
        console.log("AAAA")
    } else if (cel === MISS_) {
        cell.style.backgroundColor = "white"
    } else if (cel === HIT_) {
        cell.style.backgroundColor = "red"
    } else if (ship_nums.includes(cel)) {
        cell.style.backgroundColor = "black"
    }
    console.log(cel)
}

function generate_grid(player, div, len=10) {
    console.log("AAA")
    const table = document.createElement("div")
    table.classList.add("divTableBody")
    for (let i = 0; i < len; i++) {
        const row = document.createElement("div")
        row.classList.add("divTableRow")
        for (let j = 0; j < len; j++) {
            const cell = document.createElement("div")
            cell.style.padding=0
            cell.addEventListener("click", () => cell_click_handler(cell, player, j, i))
            set_cell(player, j, i, cell)
            cell.classList.add("divTableCell")
            row.appendChild(cell)
            if (cells1[i][j] = 0 && player.id === 1) {cells1[i][j] = new Cell(cell)}
            else if (cells1[i][j] && player.id === 2) {cells2[i][j] = new Cell(cell)}
            else if (player.id === 1) {cells1[i][j].update_element(cell)}
            else if (player.id === 2) {cells2[i][j].update_element(cell)}
        }
        table.appendChild(row)
    }
    div.appendChild(table)
}
test()
generate_grid(player1, document.getElementById("player-1"))
generate_grid(player2, document.getElementById("player-2"))



function test() {
    player1.gameboard.place_ship([1,0],[3,0])
    player1.gameboard.place_ship([1,2],[5,2])
    player1.gameboard.place_ship([8,3],[8,5])
    player1.gameboard.place_ship([2,4],[2,5])
    player1.gameboard.place_ship([4,5],[4,9])
    player2.gameboard.place_ship([4,0],[8,0])
    player2.gameboard.place_ship([3,8],[5,8])
    player2.gameboard.place_ship([0,6],[0,9])
    player2.gameboard.place_ship([5,4],[5,5])
    player2.gameboard.place_ship([6,7],[8,7])
}

