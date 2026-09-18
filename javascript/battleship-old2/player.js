import {Board} from "./board.js"
import { NOTHING, SIZE_DICT, HIT, MISS } from "./constants.js";

export class Player {
    constructor(id) {
        this.id = id
        this.isHuman = true;
        this.board = new Board();
        this.ship_coords = []
    }
    place_ship(start, end) {
        this.board.placeShip(this.board.turnItoXY(start), this.board.turnItoXY(end))
        this.ship_coords.push([start, end])
    }
    undo_ship() {
        const [start, end] = this.ship_coords.pop()
        this.board.undoShip(this.board.turnItoXY(start), this.board.turnItoXY(end))
    }
    getCellValue(i) {return this.board.getICoord(i)}
    setCellValue(i, value) {this.board.setICoord(i, value)}
    getSelected(i) {return this.board.getSelected(i)}
    allIsSunk() {return this.board.getLiveShipsNum() === 0}
    getNumberShotsPossible() {return this.board.getLiveShipsNum()}
    getNumberSelectedShots() {return this.board.selectedSpots.size}
    attemptShot(i, numShots) {return this.board.attemptSelect(i, numShots)}
    fire() {
        const selected = this.board.selectedSpots
        const response = []
        for (const i of selected) {
            const ship_sunk = this.board.handleShot(i)
            console.log("PLAYER SHIP SUNK", ship_sunk)
            if (ship_sunk !== NOTHING) {response.push(ship_sunk)}
        }
        return response
    }
    reset() {
        this.board.reset();
    }
    ai_place_ships() {
        function get_coords(board, len) {
            let v = Math.random() < 0.5
            let x1, y1, x2, y2
            if (v) {
                x1 = Math.floor(Math.random() * 10)
                y1 = Math.floor(Math.random() * (10 - len))
                x2 = x1
                y2 = y1 + len - 1
            } else {
                y1 = Math.floor(Math.random() * 10)
                x1 = Math.floor(Math.random() * (10 - len))
                y2 = y1
                x2 = x1 + len - 1
            }
            if (!board.validateShip([x1, y1], [x2, y2])) {
                return get_coords(board, len)
            }
            return [x1, y1, x2, y2]
        }

        let [x1, y1, x2, y2] = get_coords(this.board, 5);
        console.log(x1, y1, x2, y2, this.board);
        this.board.placeShip([x1,y1], [x2,y2]);
        this.ship_coords.push([[x1,y1], [x2,y2]]);
        [x1, y1, x2, y2] = get_coords(this.board, 4);
        this.board.placeShip([x1,y1], [x2,y2]);
        this.ship_coords.push([[x1,y1], [x2,y2]]);
        [x1, y1, x2, y2] = get_coords(this.board, 3);
        this.board.placeShip([x1,y1], [x2,y2]);
        this.ship_coords.push([[x1,y1], [x2,y2]]);
        [x1, y1, x2, y2] = get_coords(this.board, 3);
        this.board.placeShip([x1,y1], [x2,y2]);
        this.ship_coords.push([[x1,y1], [x2,y2]]);
        [x1, y1, x2, y2] = get_coords(this.board, 2);
        this.board.placeShip([x1,y1], [x2,y2]);
        this.ship_coords.push([[x1,y1], [x2,y2]]);
    }
    ai_place_shots(enemy_player) {
        console.log(this.id, "PLAYER AI SHOOT")
        const enemy_board = enemy_player.board
        function get_coord() {
            let i = Math.floor(Math.random() * 100)
            if (enemy_board.getSelected(i) === MISS || enemy_board.getSelected(i) === HIT) {
                return get_coord()
            }
            return i

        }
        const coords = []
        const response = []
        for (let i = 0; i < this.getNumberShotsPossible(); i++) {
            coords.push(get_coord())
            enemy_board.attemptSelect(coords[i])
            const ship_sunk = enemy_board.handleShot(coords[i])
            if (ship_sunk !== NOTHING) {response.push(ship_sunk)}
        }
        console.log(enemy_board, this.board.selectedSpots)
        return response
    }
}