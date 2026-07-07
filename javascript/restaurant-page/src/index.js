import "./styles.css";
import { greeting } from "./greeting.js";
import { make_homepage, make_menupage, make_contactpage } from "./create_homepage.js";


const div = document.querySelector("#content")
make_homepage(div)

const homeBtn = document.querySelector("#homeBtn")
const menuBtn = document.querySelector("#menuBtn")
const contactBtn = document.querySelector("#contactBtn")

homeBtn.addEventListener("click", () => make_homepage(div))
menuBtn.addEventListener("click", () => make_menupage(div))
contactBtn.addEventListener("click", () => make_contactpage(div))


