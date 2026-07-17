class Storage {
    constructor() {
        this.todos = this.retrieve_todos()
        this.projects = this.retrieve_projects()
        console.log(this.todos, this.projects)
        this.new_id = 0
    }

    clear() {
        localStorage.removeItem('todos')
        localStorage.removeItem('projects')
        this.todos = []
        this.projects = new Set()
        console.log("CLEAR STORAGE", localStorage.getItem('todos') )
    }

    push(item) {
        console.log("PUSH", item)
        if (item.project !== undefined) {this.projects.add(item.project)}
        this.todos[item.id] = item
        this.save()
        this.new_id += 1
    }

    update(item) {
        console.log("UPDATE", item, this.todos)
        this.todos[item.id] = item
        if (!this.projects.has(this.project)) {this.projects.add(this.project)}
        this.save()
    }

    delete(item) {
        delete this.todos[item.id]
        this.save()
        this.todos = this.retrieve_todos()
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos))
        localStorage.setItem('projects', JSON.stringify([...this.projects]))
    }

    retrieve_todos() {
        let array =  (localStorage.getItem('todos') !== null) ? JSON.parse(localStorage.getItem('todos')) : []
        console.log("RT FOUND", array)
        if (array) {return array}
        const ret = {}
        console.log("RT NOT FOUND", array)
        for (const index in array) {
            const obj = array[index]
            if (!Number.isInteger(obj.id)) {
                obj.id = parseInt(index)
                ret[index] = obj
            }
        }
        this.new_id = array.length
        return ret
    }

    retrieve_projects() {
        const projects_storage  = localStorage.getItem('projects')
        
        if (projects_storage) {
            try {
                console.log("RP FOUND", projects_storage)
                const parsedArray = JSON.parse(projects_storage);
                console.log((parsedArray))
                return new Set(parsedArray);
            } catch (e) {
                
            }
        }
        
        const ret = new Set()
        ret.add(null)
        console.log("RP NOT FOUND", this.todos)
        if (this.todos) {
            for (const key of Object.keys(this.todos)) {
                const todo = this.todos[key]
                if (todo.project) {ret.add(todo.project)}
            }
        }
        return ret
    }
}

export const storage = new Storage()