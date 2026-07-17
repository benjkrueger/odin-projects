import "./styles.css";

import { storage } from "./storage.js";
import { generate_top_buttons, generate_project_buttons} from "./navbar.js";
import { ToDo } from "./todo.js";
import { generateModal } from "./modal.js";


function start_fresh() {
    storage.clear()
    for (let i = 0; i <=3; i++) {
        let t = new ToDo(storage.new_id, "title" + i, "desc" + i, todays_date, "High", "Project" + i, false)
        storage.push(t)
        let t1 = new ToDo(storage.new_id, "title1" + i, "desc1" + i, one_day_later(), "Medium", "Project" + i, false)
        storage.push(t1)
        let t2 = new ToDo(storage.new_id, "title5" + i, "desc5" + i, five_days_later(), "Low", "Project" + i, false)
        storage.push(t2)
        let t3 = new ToDo(storage.new_id, "title13" + i, "desc13" + i, thirteen_days_later(), "High", null, false)
        storage.push(t3)
        
    }

}

const todays_date = new Date().toISOString().split('T')[0]
const one_day_later = () => {
    const date = new Date()
    date.setDate(date.getDate() + 1)
    return date.toISOString().split('T')[0]
}
const five_days_later = () => {
    const date = new Date()
    date.setDate(date.getDate() + 5)
    return date.toISOString().split('T')[0]
}
const thirteen_days_later = () => {
    const date = new Date()
    date.setDate(date.getDate() + 13)
    return date.toISOString().split('T')[0]
}

//start_fresh()

generate_top_buttons()
generate_project_buttons()
generateModal()



// id, title, description,dueDate,priority,project=undefined, completed=false)
//start_fresh()