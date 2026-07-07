
import odinImage from "./odin.png"


const generate_and_append_element = (div, element_name, text_content, classes) => {
    const elem = document.createElement(element_name)
    elem.textContent = text_content
    for (const c of classes) {
        elem.classList.add(c)
    }
    div.appendChild(elem)
    return elem
}

const create_and_append_list = (div, texts) => {
    const ul = document.createElement("ul")
    for (const i in texts) {
        const li = document.createElement("li")
        li.textContent = texts[i]
        ul.appendChild(li)
    }
    div.appendChild(ul)
    return ul
}

const create_and_append_menu_item = (div, name, description, price, image) => {
    const div1 = generate_and_append_element(div, "div","",[])
    div1.classList.add("honeycomb")
    generate_and_append_element(div1, "h3",name,[])
    generate_and_append_element(div1, "p", description, [] )
    generate_and_append_element(div1, "p", price, ["big-text"] )
    
    const img = document.createElement("img");
    img.src = image;
    img.classList.add("menu-image")
    div1.appendChild(img)
}

const clear_center_column = (div) => {
    const childDiv = document.querySelector(".center-column")
    if (childDiv !== null) div.removeChild(childDiv)
}

export const make_homepage = (div) => {
    clear_center_column(div)

    const div_center = generate_and_append_element(div, "div", "", ["center-column"])
    generate_and_append_element(div_center, "h1","Beary's Breakfast Bar",[])

    const div_comb1 = generate_and_append_element(div_center, "div", "", ["honeycomb"])
    generate_and_append_element(div_comb1, "p", "Beary's has the best porridge! The atmosphere and customer service make you feel like you are sitting in the middle of the woods, eating like a bear! This is exactly the kind of place that I like to return to again and again.", [])
    generate_and_append_element(div_comb1, "p", "Goldilocks", ["big-text"])

    const div_comb2 = generate_and_append_element(div_center, "div", "", ["honeycomb"])
    generate_and_append_element(div_comb2, "p", "Hours", ["big-text"])
    create_and_append_list(div_comb2, ["Sunday: 8am - 8pm","Monday: 6am - 6pm","Tuesday: 6am - 6pm","Wednesday: 6am - 6pm","Thursday: 6am - 10pm","Friday: 6am - 10pm","Saturday: 8am - 10pm"])

    const div_comb3 = generate_and_append_element(div_center, "div", "", ["honeycomb"])
    generate_and_append_element(div_comb3, "p", "Location", ["big-text"])
    generate_and_append_element(div_comb3, "p", "123 Forest Drive, Forestville, Maine", [])
}

export const make_menupage = (div) => {
    clear_center_column(div)
    const div_center = generate_and_append_element(div, "div", "", ["center-column"])
    generate_and_append_element(div_center, "h1","Menu",[])

    generate_and_append_element(div_center, "h2","Beverages",[])
    create_and_append_menu_item(div_center, "Honey Tea", "A warm, sweet tea made with the highest quality honey and a bit of lemon to start your day off right!", "$2", odinImage)
    create_and_append_menu_item(div_center, "Beary Tea", "A comforting, almost filling, tea that is infused with the flavors of several kinds of berries. Best served cold, but can be served hot on request.", "$3", odinImage)

    generate_and_append_element(div_center, "h2","Sides",[])
    create_and_append_menu_item(div_center, "Toast and Jam", "A slice of toast, your choice of bread, and our homemade blackberry or raspberry jam.", "$1", odinImage)
    create_and_append_menu_item(div_center, "Fresh Fruit", "A small bowl of fresh fruit, whatever we find at the market for the day.", "$3", odinImage)

    generate_and_append_element(div_center, "h2","Main Dishes",[])
    create_and_append_menu_item(div_center, "Pancakes", "A stack of homemade buttermilk pancakes, served with our locally sourced maple syrup.", "$4", odinImage)
    create_and_append_menu_item(div_center, "French Toast", "Two slices of the best french toast you will ever eat, served with our locally sourced maple syrup.", "$5", odinImage)
    create_and_append_menu_item(div_center, "Beary Veggie Sandwich", "Do you like vegetables? Then this is the sandwich for you! Stuffed full of a variety of fresh produce, it will fill you up.", "$8", odinImage)
    create_and_append_menu_item(div_center, "BLT", "Interested in the Beary Veggie Sandwich but also love bacon? Say no more.", "$6", odinImage)
    create_and_append_menu_item(div_center, "Bagel and Lox", "Our house specialty, you can't go wrong with a hearty bagel topped with sustainably harvested salmon.", "$8", odinImage)
    create_and_append_menu_item(div_center, "Honeycomb", "Are you a bear like us? Then you will love our honeycomb. And, yes humans, it is just a piece of honeycomb, not the popular breakfast cereal.", "$6", odinImage)
    create_and_append_menu_item(div_center, "Beary Bowl", "Get a big ole bowl of our berries! Side of honey is $1 extra.", "$7", odinImage)
    create_and_append_menu_item(div_center, "The Beary Best Porridge", "Made by Baby Bear himself, this porridge is guarenteed to be just right, or your money back.", "$5", odinImage)
}

export const make_contactpage = (div) => {
    clear_center_column(div)
    
    const div_center = generate_and_append_element(div, "div", "", ["center-column"])
    generate_and_append_element(div_center, "h1","Contact Us",[])

    const div_comb1 = generate_and_append_element(div_center, "div", "", ["honeycomb"])
    generate_and_append_element(div_comb1, "p", "Mama Bear", ["big-text"])
    create_and_append_list(div_comb1, ["Chef","555-555-5554","totallyRealEmail@notFake.com"])

    const div_comb2 = generate_and_append_element(div_center, "div", "", ["honeycomb"])
    generate_and_append_element(div_comb2, "p", "Papa Bear", ["big-text"])
    create_and_append_list(div_comb2, ["Manager","555-555-5555","perfectlyRealEmail@notFake.com"])

    const div_comb3 = generate_and_append_element(div_center, "div", "", ["honeycomb"])
    generate_and_append_element(div_comb3, "p", "Baby Bear", ["big-text"])
    create_and_append_list(div_comb3, ["Waiter","555-555-5556","totallyRealEmail@notFake.com"])
}