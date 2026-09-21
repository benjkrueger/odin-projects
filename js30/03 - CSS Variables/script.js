
function set_variable(variable, value) {
    const root = document.documentElement;
    root.style.setProperty(variable, value)
    console.log(variable, value)
}


/*blur_range.addEventListener("input", (e) => {
    set_variable("--blur", blur_range.value + "px")
})

spacing_range.addEventListener("input", (e) => {
    set_variable("--spacing", spacing_range.value + "px")
})

color_range.addEventListener("input", (e) => {
    set_variable("--base", color_range.value)
})*/

function initializeValues() {
    const style = window.getComputedStyle(document.body)
    const blur_range = document.getElementById("blur")
    blur_range.value = style.getPropertyValue('--blur').slice(0,2)
    const spacing_range = document.getElementById("spacing")
    spacing_range.value = style.getPropertyValue('--spacing').slice(0,2)
    const color_range = document.getElementById("base")
    color_range.value = style.getPropertyValue('--base')
    console.log(style.getPropertyValue('--blur'))
}

function handleUpdate() {
        const root = document.documentElement;
        const suffix = this.dataset.sizing || '';
        root.style.setProperty(`--${this.name}`, this.value + suffix)
        console.log(this.value, this.name)
}

function handleMouseUpdate() {
    if (!flag_mousedown) {return;}
    handleUpdate()
}
let flag_mousedown = false
const inputs = document.querySelectorAll('.controls input')

inputs.forEach(input => input.addEventListener('change', handleUpdate))
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate))
inputs.forEach(input => input.addEventListener('mousedown', ()=>flag_mousedown=true))
inputs.forEach(input => input.addEventListener('mouseup', ()=>flag_mousedown=false))
initializeValues()