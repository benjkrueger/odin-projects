import {NOTHING, MISS, HIT, ALL_SHIPS, SHIP1} from "./constants.js"
import {Ship} from "./ship.js"


export class Board {
    constructor(size=10) {
        this.size = size
        this.board = Array(size*size).fill(0);
        this.selectedBoard = Array(size*size).fill(false);
        this.ships = {}
        this.numSelected = 0
        this.selectedSpots = new Set()
    }
    reset() {
        this.board = Array(this.size*this.size).fill(0);
        this.selectedBoard = Array(this.size*this.size).fill(false);
        this.ships = {}
        this.numSelected = 0
        this.selectedSpots = new Set()
    }
    getLiveShipsNum() {
        let n = 0
        for (const [shipId, ship] of Object.entries(this.ships)) {
            if (!ship.isSunk()) {n += 1}
        }
        return n
    }
    toggleSelect(i) {
        this.numSelected = this.selectedBoard[i] ? this.numSelected -1 : this.numSelected + 1
        this.selectedBoard[i] = !this.selectedBoard[i]
        if (this.selectedBoard[i]) {
            this.selectedSpots.add(i)
        } else {
            this.selectedSpots.delete(i)
        }
    }
    getSelected(i) {return this.selectedBoard[i]}
    getNewShipId() {
        return Object.keys(this.ships).length + SHIP1
    }
    turnItoXY(i) {
        return [i % 10, Math.floor(i / 10)]
    }
    getXYCoord(x,y) {return this.board[(y*this.size) + x]}
    setXYCoord(x,y,value) {this.board[(y*this.size) + x] = value}
    getICoord(i) {return this.board[i]}
    setICoord(i,value) {this.board[i] = value}
    validateShip(startCoord, endCoord) {
        const [x1, y1] = startCoord
        const [x2, y2] = endCoord
        if (x1 === x2) {
            const shipLength = y2 - y1 +1
            for (let i = y1; i <= y2; i++) {
                if (this.getXYCoord(x1, i) !== NOTHING) {
                    return false
                }
            }
            return true
        } else if (y1 === y2) {
            const shipLength = x2 - x1 +1
            for (let i = x1; i <= x2; i++) {
                if (this.getXYCoord(i, y1) !== NOTHING) {
                    return false
                }
            }
            return true
        } else {throw Error(`Invalid Coordinates ${startCoord}, ${endCoord}`)}
    }
    placeShip(startCoord, endCoord) {
        console.log(startCoord, endCoord)
        const shipId = this.getNewShipId()
        const [x1, y1] = startCoord
        const [x2, y2] = endCoord
        if (x1 === x2) {
            const shipLength = y2 - y1 +1
            for (let i = y1; i <= y2; i++) {
                this.setXYCoord(x1, i, shipId)
            }
            this.ships[shipId] = new Ship(shipLength, shipId)
        } else if (y1 === y2) {
            const shipLength = x2 - x1 +1
            for (let i = x1; i <= x2; i++) {
                this.setXYCoord(i, y1, shipId)
            }
            this.ships[shipId] = new Ship(shipLength, shipId)
        } else {throw Error(`Invalid Coordinates ${startCoord}, ${endCoord}`)}
    }
    undoShip(startCoord, endCoord) {
        const shipId = this.getNewShipId() - 1
        const [x1, y1] = startCoord
        const [x2, y2] = endCoord
        if (x1 === x2) {
            const shipLength = y2 - y1 +1
            for (let i = y1; i <= y2; i++) {
                this.setXYCoord(x1, i, NOTHING)
            }
            delete this.ships[shipId]
        } else if (y1 === y2) {
            const shipLength = x2 - x1 +1
            for (let i = x1; i <= x2; i++) {
                this.setXYCoord(i, y1, NOTHING)
            }
            delete this.ships[shipId]
        } else {throw Error(`Invalid Coordinates ${startCoord}, ${endCoord}`)}
    }
    attemptSelect(i, numShots) {
        if (![MISS, HIT].includes(this.getICoord(i))) {
            if (this.numSelected < numShots) {
                this.toggleSelect(i)
            } else if (this.getSelected(i)) {
                this.toggleSelect(i)
            }
        }
    }
    handleShot(i) {
        this.toggleSelect(i)
        const cellValue = this.getICoord(i)
        if (cellValue === NOTHING) {
            this.setICoord(i, MISS)
        } else if (ALL_SHIPS.includes(cellValue)) {
            const ship = this.ships[cellValue]
            ship.hit()
            this.setICoord(i, HIT)
            const ship_got_sunk = ship.isSunk()
            console.log("BOARD: ship sunk", ship_got_sunk, ship.shipId)
            return ship_got_sunk ? ship.ship_id : NOTHING
        } else {
            throw Error(`SOMETHING WEIRD HAPPENED IN HANDLE SHOT ${cellValue}`)
        }
    }
}