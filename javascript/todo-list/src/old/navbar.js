/* 
<ul>
    <li id="inbox">Inbox</li>
    <li>Today</li>
    <li>Tomorrow</li>
    <li>This Week</li>
    <li>This Month</li>
    <li>Completed</li>
</ul>
*/

import {get_today, get_project, get_tomorrow, get_week, get_month, get_completed} from "./content.js";

const div = document.querySelector("#selectors")
const array = ["Inbox", "Today", "Tomorrow", "This Week", "This Month", "Completed"]
const buttons = Array.from({length:6}, () => document.createElement("button"))

function removeActive() {
    for (const button of buttons) {
        button.classList.remove("selector-button-active")
    }
}

const functions = [
    (e) => {removeActive(); e.target.classList.add("selector-button-active"); get_project(null)}, 
    (e) => {removeActive(); e.target.classList.add("selector-button-active"); get_today()}, 
    (e) => {removeActive(); e.target.classList.add("selector-button-active"); get_tomorrow()}, 
    (e) => {removeActive(); e.target.classList.add("selector-button-active"); get_week()}, 
    (e) => {removeActive(); e.target.classList.add("selector-button-active"); get_month()}, 
    (e) => {removeActive(); e.target.classList.add("selector-button-active"); get_completed()}
]
export function generate_buttons() {
    for (const index in array) {
        const btn = buttons[index]
        btn.textContent = array[index]
        btn.addEventListener("click", functions[index])
        div.appendChild(btn)
    }
    buttons[0].click()
}

export function generate_projects() {
    
}

