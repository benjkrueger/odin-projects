/*---------------------------------
█   █  ███  █   █ ████   ███  ████  
██  █ █   █ █   █ █   █ █   █ █   █ 
█ █ █ █████ █   █ ████  █████ ████  
█  ██ █   █  █ █  █   █ █   █ █  █  
█   █ █   █   █   ████  █   █ █   █ 
---------------------------------*/
import * as content from "./content.js"
import {storage} from "./storage.js"
const topDiv = document.querySelector("#selectors")
export const navArray = ["Inbox", "Today", "Tomorrow", "This Week", "This Month", "Completed"]
export const navButtons = Array.from({length:6}, () => document.createElement("button"))
export let navActiveIndex = 0

const bottomDiv = document.querySelector("#project-selectors")
export const project_buttons = []
export let projectActiveIndex = 0

function removeActive() {
    for (const button of navButtons) {
        button.classList.remove("selector-button-active")
    }
    for (const button of project_buttons) {
        button.classList.remove("selector-button-active")
    }
}

const functions = [
    (e) => {removeActive(); e.target.classList.add("selector-button-active"); content.get_project(null); navActiveIndex = 0}, 
    (e) => {removeActive(); e.target.classList.add("selector-button-active"); content.get_today(); navActiveIndex = 1}, 
    (e) => {removeActive(); e.target.classList.add("selector-button-active"); content.get_tomorrow(); navActiveIndex = 2}, 
    (e) => {removeActive(); e.target.classList.add("selector-button-active"); content.get_week(); navActiveIndex = 3}, 
    (e) => {removeActive(); e.target.classList.add("selector-button-active"); content.get_month(); navActiveIndex = 4}, 
    (e) => {removeActive(); e.target.classList.add("selector-button-active"); content.get_completed(); navActiveIndex = 5}
]
export function generate_top_buttons() {
    for (const index in navArray) {
        const btn = navButtons[index]
        btn.textContent = navArray[index]
        btn.addEventListener("click", functions[index])
        topDiv.appendChild(btn)
    }
    navButtons[0].click()
}


export function generate_project_buttons() {
    const project_array = storage.retrieve_projects()
    for (const [index, project_name] of project_array.entries()) {
        if (project_name) {
            const btn = document.createElement("button")
            btn.textContent = project_name
            btn.addEventListener("click", () => {
                removeActive()
                btn.classList.add("selector-button-active")
                content.get_project(project_name)
                projectActiveIndex = index
            })
            bottomDiv.appendChild(btn)
            project_buttons.push(btn)
        }
        console.log("GPB", project_name)
    }
    console.log("GPB", project_array)
}