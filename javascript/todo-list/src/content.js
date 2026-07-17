/****************************************
 ███   ███  █   █ █████ █████ █   █ █████ 
█     █   █ ██  █   █   █     ██  █   █   
█     █   █ █ █ █   █   ████  █ █ █   █   
█     █   █ █  ██   █   █     █  ██   █   
 ███   ███  █   █   █   █████ █   █   █   
****************************************/

import { storage } from "./storage.js"
import { ToDo } from "./todo.js"

const content = document.getElementById('content')
let storage_array = storage.retrieve_todos()
let the_current_function = () => get_project()

export function refresh_content() {
    the_current_function()
}

function refresh_storage_array() {
    storage_array = storage.retrieve_todos()
    console.log("RERESH", storage_array)
}

export function sort_content_and_update(text) {
    text = text.toLowerCase()
    console.log("SORTER", text)
    if (["title", "description", "project", "priority"].includes(text)) {
        storage_array.sort((a,b) => {
            if (a[text] === null && b[text] === null) return 0
            if (a[text] === null) return 1
            if (b[text] === null) return -1
            return a[text].localeCompare(b[text])
        })
    } 
    the_current_function()

}

    

function make_todo(entry) {
    return new ToDo(entry.id, entry.title, entry.description, entry.dueDate, entry.priority, entry.project, entry.completed)
}

export function get_project(project_name) {
    //refresh_storage_array()
    content.replaceChildren()
    if (project_name === null || project_name === undefined) {
        for  (const key of Object.keys(storage_array)) {
            const entry = storage_array[key]
            if (entry && !entry.completed) {
                const t = make_todo(entry)
                content.appendChild(t.toDiv())
            }
            
        }
    }
    for (const key of Object.keys(storage_array)) {
        const entry = storage_array[key]
        if (entry && !entry.completed && entry.project === project_name) {
            const t = make_todo(entry)
            content.appendChild(t.toDiv())
        }
    }
    the_current_function = () => get_project(project_name)
}

function get_by_date(date) {
    //refresh_storage_array()
    content.replaceChildren()
    for (const key of Object.keys(storage_array)) {
        const entry = storage_array[key]
        if (entry && !entry.completed && entry.dueDate <= date) {
            const t = make_todo(entry)
            content.appendChild(t.toDiv())
        }
    }
}


export function get_today() {
    get_by_date(new Date().toISOString().split('T')[0])
    the_current_function = get_today
}

export function get_tomorrow() {
    const date = new Date()
    date.setDate(date.getDate() + 1)
    get_by_date(date.toISOString().split('T')[0])
    the_current_function = get_tomorrow
}

export function get_week() {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    get_by_date(date.toISOString().split('T')[0])
    the_current_function = get_week
}

export function get_month() {
    const date = new Date()
    date.setMonth(date.getMonth() + 1)
    date.setDate(0)
    get_by_date(date.toISOString().split('T')[0])
    the_current_function = get_month
}

export function get_completed() {
    //refresh_storage_array()
    content.replaceChildren()
    for (const key of Object.keys(storage_array)) {
        const entry = storage_array[key]
        if (entry && entry.completed) {
            const t = make_todo(entry)
            content.appendChild(t.toDiv())
        }
    }
    the_current_function = get_completed
}




