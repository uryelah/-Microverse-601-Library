let library = []

function Book (title) {
    this.title = title
}

const addBookToLibrary = (title, library, Book) => {
    let book = new Book(title)
    library.push(book)
}


addBookToLibrary('Killing Eve', library, Book)
console.log(library);