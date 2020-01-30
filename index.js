const booksSection = document.getElementById('books');
const localLibrary = localStorage.getItem('myLibrary');

// get latested localStorage values
// parse string into array
const getStoredLibrary = () => JSON.parse(localStorage.getItem('myLibrary'));


const storeLibrary = (library) => {
  // parse array into string and save it again in the locastorage
  localStorage.setItem('myLibrary', JSON.stringify(library));
};

const bookAdder = (book, index) => `<article class='book' id='book-${index}'>
  <h3>${book.title}</h3>
  <p><small> ${book.read ? 'Already read' : 'Not read yet'}</small></p>
  <p><small>${book.author} - <em>${book.year}</em></small></p>
  <figure>
    <img class='book-image' src='${book.cover}' alt="${book.title}'s cover">
  </figure>
  <p><small>Number of pages: ${book.pageNumber}</small></p>
  <button type="button" onclick="deleteBook(${index})" >Delete</button>
  <button type="button" onclick="updateBook(${index}, 'read')" >${
  book.read ? 'Mark unread book' : 'Mark book as read'
}</button>
  </article>`;

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

const render = library => {
  // if library exists in locastorage iteratate through each book else create it
  if (library) {
    const currentLibrary = JSON.parse(library);
    currentLibrary.forEach((book, i) => {
      booksSection.innerHTML = bookAdder(book, i) + booksSection.innerHTML;
    });
  } else {
    storeLibrary([]);
  }
};

render(localLibrary);

const toggleForm = () => {
  const bookForm = document.getElementById('book-form').classList;

  if (bookForm.contains('hidden-form')) {
    document.getElementById('toggle-form').classList.add('hidden-form');
  } else {
    document.getElementById('toggle-form').classList.remove('hidden-form');
  }

  bookForm.toggle('hidden-form');
};

document.getElementById('book-form').addEventListener('submit', event => {
  const library = getStoredLibrary();
  const newBook = {};

  [...event.target].forEach(input => {
    if (input.type === 'submit') {
      return;
    }
    if (input.value !== '') {
      newBook[input.name] = input.value;
    }
  });

  // Add new Book with values from form to myLibrary array
  addBookToLibrary(newBook, library, Book);
  // Get updated localStorage values
  const updateLibrary = getStoredLibrary();
  booksSection.innerHTML = bookAdder(updateLibrary[updateLibrary.length - 1],
    updateLibrary.length - 1) + booksSection.innerHTML;

  event.preventDefault();
});

const deleteBook = index => {
  const updateLibrary = getStoredLibrary();
  // take item out of array
  updateLibrary.splice(index, 1);
  storeLibrary(updateLibrary);
  document.getElementById(`book-${index}`).outerHTML = '';
};

const updateBook = (index, field) => {
  const updateLibrary = getStoredLibrary();
  // update value of read as oposite of current value
  updateLibrary[index][field] = !updateLibrary[index][field];
  storeLibrary(updateLibrary);
  document.getElementById(`book-${index}`).outerHTML = bookAdder(
    updateLibrary[index],
    index,
  );
};