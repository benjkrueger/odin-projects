export class Ship {
    constructor(length, ship_id) {
        this.length = length
        this.ship_id = ship_id
        this.hits = 0
        this.sunk = false
    }

    hit() {
        if (this.isSunk()) return true
        this.hits += 1
        return false
    }

    isSunk() {
        if (this.sunk) return true
        if (this.hits === this.length) return true
        return false
    }
}