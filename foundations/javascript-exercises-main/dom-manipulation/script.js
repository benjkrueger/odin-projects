const container = document.querySelector("#container");

const content = document.createElement("div");
content.classList.add("content");
content.textContent = "This is the glorious text-content!";

container.appendChild(content);

const p1 = document.createElement("p");
p1.textContent = "Hey I'm red"
p1.setAttribute("style", "color: red;")
container.appendChild(p1)

const h3 = document.createElement("h3")
h3.textContent = "I'm a blue h3!"
h3.setAttribute("style", "color: blue;")
container.appendChild(h3)

const div1 = document.createElement("div")
div1.setAttribute("style", "background-color: pink; border-color:black; border-style:solid")
const h1 = document.createElement("h1")
h1.textContent = "I'm in a div"
const p2 = document.createElement("p")
p2.textContent = "ME TOO!"
div1.appendChild(h1)
div1.appendChild(p2)
container.appendChild(div1)

for (let i = 1; i <= 3; i++) {
    let b = document.createElement("button")
    b.textContent = "Button " + i.toString()
    b.setAttribute("id", "button_" + i.toString())
    b.addEventListener("click", () => {
        alert(b.id)
    })
    container.appendChild(b)
}