const Gameboard = require("./gameboard.js")

class Player {
    constructor(id, real) {
        this.id = id
        this.real = real
        this.gameboard = new Gameboard()
        this.selected = 0
        this.ships_left = this.gameboard.get_num_ships_left()
        this.selected_coords
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

    update_ships_left() {
        this.ships_left = this.gameboard.get_num_ships_left()
    }

    can_select() {
        this.update_ships_left()
        return this.selected < this.ships_left
    }

    select_coord(x,y) {
        if (this.can_select() && this.gameboard()) {
            this.selected += 1
            return true
        } else if (this.selected === this.ships_left) {
            for (const [x, y] in this.selected_coords) {

            }
        }
        return false
        
    }
}

module.exports = Player