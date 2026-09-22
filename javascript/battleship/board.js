import { NOTHING, HIT, MISS, SHIP1 } from "./constants.js";
import {Ship} from "./ship.js"

export class Gameboard {
    constructor(size=10) {
        this.size = size
        this.board = Array.from({ length: 10 }, () => Array(10).fill(NOTHING));
        this.coords_attacked = []
        this.ships = {}
        this.selected = new Set()
    }
    getValue(coord) {
        const [x, y] = coord
        console.assert(x >= 0 && x < 10 && y < 10 && y >= 0)
        return this.board[y][x]
    }
    getValueByI(i) {
        const x = i % this.size
        const y = Math.floor(i / this.size)
        return this.board[y][x]
    }
    getItoCoord(i) {
        const x = i % this.size
        const y = Math.floor(i / this.size)
        return [x,y]
    }
    isEmptyI(i) {
        return this.getValueByI(i) === NOTHING
    }
    hasNotBeenShot(coord) {
        const [x, y] = coord
        return (this.board[y][x] !== MISS && this.board[y][x] !== HIT)
    }
    print() {
        console.table(this.board)
    }
    reset() {
        this.board = Array.from({ length: 10 }, () => Array(10).fill(NOTHING));
        this.coords_attacked = []
        this.ships = {}
        this.selected = new Set()
    }
    numAliveShips() {
        let i = 0
        for (ship of Array.from(this.ships)) {
            if (!ship.isSunk()) {i++}
        }
        return i
    }
    allShipsSunk() {
        for (const ship of Object.values(this.ships)) {
            if (!ship.isSunk()) {return false}
        }
        return true
    }
    emptyCoords(start_coord, end_coord) {
        const [x1, y1] = start_coord
        const [x2, y2] = end_coord
        console.assert(x1 === x2 || y1 === y2)
        if (x1 === x2) {
            for (let i = y1; i <= y2; i++) {
                this.board[i][x1] = NOTHING
            }
        } else if (y1 === y2) {
            for (let i = x1; i <= x2; i++) {
                this.board[y1][i] = NOTHING
            }
        } else {
            console.error(`How did you make it past the assertion: [${x1}, ${y1}] -> [${x2}, ${y2}]`)
            return false
        }
    }
    placeShipI(start_i, end_i) {
        this.placeShip(this.getItoCoord(start_i), this.getItoCoord(end_i))
    }
    placeShip(start_coord, end_coord) {
        const [x1, y1] = start_coord
        const [x2, y2] = end_coord
        const id = SHIP1 + Object.keys(this.ships).length
        console.assert(x1 === x2 || y1 === y2)
        if (x1 === x2) {
            for (let i = y1; i <= y2; i++) {
                if (this.board[i][x1] !== NOTHING) {
                    console.error(`Invalid placement at [${x1}, ${i}] = ${this.board[i][x1]}`)
                    return false
                }
            }
            for (let i = y1; i <= y2; i++) {
                this.board[i][x1] = id
            }
            this.ships[id] = new Ship(id, y2-y1+1, {start_coord, end_coord})
        } else if (y1 === y2) {
            for (let i = x1; i <= x2; i++) {
                if (this.board[y1][i] !== NOTHING) {
                    console.error(`Invalid placement at [${i}, ${y1}] = ${this.board[y1][i]}`)
                    return false
                }
            }
            for (let i = x1; i <= x2; i++) {
                this.board[y1][i] = id
            }
            this.ships[id] = new Ship(id, x2-x1+1, {start_coord, end_coord})
        } else {
            console.error(`How did you make it past the assertion: [${x1}, ${y1}] -> [${x2}, ${y2}]`)
            return false
        } 
        return true
    }
    undo_last_ship() {
        if (Object.keys(this.ships).length < 1) {
            console.error("No ship to remove")
            return
        }
        const id_to_remove = SHIP1 + Object.keys(this.ships).length - 1
        const start_coord = this.ships[id_to_remove].coords.start_coord
        const end_coord = this.ships[id_to_remove].coords.end_coord
        this.emptyCoords(start_coord, end_coord)
        delete this.ships[id_to_remove]
    }
    receiveAttack(coord) {
        // returns is_hit, is_sunk (or undefined)
        const [x, y] = coord
        const board_value = this.board[y][x]
        if (board_value === HIT || board_value === MISS) {
            console.error(`Received Attack - already attacked coordinate: [${x}, ${y}] - ${this.board[y][x]}`);
        } else if (board_value === NOTHING) {
            this.coords_attacked.push([x,y,MISS])
            this.board[y][x] = MISS
        } else if (board_value >= SHIP1) {
            this.coords_attacked.push([x,y,HIT])
            this.ships[board_value].hit()
            this.board[y][x] = HIT
            return [true, this.ships[board_value].isSunk()]
        } else {
            console.error(`Received Attack - Unexpected value at: [${x}, ${y}] - ${this.board[y][x]}`);
        }
        return [false, undefined]
    }
    handleFire() {
        const ret = []
        for (const i of this.selected) {
            ret.push(this.receiveAttack(this.getItoCoord(i)))
        }
        return ret
    }
    receiveSelectI(i, max_shots) {
        const [x,y] = this.getItoCoord(i)
        if (this.selected.has(i)) {
            this.selected.delete(i);
            return false;
        } else if (this.selected.size < max_shots && this.hasNotBeenShot([x,y])) {
            this.selected.add(i);
            return true;
        } else {return false;}
    }
    clearSelected() {this.selected = new Set()}
    getNumSelected() {return this.selected.size}
}