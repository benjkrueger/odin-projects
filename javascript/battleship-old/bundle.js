(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class Cell {
    constructor(element) {
        this.selected = false
        this.element = element
    }

    toggle_select() {
        this.selected = !this.selected
        if (this.selected) {this.draw_circle()}
        else {this.remove_circle()}
    }

    draw_circle() {
        const canvas = document.createElement("canvas");
        canvas.width='40'
        canvas.height='40'
        const ctx = canvas.getContext("2d");
        const padding = 5;
        const centerX = 20
        const centerY = 20
        const radius = 20 - padding;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI); // Full circle
        ctx.strokeStyle = "white"; // Outline color
        ctx.lineWidth = 3;        // Thickness of the outline
        ctx.stroke();
        this.element.appendChild(canvas)
    }

    remove_circle() {
        this.element.replaceChildren()
    }
}







module.exports = Cell

},{}],2:[function(require,module,exports){
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
    if (player.id === 1) {cells1[y][x].toggle_select()}
    else if (player.id === 2) {cells2[y][x].toggle_select()}

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
            if (player.id === 1) {cells1[i][j] = new Cell(cell)}
            else if (player.id === 2) {cells2[i][j] = new Cell(cell)}
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


},{"./cell.js":1,"./player.js":4}],3:[function(require,module,exports){
const Ship = require("./ship.js")

const NOTHING = 0
const MISS = 1
const HIT = 2

class Gameboard {
    constructor(size=10) {
        this.board = Array.from({ length: size }, () => Array(size).fill(0));
        this.ships = {}
        this.ship_number = 10
        this.salvo_number = 0
    }

    place_ship(start_coord, end_coord) {
        const [x1, y1] = start_coord
        const [x2, y2] = end_coord
        if (!(x1 === x2 || y1 === y2)) {return false}
        if (x1 < 0 || y1 < 0 || x2 >= this.board.length || y2 >= this.board.length) {return false}
        if (x1 === x2) {
            for (let i = y1; i <= y2; i++) {
                if (this.board[i][x1] !== NOTHING) return false
            }
            for (let i = y1; i <= y2; i++) {
                this.board[i][x1] = this.ship_number
            }
            this.ships[this.ship_number] = new Ship(y2-y1+1)
        } else {
            for (let i = x1; i <= x2; i++) {
                if (this.board[y1][i] !== NOTHING) return false
            }
            for (let i = x1; i <= x2; i++) {
                this.board[y1][i] = this.ship_number
            }
            this.ships[this.ship_number] = new Ship(x2-x1+1)
        }
        this.ship_number += 1
        this.salvo_number += 1
        return true
    }

    print_board() {
        for (let i = 0; i < this.board.length; i++) {
            let rowString = '';
            for (let j = 0; j < this.board[i].length; j++) {
                rowString += this.board[i][j] + '\t'; // Add tabs between items
            }
            console.log(rowString);
        }
    }

    handleSinking() {
        this.salvo_number -= 1
        if (this.all_ships_sunk()) {
            console.log("ALLSHIPS SUNKS")
        }
    }

    handleMiss(coord) {
        const [x, y] = coord
        this.board[y][x] = MISS
    }

    handleHit(coord) {
        const [x, y] = coord
        const spot = this.board[y][x]
        this.ships[spot].hit()
        this.board[y][x] = HIT
    }

    isValidCoord(coord) {
        const [x, y] = coord
        const spot = this.board[y][x]
        return spot in Object.keys(this.ships).concat(NOTHING)
    }

    receiveAttack(coord) {
        const [x, y] = coord
        const spot = this.board[y][x]
        if (Object.hasOwn(this.ships, spot)) {
            this.handleHit()
            return true
        } else if (spot === NOTHING) {
            this.handleMiss(coord)
            return true
        } else {
            return false
        }
    }

    salvo(coords) {
        for (let coord of coords) {
            if (!this.isValidCoord(coord)) return false
        }
        for (let coord of coords) {
            this.receiveAttack(coord)
        }
        return true
    }

    all_ships_sunk() {
        for (const [key, ship] of Object.entries(this.ships)) {
            if (!ship.isSunk()) {return false} 
        }
        return true
    }
}


module.exports = Gameboard

},{"./ship.js":5}],4:[function(require,module,exports){
const Gameboard = require("./gameboard.js")

class Player {
    constructor(id, real) {
        this.id = id
        this.real = real
        this.gameboard = new Gameboard()
    }

    get_cell(x, y) {
        return this.gameboard.board[y][x]
    }

    get_ship_numbers() {
        return Object.keys(this.gameboard.ships).map((x) => parseInt(x))
    }

    place_ship(start_coord, end_coord) {
        this.gameboard.place_ship(start_coord, end_coord)
    }
}

module.exports = Player
},{"./gameboard.js":3}],5:[function(require,module,exports){
class Ship {
    constructor(length) {
        this.length = length
        this.hits = 0
        this.sunk = false
    }

    hit() {
        if (this.isSunk()) return
        this.hits += 1
    }

    isSunk() {
        if (this.sunk) return true
        if (this.hits === this.length) return true
        return false
    }
}

module.exports = Ship
},{}]},{},[2]);
