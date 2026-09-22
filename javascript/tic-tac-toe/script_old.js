function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
const getRandomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)]

class Gameboard {
    constructor()  {
        this.board = [["_","_","_"], ["_","_","_"], ["_","_","_"]]
        this.EMPTY = "_"
    }
    get(x,y) {
        return this.board[y][x]
    }
    is_open(x,y) {
        console.log(y,x)
        return this.board[y][x] === this.EMPTY
    }
    there_is_open_space_left() {
        for (const row of this.board) {
            for (const col of row) {
                if (col === this.EMPTY) {
                    return true
                }
            }
        }
        return false
    }
    get_empty_spaces() {
        let ret = []
        for (let i = 0; i < 3; i++) { 
            for (let j = 0; j < 3; j++) {
                if (this.board[i][j] === "_") {
                    ret.push([j,i])
                }
            }
        }
        return ret
    }
    place(x, y, piece) {
        if (this.board[y][x] === this.EMPTY) {
            this.board[y][x] = piece
            return true
        }    
        return false     
    }
    print() {
        for (let i = 0; i < 3; i++) {
            console.log(this.board[i])
        }
    }
    detect_win() {
        const allEqual = arr => arr.every(val => val === arr[0] && arr[0] !== this.EMPTY)
        let trio
        for (let i = 0; i < 3; i++) {
            trio = this.board[i]
            if (allEqual(trio)) {return trio[0]}

            trio = [this.board[0][i],this.board[1][i],this.board[2][i]]
            if (allEqual(trio)) {return trio[0]}
        } 
        trio = [this.board[0][0],this.board[1][1],this.board[2][2]]
        if (allEqual(trio)) {return trio[0]}
        trio = [this.board[0][2],this.board[1][1],this.board[2][0]]
        if (allEqual(trio)) {return trio[0]}
        return false
    }
}

class Player {
    constructor(team) {
        this.team = team
        this.is_human = false
    }

    take_auto_turn(board) {
        let possible_moves = board.get_empty_spaces()
        let valid_move = false
        let x, y
        do {
            let move = getRandomChoice(possible_moves)
            console.log(move)
            x = move[0]
            y = move[1]
            valid_move = board.place(x, y, this.team)
            console.log(x, y)
        } while (!valid_move)
        console.log(`${this.team} places at ${x}, ${y}`)
        return [x,y]
    }

    take_click_turn(board,x,y) {
        board.place(x,y, this.team)
        console.log(`${this.team} places at ${x}, ${y}`)
    }

    set_human(b) {
        this.is_human = b
    }
}

class Game {
    constructor() {
        this.board = new Gameboard
        this.display_board = document.getElementById("board")
        this.players = [new Player("X"), new Player("O")]
        this.turn = randInt(0,1)
    }

    set_player_ai(i, b) {
        this.players[i].set_human(b)
    }

    next_player() {
        this.turn = this.turn === 0 ? 1 : 0
        console.log(!this.players[this.turn].is_human)
        if (!this.players[this.turn].is_human) {
            this.take_auto_turn()
        }
    }

    set_display_board(x, y, team) {
        this.display_board.children[y].children[y].textContent = team
    }

    take_auto_turn() {
        if (this.board.there_is_open_space_left()) {
            const coords = this.players[this.turn].take_auto_turn(this.board)
            this.set_display_board(coords[0], coords[1], this.players[this.turn].team)
            this.board.print()
            this.next_player()
            
        }
    }

    take_click_turn(x, y) {
        if ( this.board.detect_win()) {
            return
        }
        if (this.board.is_open(x,y)) {
            this.players[this.turn].take_click_turn(this.board,x,y)
            this.board.print()
            this.next_player()
        }
        
    }

    play_game() {
        while (this.board.there_is_open_space_left()) {
            let player = this.players[this.turn]
            this.take_auto_turn()
            let detect_win = this.board.detect_win()
            if (detect_win !== false) {
                console.log(`Player ${detect_win} has won.`)
                return
            }
        }
        console.log("Cats Game!")
    }
}

function generate_player_buttons(game) {
    const div_player1 = document.getElementById("div_player1")
    const div_player2 = document.getElementById("div_player2")
    const human_button1 = document.createElement("button")
    const ai_button1 = document.createElement("button")
    const human_button2 = document.createElement("button")
    const ai_button2 = document.createElement("button")
    human_button1.textContent = "Human"
    human_button2.textContent = "Human"
    ai_button1.textContent = "AI"
    ai_button2.textContent = "AI"
    human_button1.addEventListener("click", () => {
        human_button1.classList.add("active_button")
        ai_button1.classList.remove("active_button")
        game.set_player_ai(0,true)
    })
    human_button2.addEventListener("click", () => {
        human_button2.classList.add("active_button")
        ai_button2.classList.remove("active_button")
        game.set_player_ai(1,true)
    })
    ai_button1.addEventListener("click", () => {
        ai_button1.classList.add("active_button")
        human_button1.classList.remove("active_button")
        game.set_player_ai(0,false)
    })
    ai_button2.addEventListener("click", () => {
        ai_button2.classList.add("active_button")
        human_button2.classList.remove("active_button")
        game.set_player_ai(1,false)
    })
    div_player1.appendChild(human_button1)
    div_player1.appendChild(ai_button1)
    div_player2.appendChild(human_button2)
    div_player2.appendChild(ai_button2)
}

function generate_board(game) {
    board = document.getElementById("board") // row cel cel cel
    for (let i = 0; i < 3; i++) { 
        const row = document.createElement("div")
        row.classList.add("row")
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement("button")
            cell.classList.add("cell")
            cell.addEventListener("click", () => {
                game.take_click_turn(j,i)
                cell.textContent = game.board.get(j, i) === "_" ? "" : game.board.get(j, i)
            })
            row.appendChild(cell)
        }
        board.appendChild(row)
    } 
}


let g = new Game
generate_player_buttons(g)
generate_board(g)
//g.play_game()