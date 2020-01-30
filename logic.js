const defaultCover = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwqk6SjQi4_H4bkjypNkvtdsENLdyOSobYKj3AlYmhENt-sKeF';

const storeLibrary = (library) => {
  localStorage.setItem('myLibrary', JSON.stringify(library));
};
/* eslint-disable no-unused-vars */
const getStoredLibrary = () => JSON.parse(localStorage.getItem('myLibrary'));

function Book(title, author, year, cover = defaultCover, pageNumber, read = false) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.cover = cover;
  this.pageNumber = pageNumber;
  this.read = read;
}

const addBookToLibrary = (book, library, Book) => {
  const parsedLibrary = library;
  const {
    title, author, year, cover, pageNumber, read,
  } = book;
  const newBook = new Book(title, author, year, cover, pageNumber, read);
  parsedLibrary.push(newBook);
  storeLibrary(parsedLibrary);
<<<<<<< HEAD
};
/* eslint-enable no-unused-vars */
=======
};
>>>>>>> 4acaa9b2fcda27ee59a60fe43a1ad54fce0679c7
