import { Storage } from "./storage.js";
import { ToDo } from "./todo.js";
import { } from "./content.js"

const todays_date = new Date().toISOString().split('T')[0]

//const storage = new Storage()
const todo = new ToDo('title2', 'description2', todays_date, "High", "project2", false)
//storage.push(todo)