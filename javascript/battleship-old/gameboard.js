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

    get_num_ships_left() {
        let i = 0
        for (const [key, ship] of Object.entries(this.ships)) {
            if (!ship.isSunk()) {i += 1} 
        }
        return i
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
