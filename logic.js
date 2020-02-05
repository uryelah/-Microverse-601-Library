const defaultCover = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwqk6SjQi4_H4bkjypNkvtdsENLdyOSobYKj3AlYmhENt-sKeF';

const storeLibrary = (library) => {
  localStorage.setItem('myLibrary', JSON.stringify(library));
};
/* eslint-disable no-unused-vars */
const getStoredLibrary = () => JSON.parse(localStorage.getItem('myLibrary'));

class Book {
  constructor(book) {
    const {
      title, author, year, cover = defaultCover, pageNumber, read = false,
    } = book;
    this.title = title;
    this.author = author;
    this.year = year;
    this.cover = cover;
    this.pageNumber = pageNumber;
    this.read = read;
  }

  addBookToLibrary(library) {
    const parsedLibrary = library;
    parsedLibrary.push(this);
    storeLibrary(parsedLibrary);
  }
}

/* eslint-enable no-unused-vars */
