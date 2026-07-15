import "./styles.css";
import { Storage } from "./local-storage.js";
import { todo } from "./todo.js";

export const storage = new Storage()
const content = document.getElementById('content')
let storage_array = storage.retrieve_todos()

export function refresh_storage_array() {
    storage_array = storage.retrieve_todos()
}

export function get_project(project_name) {
    content.replaceChildren()
    if (project_name === null || project_name === undefined) {
        for (const entry of storage_array) {
            if (!entry.completed) {
                const t = new todo(entry.title, entry.description, entry.dueDate, entry.priority, entry.completed, entry.project)
                content.appendChild(t.toDiv())
            }
            
        }
    }
    for (const entry of storage_array) {
        if (!entry.completed && entry.project === project_name) {
            const t = new todo(entry.title, entry.description, entry.dueDate, entry.priority, entry.completed, entry.project)
            content.appendChild(t.toDiv())
        }
    }
}

export function get_today() {
    content.replaceChildren()
    for (const entry of storage_array) {
        if (!entry.completed && entry.dueDate <= new Date().toISOString().split('T')[0]) {
            const t = new todo(entry.title, entry.description, entry.dueDate, entry.priority, entry.completed, entry.project)
            content.appendChild(t.toDiv())
        }
    }
}

export function get_tomorrow() {
    content.replaceChildren()
    const date = new Date()
    date.setDate(date.getDate() + 1)
    for (const entry of storage_array) {
        if (!entry.completed && entry.dueDate <= date.toISOString().split('T')[0]) {
            const t = new todo(entry.title, entry.description, entry.dueDate, entry.priority, entry.completed, entry.project)
            content.appendChild(t.toDiv())
        }
    }
}

export function get_week() {
    content.replaceChildren()
    const date = new Date()
    date.setDate(date.getDate() + 7)
    for (const entry of storage_array) {
        if (!entry.completed && entry.dueDate <= date.toISOString().split('T')[0]) {
            const t = new todo(entry.title, entry.description, entry.dueDate, entry.priority, entry.completed, entry.project)
            content.appendChild(t.toDiv())
        }
    }
}

export function get_month() {
    content.replaceChildren()
    const date = new Date()
    date.setMonth(date.getMonth() + 1)
    date.setDate(0)
    for (const entry of storage_array) {
        if (!entry.completed && entry.dueDate <= date.toISOString().split('T')[0]) {
            const t = new todo(entry.title, entry.description, entry.dueDate, entry.priority, entry.completed, entry.project)
            content.appendChild(t.toDiv())
        }
    }
}

export function get_completed() {
    content.replaceChildren()
    for (const entry of storage_array) {
        if (entry.completed) {
            const t = new todo(entry.title, entry.description, entry.dueDate, entry.priority, entry.completed, entry.project)
            content.appendChild(t.toDiv())
        }
    }
}
