const COLS = 4
const ROWS = 5
const INPUT = document.getElementById('input')
const HOLDER = document.getElementById('holder')
const OP_HOLDER = document.getElementById('op')
let HELD_VAR = null
let INPUT_VAR = null
let OP = null
const btn_dct = [
    ["1/x", "C", "BS", "÷"],
    [7,8,9,"x"],
    [4,5,6,"-"],
    [1,2,3,"+"],
    ["+/-",0,".","="],
]

function reciprocal() {
    if (INPUT_VAR !== null) {
        INPUT.value = 1/INPUT.value
        INPUT_VAR = 1/INPUT_VAR
    } else if (HELD_VAR !== null) {
        HOLDER.value = 1/HOLDER.value
        HELD_VAR = 1/HELD_VAR
    }
}
function clear() {
    clear_input(); 
    HOLDER.value=""; 
    HELD_VAR = null; 
    set_op(null);
}
function backspace() {
    INPUT.value = INPUT.value.slice(0,-1); 
    INPUT_VAR = Number(INPUT.value)
}
function negate() {
    if (INPUT_VAR !== null) {
        INPUT.value = -INPUT.value
        INPUT_VAR = -INPUT_VAR
    } else if (HELD_VAR !== null) {
        HOLDER.value = -HOLDER.value
        HELD_VAR = -HELD_VAR
    }
}
function equals() {
    if ((op === "/" || OP === "/") && INPUT_VAR === 0) {alert("Cannot divide by zero.");clear();return;}
    if (OP !== null) {
        if (OP === "+") {update_holder(HELD_VAR+INPUT_VAR); clear_input(); set_op(null);}
        if (OP === "-") {update_holder(HELD_VAR-INPUT_VAR); clear_input(); set_op(null);}
        if (OP === "*") {update_holder(HELD_VAR*INPUT_VAR); clear_input(); set_op(null);}
        if (OP === "/") {update_holder(HELD_VAR/INPUT_VAR); clear_input(); set_op(null);}
    } else {update_holder(INPUT_VAR); clear_input();}
}
function operate(op) {
    console.log("BEFORE", op, OP, HELD_VAR, INPUT_VAR)
    if (HELD_VAR === null) {update_holder(INPUT_VAR);clear_input(); set_op(op)}
    else if (INPUT_VAR === null) {set_op(op);}
    else {
        if ((op === "/" || OP === "/") && INPUT_VAR === 0) {alert("Cannot divide by zero."); clear();return;}
        if (OP === null) {
            set_op(op)
            if (OP === "+") {update_holder(HELD_VAR+INPUT_VAR); clear_input(); set_op(null);}
            if (OP === "-") {update_holder(HELD_VAR-INPUT_VAR); clear_input(); set_op(null);}
            if (OP === "*") {update_holder(HELD_VAR*INPUT_VAR); clear_input(); set_op(null);}
            if (OP === "/") {update_holder(HELD_VAR/INPUT_VAR); clear_input(); set_op(null);}
        } else {
            if (OP === "+") {update_holder(HELD_VAR+INPUT_VAR); clear_input(); set_op(null);}
            if (OP === "-") {update_holder(HELD_VAR-INPUT_VAR); clear_input(); set_op(null);}
            if (OP === "*") {update_holder(HELD_VAR*INPUT_VAR); clear_input(); set_op(null);}
            if (OP === "/") {update_holder(HELD_VAR/INPUT_VAR); clear_input(); set_op(null);}
            set_op(op)
        }
        
    }
    console.log("AFTER", op, OP, HELD_VAR, INPUT_VAR)
}
function print(i, j) {
    console.log(i,j, btn_dct[i][j], FUNC_DCT[i][j])
    FUNC_DCT[i][j]()
}
function set_op(op) {
    OP = op;
    OP_HOLDER.value = (OP === null) ? "" : op
}
function clear_input() {INPUT.value=""; INPUT_VAR = null;}
function update_input(number_typed) {
    if (number_typed === "." && INPUT.value.includes(".")) {return;}
    INPUT.value += number_typed
    INPUT_VAR = Number(INPUT.value)
}

function update_holder(number) {
    HOLDER.value = number
    HELD_VAR = Number(HOLDER.value)
    console.log("UPDATE HOLDER", HOLDER.value, HELD_VAR, number)
}

const FUNC_DCT = [
    [reciprocal, clear, backspace, () => operate("/")],
    [() => update_input(7), () => update_input(8), () => update_input(9), () => operate("*")],
    [() => update_input(4), () => update_input(5), () => update_input(6), () => operate("-")],
    [() => update_input(1), () => update_input(2), () => update_input(3), () => operate("+")],
    [negate, () => update_input(0), () => update_input("."), equals],
]

function create_button(i, j) {
    let btn = document.createElement('button')
    btn.setAttribute('class', 'button')
    btn.textContent = btn_dct[i][j]
    console.log(i,j, FUNC_DCT[i][j])
    btn.addEventListener("click", () => {print(i,j)})
    return btn
}

function create_calculator() {
    let container = document.getElementById('calculator')
    for (let i=0; i < ROWS; i++) {
        let row = document.createElement('div')
        row.setAttribute('class', 'row')
        for (let j=0; j< COLS; j++) {
            let btn = create_button(i, j)
            
            row.appendChild(btn)
        }
        container.appendChild(row)
    }
}


function initialize() {
    INPUT.value = ""
    HOLDER.value = ""
    create_calculator()
}

initialize()
