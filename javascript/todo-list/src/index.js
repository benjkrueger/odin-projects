import "./styles.css";

class todo {
    constructor(title, description=null,dueDate=null,priority=1) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
    }
    get title() {return this._title}
    set title(value) {this.title = value}


}
