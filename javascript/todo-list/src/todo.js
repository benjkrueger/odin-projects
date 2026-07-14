export class todo {
    constructor(title, description,dueDate,priority,completed=false, project=undefined) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.completed = completed
        this.project = project
    }

    toggle_complete() {
        this.completed = !this.completed
    }

    toDiv() {
        const newDiv = document.createElement('div')
        const title = document.createElement('h4')
        const description = document.createElement('p')
        const dueDate = document.createElement('p')
        const priority = document.createElement('p')
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.addEventListener('click', this.toggle_complete)
        if (this.completed) {checkbox.checked = true}
        title.textContent = this.title
        description.textContent = this.description
        dueDate.textContent = this.dueDate
        priority.textContent = this.priority
        
        if (this.priority === "High") {
            priority.classList.remove("low-priority")
            priority.classList.remove("medium-priority")
            priority.classList.add("high-priority")
        }  else if (this.priority === "Medium") {
            priority.classList.remove("low-priority")
            priority.classList.add("medium-priority")
            priority.classList.remove("high-priority")
            priority.style.color="black"
        }  else if (this.priority === "Low") {
            priority.classList.add("low-priority")
            priority.classList.remove("medium-priority")
            priority.classList.remove("high-priority")
        }
        newDiv.classList.add("entry")
        newDiv.appendChild(checkbox)
        newDiv.appendChild(title)    
        newDiv.appendChild(description)    
        newDiv.appendChild(dueDate)    
        newDiv.appendChild(priority)
        return newDiv
    }
}