export class Storage {
    constructor() {
        this.todos = this.retrieve_todos()
        this.projects = this.retrieve_projects()
        console.log("CONSTRUCTED", this.todos, this.projects)
    }

    clear() {
        localStorage.removeItem('todos')
        localStorage.removeItem('projects')
    }

    push(item) {
        console.log(item)
        if (item.project !== undefined) {this.projects.add(item.project)}
        this.todos.push(item)
        this.save()
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos))
        localStorage.setItem('projects', JSON.stringify([...this.projects]))
    }

    retrieve_todos() {
        return (localStorage.getItem('todos') !== null) ? JSON.parse(localStorage.getItem('todos')) : []
    }

    retrieve_projects() {
        const projects_storage  = localStorage.getItem('projects')
        if (projects_storage) {
            try {
                const parsedArray = JSON.parse(projects_storage);
                return new Set(parsedArray);
            } catch (e) {
                
            }
        }
        
        const ret = new Set()
        if (this.todos) {
            for (const todo of this.todos) {
                if (todo.project !== undefined) {ret.add(todo.project)}
            }
        }
        return ret
    }
}