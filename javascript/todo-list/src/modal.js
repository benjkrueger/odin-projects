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

let add_mode = true
let entry_id
const modal = document.getElementById("add-note-modal")

export function set_edit_mode(i) {
    add_mode = false
    set_modal_values(i)
    entry_id = i
    console.log("SET EDIT MODE", i, entry_id)
}

export function show_modal() {
    modal.classList.add("show")
}

function set_modal_values(i) {
    const t = storage.get(i)
    document.getElementById("title").value = t.title
    document.getElementById("description").value = t.description
    document.getElementById("date").value = t.dueDate
    document.getElementById("priority").value = t.priority
    document.getElementById("project").value = t.project
}

export function generateModal() {
    
    const addNoteBtn = document.querySelector("#add-note")
    addNoteBtn.addEventListener("click", () => {
        show_modal()
        add_mode = true
    })

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
    //make_grid_row(id, label_name, elem_type, input_type, placeholder, value, options)
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
        console.log("SUBMIT IS IT NULL", project_value, project === "null")
        const t = new ToDo(
            storage.new_id,
            document.getElementById("title").value,
            document.getElementById("description").value,
            document.getElementById('date').value,
            document.getElementById('priority').value,
            project === "null" ? null : project_value,
            false
        )
        if (add_mode) {storage.push(t)}
        else {
            console.log("EDIT MODE", storage.todos, entry_id)
            const id = storage.get(entry_id).id
            const t = new ToDo(
                id,
                document.getElementById("title").value,
                document.getElementById("description").value,
                document.getElementById('date').value,
                document.getElementById('priority').value,
                document.getElementById('project').value,
                storage.get(entry_id).completed  
            )
            storage.update(id, t)
        }
        modal.classList.remove("show")
        refresh_content()
    })
    div.appendChild(submitBtn)

    modal.appendChild(div)
    


 
}

