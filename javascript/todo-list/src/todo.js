let id = 0

export class ToDo {
    constructor(title, description,dueDate,priority,project=undefined, completed=false) {
        this.id = id
        id++
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.project = project
        this.completed = completed
    }

    toggle_complete() {
        this.completed = !this.completed
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
        checkbox.type = 'checkbox'
        checkbox.addEventListener('click', this.toggle_complete)
        if (this.completed) {checkbox.checked === true}
        
        newDiv.classList.add("entry")
        newDiv.appendChild(checkbox)
        newDiv.appendChild(title)    
        newDiv.appendChild(description)    
        newDiv.appendChild(dueDate)    
        newDiv.appendChild(priority)
        return newDiv
    }

}