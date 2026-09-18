import { Gameboard } from "./board.js"
import { HIT, MISS } from "./constants.js"

function surrounding_coords(enemy_board, coord) {
    const [x,y] = coord
    const ret = []
    if (x > 0 && enemy_board.hasNotBeenShot([x-1, y])) {ret.push([x-1, y])}
    if (x < 9 && enemy_board.hasNotBeenShot([x+1, y])) {ret.push([x+1, y])}
    if (y > 0 && enemy_board.hasNotBeenShot([x, y-1])) {ret.push([x, y-1])}
    if (y < 9 && enemy_board.hasNotBeenShot([x, y+1])) {ret.push([x, y+1])}
    return ret
}

export class Player {
    constructor(id) {
        this.id = id
        this.board = new Gameboard()
        this.isHuman = true
        this.prospective_targets = []
        this.shots_taken = 0
    }
    toggleHumanity() {this.isHuman = !this.isHuman}
    print() {this.board.print()}
    makeAttack(enemy_board, coord) { 
        // returns is_hit, is_sunk (or undefined)
        const [is_hit, is_sunk] = enemy_board.receiveAttack(coord)
        if (is_hit) {
            if (!is_sunk) {this.prospective_targets.push(surrounding_coords(enemy_board, coord))}
        }
        this.shots_taken += 1
    }
    endTurn() {
        this.shots_taken = 0
    }
    generateComputerAttack(enemy_board) {
        function get_hits(coords) {
            const ret = [] 
            for (const [x, y, r] of coords) {
                if (r === HIT) {
                    ret.push([x,y])
                }
            }
            return ret
        }
        function get_good_coords(coords) {
            const ret = new Set()
            for (const coord of coords) {
                for (const coord1 of surrounding_coords(enemy_board, coord)) {
                    ret.add(coord1)
                }
            }
            return ret
        }
        function get_random_coord(enemy_board) {
            let x,y, choice
            do {
                x = Math.floor(Math.random()*10)
                y = Math.floor(Math.random()*10)
                choice = [x,y]
                limit += 1
            } while (limit < 100 || !enemy_board.hasNotBeenShot([x,y]))
            return choice
        }

        const coords_attacked = enemy_board.coords_attacked
        const coords_hit = get_hits(coords_attacked)
        const good_coords = get_good_coords(coords_hit)
        let choice,x,y
        let limit = 100
        if (good_coords.size == 0) {
            choice = get_random_coord(enemy_board)
        } else {
            const coord_array = [...good_coords]
            if (Math.random() < 0.9) {choice = coord_array[Math.floor(Math.random() * coord_array.length)]}
            else {choice = get_random_coord(enemy_board)}
        }
        this.makeAttack(enemy_board, choice)
    }
    placeShip(start_coord, end_coord) {this.board.placeShip(start_coord, end_coord)}
    getNumShips() {return Object.keys(this.board.ships).length}
    getNumSelected() {return this.board.selected.size}
    clearSelected() {this.board.clearSelected()}
    handleFire() {return this.board.handleFire()}
    allShipsSunk() {
        return this.board.allShipsSunk()
    }
    undoPlacement() {this.board.undo_last_ship()}
    reset() {
        this.board = new Gameboard()
        this.shots_taken = 0
        this.prospective_targets = []
    }
    aiPlaceShip() {this.board.aiPlaceShip()}
}