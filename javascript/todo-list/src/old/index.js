import "./styles.css";
import { closeModal, getTodaysDate } from "./modal.js";
import {todo} from "./todo.js"
import { refresh_storage_array, storage, get_today, get_project, get_tomorrow, get_week, get_month, get_completed } from "./content.js";
import { generate_buttons } from "./navbar.js";


//const content = document.getElementById('content')
function generate_dummy_todos(storage) {
    storage.push(new todo("title", "description", new Date().toISOString().split('T')[0], "High", false))
}

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

generate_buttons()
//generate_dummy_todos(storage)
