export class Storage {
    constructor() {
        this.todos = this.retrieve_todos()
        this.projects = this.retrieve_projects()
    }

    push(item) {
        this.todos.push(item)
        this.projects.push(item.project)
        console.log(this.todos)
        this.save_todos()
    }

    save_todos() {
        localStorage.setItem('todos', JSON.stringify(this.todos))
    }

    retrieve_todos() {
        return (localStorage.getItem('todos') !== null) ? JSON.parse(localStorage.getItem('todos')) : []
    }

    retrieve_projects() {
        return []
    }
}