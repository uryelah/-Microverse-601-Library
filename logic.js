// The function bellow will get the library at the loca storage and parse the string into array
const getStoredLibrary = () => JSON.parse(localStorage.getItem('myLibrary'));

// The funciton bellow will parse an array of books into string and save it in the local storage
const storeLibrary = (library) => {
  localStorage.setItem('myLibrary', JSON.stringify(library));
};

const defaultCover = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwqk6SjQi4_H4bkjypNkvtdsENLdyOSobYKj3AlYmhENt-sKeF';

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
};
