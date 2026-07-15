import { ToDo } from "./todo.js"
import { Storage } from "./storage.js"

const content = document.getElementById('content')
const storage = new Storage()
let storage_array = storage.retrieve_todos()
get_project()


function refresh_storage_array() {
    storage_array = storage.retrieve_todos()
}

export function get_project(project_name) {
    refresh_storage_array()
    content.replaceChildren()
    if (project_name === null || project_name === undefined) {
        for (const entry of storage_array) {
            if (!entry.completed) {
                const t = new ToDo(entry.title, entry.description, entry.dueDate, entry.priority, entry.completed, entry.project)
                content.appendChild(t.toDiv())
            }
            
        }
    }
    for (const entry of storage_array) {
        if (!entry.completed && entry.project === project_name) {
            const t = new ToDo(entry.title, entry.description, entry.dueDate, entry.priority, entry.completed, entry.project)
            content.appendChild(t.toDiv())
        }
    }
}