const btn = document.getElementById("submit")
btn.addEventListener("click", (e) => {
    console.log("clicked")
})

function add_underscores(string, len) {
    if (string.length >= len) {return string}
    return string.padEnd(len, "_")
}

function generate_cursor_position(c, a, t, q, is_backspace=false) {
    let cursor_position = 1
    if (c === 1) {cursor_position += c + 2} else {cursor_position += c}
    if (a === 3) {cursor_position += a + 2} else {cursor_position += a}
    if (t === 3) {cursor_position += t + 1} else {cursor_position += t}
    if (q > 0) {cursor_position += q}
    if (is_backspace) {
        if (cursor_position === 13) {cursor_position -= 1}
        if (cursor_position === 9) {cursor_position -= 2}
        if (cursor_position === 4) {cursor_position -= 2}
    }
    return cursor_position
}

function create_input(input_string, is_backspace=false) {
    input_string =  input_string.replace(/[^0-9]/g, '');
    if (input_string.length > 11) {input_string = input_string.substring(0,11)}
    let country_code = input_string.substring(0, 1)
    let area_code = input_string.substring(1,4)
    let triple = input_string.substring(4, 7)
    let quartet = input_string.substring(7, 11)
    const cursor = generate_cursor_position(country_code.length, area_code.length, triple.length, quartet.length, is_backspace)
    input_string = "+" + add_underscores(country_code, 1) + " (" + add_underscores(area_code, 3) + ") " + add_underscores(triple, 3) + "-" + add_underscores(quartet, 4)
    return [input_string, cursor]
}

const phoneInput = document.getElementById("phone-number")
phoneInput.setSelectionRange(1,1)
phoneInput.addEventListener('input', (e) => {
    let [input_string, cursor] = create_input(e.target.value)
    e.target.value = input_string
    phoneInput.setSelectionRange(cursor, cursor)
})

phoneInput.addEventListener("keydown", (e) => {
    if (event.key === "Backspace") {
        let [input_string, cursor] = create_input(e.target.value, true)
        e.target.value = input_string
        phoneInput.setSelectionRange(cursor, cursor)
    }
})

const password = document.getElementById('password')
const confirmPassword = document.getElementById("confirm-password")

function validatePasswords() {
    console.log(password.value, confirmPassword.value)
    if (password.value.length === 0 || confirmPassword.value === 0) {return}
    if (password.value !== confirmPassword.value) {
        password.setCustomValidity("Passwords do not match")
        confirmPassword.setCustomValidity("Passwords do not match")
    } else {
        password.setCustomValidity("")
        confirmPassword.setCustomValidity("")
    }
}

password.addEventListener('input', validatePasswords)
confirmPassword.addEventListener('input', validatePasswords)