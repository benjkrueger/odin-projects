import "./styles.css";
import { closeModal, getTodaysDate } from "./modal.js";
import {todo} from "./todo.js"
import { storage, get_today, get_project, get_tomorrow, get_week, get_month, get_completed } from "./content.js";


//const content = document.getElementById('content')


const title = document.getElementById("title")
const description = document.getElementById("description")
const date = document.getElementById('date')
date.value = getTodaysDate()
const priority = document.getElementById('priority')
const submit = document.getElementById('submit-note')

submit.addEventListener("click", () => {
    const t = new todo(title.value, description.value, date.value, priority.value)
    console.log(t)
    storage.push(t)
    closeModal()
})

get_tomorrow()
get_week()
get_month()
