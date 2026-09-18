export class Ship {
    constructor(id, length, coords) {
        this.length = length
        this.id = id
        this.hits = 0
        this.coords = coords
    }
    hit() {
        this.hits += 1
    }
    isSunk() {
        return this.hits >= this.length
    }
}