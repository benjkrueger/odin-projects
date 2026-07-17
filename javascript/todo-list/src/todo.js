import { storage } from "./storage.js";
import {navArray, navButtons, navActiveIndex} from "./navbar.js"
import { refresh_content } from "./content.js";
import { set_edit_mode, show_modal } from "./modal.js";
const content = document.getElementById('content')

export class ToDo {
    constructor(id, title, description,dueDate,priority,project=undefined, completed=false) {
        this.id = id
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.project = project
        this.completed = completed
    }

    toggle_complete(obj) {
        obj.completed = !obj.completed
        storage.update(obj)
    }

    toDiv() {
        function priorityClassIL(element, text) {
            let index
            if (text === "High") {index = 2}
            else if (text === "Medium") {index = 1}
            else if (text === "Low") {index = 0}
            const class_array = ["low-priority", "medium-priority", "high-priority"]
            for (const i in class_array) {
                element.classList.remove(class_array[i])
            }
            element.classList.add(class_array[index])
        }

        const newDiv = document.createElement('div')

        const title = document.createElement('h4')
        title.textContent = this.title

        const description = document.createElement('p')
        description.textContent = this.description

        const dueDate = document.createElement('p')
        dueDate.textContent = this.dueDate
        const priority = document.createElement('p')
        priority.textContent = this.priority
        priorityClassIL(priority, this.priority)

        const checkbox = document.createElement('input')
        checkbox.checked = this.completed
        checkbox.type = 'checkbox'
        checkbox.addEventListener('click', () => {
            this.toggle_complete(this)
            if (this.completed) {checkbox.checked === true}
            console.log("CHECKBOX", this.completed, checkbox.checked)
            navButtons[navActiveIndex].click()
        })
        
        const editBtn = document.createElement('img')
        editBtn.src = "https://kaylubr.github.io/todolist/463ff738145b243b71e9.svg"
        editBtn.addEventListener("click", () => {
            console.log("EDIT BTN CLICK")
            set_edit_mode(this.id)
            show_modal()
        })

        const delBtn = document.createElement('img')
        delBtn.src = "https://kaylubr.github.io/todolist/e148ea9e234d2ea1af55.svg"
        delBtn.addEventListener("click", () => 
        {
            console.log("DEL BTN CLICK", this)
            storage.delete(this)
            refresh_content()
        })

        const project = document.createElement('p')
        project.textContent = this.project

        //<img src="https://kaylubr.github.io/todolist/463ff738145b243b71e9.svg">
        //<img src="https://kaylubr.github.io/todolist/e148ea9e234d2ea1af55.svg">
        newDiv.classList.add("entry")
        newDiv.appendChild(checkbox)
        newDiv.appendChild(title)    
        newDiv.appendChild(description)    
        newDiv.appendChild(project)
        newDiv.appendChild(dueDate)    
        newDiv.appendChild(priority)
        newDiv.appendChild(editBtn)
        newDiv.appendChild(delBtn)
        return newDiv
    }

}