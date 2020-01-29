let myLibrary = []

function Book (title) {
    this.title = title
}

const addBookToLibrary = (title, library, Book) => {
    let book = new Book(title)
    library.push(book)
}


addBookToLibrary('Killing Eve', myLibrary, Book)
addBookToLibrary('Autonomous', myLibrary, Book)
// console.log(myLibrary);

const render = (library) => {
    library.forEach(book => {
        console.log(book.title)
    })
} 
render(myLibrary);