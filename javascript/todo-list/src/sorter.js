import {sort_content_and_update} from "./content.js"

export function generate_sorter() {
    const sorter = document.getElementById("sorter")
    sorter.classList.add("entry")
    for (const text of ['✓', 'Title', 'Description', 'Project', 'Date', 'Priority']) {
        const  p = document.createElement("p")
        p.textContent = text
        p.addEventListener("click", () => {
            console.log(text, "SORTER PRESSED")
            sort_content_and_update(text)
        })
        sorter.appendChild(p)
    }
    
}

