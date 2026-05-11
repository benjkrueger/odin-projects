class Book {
    constructor(title, author, pages, read)  {
        this.title = title
        this.author = author 
        this.pages = pages
        this.read = read
        this.id = crypto.randomUUID()
    }
    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ` + (this.read ? "already read" : "not read yet")
    }

    toggle_read_status() {
        this.read = !this.read
    }
}

function getBookHTML(book, library) {
    const newDiv = document.createElement('div')
    newDiv.classList.add("book")
    const title = document.createElement('h5')
    title.textContent = book.title
    const author = document.createElement('p')
    author.textContent = book.author
    const pages = document.createElement('p')
    pages.textContent = book.pages.toString() + " pages"
    const read_btn = document.createElement('button')
    read_btn.textContent = (book.read) ? "unread book" : "read book"
    read_btn.addEventListener("click", () => {
        book.toggle_read_status()
        library.showLibrary()
    })
    const del_btn = document.createElement('button')
    del_btn.textContent = "Remove Book"
    del_btn.addEventListener("click", () => {
        library.removeBookFromLibrary(book)
        library.showLibrary()
    })
    newDiv.appendChild(title)
    newDiv.appendChild(author)
    newDiv.appendChild(pages)
    newDiv.appendChild(read_btn)
    newDiv.appendChild(del_btn)
    newDiv.style.backgroundColor = (book.read) ? "darkblue" : "darkred";
    return newDiv
}

class Library {
    constructor() {
        this.books = []
    }

    addBookToLibrary(new_book) {
        this.books.push(new_book)
        console.log("book added", this.books)
    }

    showLibrary() {
        const container = document.getElementById('library-container')
        container.replaceChildren();
        this.books.forEach((book) => {
            console.log(book)
            const newDiv = getBookHTML(book, this)
            container.appendChild(newDiv)
        })
    }

    removeBookFromLibrary(book) {
        const index = this.books.indexOf(book)
        if (index > -1) {this.books.splice(index, 1)}
    }
}

function getBookFromInputs() {
    const title = document.getElementById("title").value
    const author = document.getElementById("author").value
    const pages = document.getElementById("pages").value
    const read = (document.getElementById("read").value === "true") ? true : false
    console.assert(!isNaN(pages))
    if (!isNaN(pages))
    return new Book(title, author, Number(pages), read)
}

const a = new Book("The Hobbit", "J.R.R. Tolkien", 295, false)
const b = new Book("Project Hail Mary", "Some Guy", 100, true)
const library = new Library()
library.addBookToLibrary(a)
library.addBookToLibrary(b)
library.showLibrary()
const addBookBtn = document.getElementById("add-book-btn")
addBookBtn.addEventListener("click", () => {
    library.addBookToLibrary(getBookFromInputs())
    library.showLibrary()
})