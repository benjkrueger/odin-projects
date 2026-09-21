const valid_move = (x, y) => {return (0 <= x && x <= 7 && 0 <= y && y <= 7)}
const get_moves = (x,y) => {
    let array = [[-1,-2], [-1,2], [-2,-1], [-2,1], [1,-2], [1,2], [2,-1], [2,1]]
    let ret = []
    for (let coord of array) { // Added 'let' to avoid global variable leak
        let x1 = coord[0] + x
        let y1 = coord[1] + y
        if (valid_move(x1, y1)) {ret.push([x1, y1])}
    }
    return ret
}

const prettyPrint = (path) => {
    if (path === null) {console.log("path unreachable")}
    else {
        console.log(`You made it in ${path.length -1} moves! Here's your path:`)
        for (coord of path) {
            console.log(coord.toString())
        }
    }
}

const knightMoves = (start_coord, end_coord) => {
    const visited = new Set()
    const parent = new Map()
    
    const startStr = start_coord.toString()
    visited.add(startStr)
    parent.set(startStr, null)
    
    let queue = [start_coord]
    
    while (queue.length > 0) {
        let current = queue.shift()
        
        if (current[0] === end_coord[0] && current[1] === end_coord[1]) {
            let path = []
            let currentStr = current.toString()
            while (currentStr !== null) {
                path.push(currentStr.split(',').map(Number))
                currentStr = parent.get(currentStr)
            }
            return prettyPrint(path.reverse())
        }
        
        for (let neighbor of get_moves(current[0], current[1])) {
            let neighborStr = neighbor.toString()
            
            if (!visited.has(neighborStr)) {
                visited.add(neighborStr)
                parent.set(neighborStr, current.toString())
                queue.push(neighbor)
            }
        }
    }
    return prettyPrint(null)
}

knightMoves([3,3], [4,3])