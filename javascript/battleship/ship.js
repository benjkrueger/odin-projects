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