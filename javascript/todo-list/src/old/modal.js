import "./modal-style.css";

export function getTodaysDate() {
    return new Date().toISOString().split("T")[0]
}

export function closeModal() {
    modal.classList.remove("show")
}

const modal = document.getElementById("add-note-modal")
const addNoteBtn = document.querySelector("#add-note")
addNoteBtn.addEventListener("click", () => {modal.classList.add("show")})
const closeModalBtn = document.querySelector("#closeModalBtn")
closeModalBtn.addEventListener("click", closeModal)
//addNoteBtn.click() // TODO Delete Later

