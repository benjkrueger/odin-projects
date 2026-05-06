function get_random_color() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function handle_cell_color(cell) {
    let color = cell.style.backgroundColor
    let opacity = Number(cell.style.opacity)
    if (color === "") {
        cell.style.backgroundColor = get_random_color()
        cell.style.opacity = .1
    } else if (opacity != 1) {
        opacity += .1
        cell.style.opacity = opacity
    }
    //            cell.style.backgroundColor = get_random_color()
    //            cell.style.opacity = set_opacity()
}

function create_grid(len) {
    let container = document.getElementById('grid_container')
    let grid = document.createElement('div')
    grid.setAttribute('id', 'grid')
    for (let i=1; i <= len; i++) {
        let row = document.createElement('div')
        row.setAttribute('class', 'row')
        for (let j=1; j<= len; j++) {
            let cell = document.createElement('div')
            cell.setAttribute('class', 'cell')
            cell.addEventListener("mouseover", () => handle_cell_color(cell))
            row.appendChild(cell)
        }
        grid.appendChild(row)
    }
    container.appendChild(grid)
}

function handle_prompt(num) {
    if (!isNaN(num)  && Number(num) <= 100) {
        let container = document.getElementById('grid_container')
        let grid = document.getElementById('grid')
        console.log(grid)
        container.removeChild(grid)
        create_grid(Number(num))
    }
}

function initialize() {
    let btn = document.getElementById('new_button')
    btn.onclick = function() {
        let ans = prompt("Pick a grid size (max 100).")
        handle_prompt(ans)
    }
    create_grid(16)
}

initialize()
