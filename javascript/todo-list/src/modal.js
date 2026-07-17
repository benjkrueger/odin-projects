import {storage} from "./storage.js"
import { ToDo } from "./todo.js"
import { refresh_content } from "./content.js";

function getTodaysDate() {
    return new Date().toISOString().split("T")[0]
}

function make_grid_row(id, label_name, elem_type, input_type="", placeholder="", value="", options=[]) {
    const div = document.createElement("div")
    div.classList.add("grid-row")
    let label = document.createElement("label")
    label.htmlFor = id
    label.textContent = label_name
    div.appendChild(label)
    let input = document.createElement(elem_type)
    input.id = id
    if (input_type) {input.type = input_type}
    if (placeholder) {input.placeholder = placeholder}
    if (value) {input.value = value}
    if (options) {
        if (id === "project") {
            const option = document.createElement("option")
            option.value = null
            option.textContent = null
            input.appendChild(option)
        }
        
        for (const option_name of options) {
            if (option_name !== null) {
                const option = document.createElement("option")
                option.value = option_name
                option.textContent = option_name
                input.appendChild(option)
            }
            
        }
    }
    div.appendChild(input)
    return div
}

export function generateModal() {
    const modal = document.getElementById("add-note-modal")
    const addNoteBtn = document.querySelector("#add-note")
    addNoteBtn.addEventListener("click", () => {modal.classList.add("show")})

    const div = document.createElement("div")
    div.classList.add("modal-box")

    const closeBtn = document.createElement("button")
    closeBtn.id = "closeModalBtn"
    closeBtn.classList.add("modal-close")
    closeBtn.textContent = "x"
    closeBtn.addEventListener("click", () => {modal.classList.remove("show")})
    div.appendChild(closeBtn)

    const header = document.createElement("h3")
    div.appendChild(header)
    //getTodaysDate()
    div.appendChild(make_grid_row("title", "Title:", "input", "text", "Title"))
    div.appendChild(make_grid_row("description", "Description:", "textarea", "", "Title"))
    div.appendChild(make_grid_row("date", "Description:", "input", "date", "", getTodaysDate()))
    div.appendChild(make_grid_row("priority", "Priority:", "select", "","High", "", ["High", "Medium", "Low"]))
    div.appendChild(make_grid_row("project", "Project:", "select", "", "", "", storage.projects))
    // Add Projects

    const submitBtn = document.createElement("button")
    submitBtn.id = "submit-note"
    submitBtn.class = "plus-button"
    submitBtn.textContent = "Submit"
    submitBtn.addEventListener("click", () => {
        const project_value = document.getElementById('project')?.value
        console.log(project_value, project === "null")
        const t = new ToDo(
            storage.new_id,
            document.getElementById("title").value,
            document.getElementById("description").value,
            document.getElementById('date').value,
            document.getElementById('priority').value,
            project === "null" ? null : project_value,
            false
        )
        storage.push(t)
        modal.classList.remove("show")
        refresh_content()
    })
    div.appendChild(submitBtn)

    modal.appendChild(div)
    /*
    const modal = document.getElementById("add-note-modal")
    const addNoteBtn = document.querySelector("#add-note")
    addNoteBtn.addEventListener("click", () => {modal.classList.add("show")})
    const closeModalBtn = document.querySelector("#closeModalBtn")
    closeModalBtn.addEventListener("click", closeModal)
    //addNoteBtn.click() // TODO Delete Later

    const title = document.getElementById("title")
    const description = document.getElementById("description")
    const date = document.getElementById('date')
    date.value = getTodaysDate()
    const priority = document.getElementById('priority')
    const submit = document.getElementById('submit-note')
    const project = document.getElementById('projects')

    submit.addEventListener("click", () => {
        const t = new todo(title.value, description.value, date.value, priority.value, false, project.value)
        storage.push(t)
        closeModal()
    })
    */


 
}

