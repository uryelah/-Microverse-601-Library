const booksSection = document.getElementById('books');
const localLibrary = localStorage.getItem('myLibrary');

const bookAdder = (book, index) => `<article class='book' id='book-${index}'>
  <h3>${book.title}</h3>
  <p><small> ${book.read ? 'Already read' : 'Not read yet'}</small></p>
  <p><small>${book.author} - <em>${book.year}</em></small></p>
  <figure>
    <img class='book-image' src='${book.cover}' alt="${book.title}'s cover">
  </figure>
  <p><small>Number of pages: ${book.pageNumber}</small></p>
  <button type="button" onclick="deleteBook(${index})" class="btn btn-danger">Delete</button>
  <button type="button" onclick="updateBook(${index}, 'read')" class="btn btn-inactive" >${
  book.read ? 'Mark unread book' : 'Mark book as read'
}</button>
  </article>`;

const render = library => {
  // If library exists in locastorage iteratate through each book else create it
  if (library) {
    const currentLibrary = JSON.parse(library);
    currentLibrary.forEach((book, i) => {
      booksSection.innerHTML = bookAdder(book, i) + booksSection.innerHTML;
    });
  } else {
    /* eslint-disable no-undef */
    storeLibrary([]);
    /* eslint-enable no-undef */
  }
};

render(localLibrary);
/* eslint-disable no-undef, no-unused-vars */
const toggleForm = () => {
  const bookForm = document.getElementById('book-form').classList;

  if (bookForm.contains('hidden-form')) {
    document.getElementById('toggle-form').classList.add('hidden-form');
  } else {
    document.getElementById('toggle-form').classList.remove('hidden-form');
  }

  bookForm.toggle('hidden-form');
};
/* eslint-enable no-undef, no-unused-vars */

document.getElementById('book-form').addEventListener('submit', event => {
  /* eslint-disable no-undef */
  const library = getStoredLibrary();
  /* eslint-enable no-undef */
  const newBook = {};

  [...event.target].forEach(input => {
    if (input.type === 'submit') {
      return;
    }
    if (input.value !== '') {
      newBook[input.name] = input.value;
    }
  });

  /* eslint-disable no-undef */
  addBookToLibrary(newBook, library, Book);
  const updateLibrary = getStoredLibrary();
  /* eslint-enable no-undef */
  booksSection.innerHTML = bookAdder(updateLibrary[updateLibrary.length - 1],
    updateLibrary.length - 1) + booksSection.innerHTML;

  event.preventDefault();
});

/* eslint-disable no-undef, no-unused-vars */
const deleteBook = index => {
  const updateLibrary = getStoredLibrary();
  updateLibrary.splice(index, 1);
  storeLibrary(updateLibrary);
  document.getElementById(`book-${index}`).outerHTML = '';
};

const updateBook = (index, field) => {
  const updateLibrary = getStoredLibrary();
  updateLibrary[index][field] = !updateLibrary[index][field];
  storeLibrary(updateLibrary);
  document.getElementById(`book-${index}`).outerHTML = bookAdder(
    updateLibrary[index],
    index,
  );
};
/* eslint-enable no-undef, no-unused-vars */