let booksSection = document.getElementById("books");
let localLibrary = localStorage.getItem('myLibrary');


const bookAdder = (book, index) => {
  return `<article class='book' id='book-${index}'>
  <h3>${book.title}</h3>
  <p><small> ${book.read ? "Already read" : "Not read yet"}</small></p>
  <p><small>${book.author} - <em>${book.year}</em></small></p>
  <figure>
    <img class='book-image' src='${book.cover}' alt="${book.title}'s cover">
  </figure>
  <p><small>Number of pages: ${book.pageNumber}</small></p>
  <button type="button" onclick="deleteBook(${index})" >Delete</button>
  <button type="button" onclick="updateBook(${index}, 'read')" >${
    book.read ? "Mark unread book" : "Mark book as read"
  }</button>
  </article>`;
};

function Book(title, author, year, cover, pageNumber, read = false) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.cover = cover;
  this.pageNumber = pageNumber;
  this.read = read;
}

const addBookToLibrary = (book, library, Book) => {
  let parsedLibrary = library;
  const { title, author, year, cover, pageNumber, read } = book;
  let newBook = new Book(title, author, year, cover, pageNumber, read);
  parsedLibrary.push(newBook);
  localStorage.setItem('myLibrary', JSON.stringify(parsedLibrary))
};
/*
addBookToLibrary(
  {
    title: "Killing Eve",
    author: "Christina Chen",
    year: "2005",
    cover:
      "https://http2.mlstatic.com/dvd-killing-eve-1-temporada-completa-frete-gratis-D_NQ_NP_926551-MLB28004445126_082018-F.jpg",
    pageNumber: 15,
    read: true
  },
  myLibrary,
  Book
);
addBookToLibrary(
  {
    title: "Autonomous",
    author: "Christina Chen",
    year: "2005",
    cover:
      "https://http2.mlstatic.com/dvd-killing-eve-1-temporada-completa-frete-gratis-D_NQ_NP_926551-MLB28004445126_082018-F.jpg",
    pageNumber: 15
  },
  myLibrary,
  Book
);
*/
const render = library => {
  // if library exists in locastorage iteratate through each book else create it
  if (library) {
    let currentLibrary = JSON.parse(library)
    currentLibrary.forEach((book, i) => {
      booksSection.innerHTML = bookAdder(book, i) + booksSection.innerHTML;
    });
  } else {
    localStorage.setItem('myLibrary', JSON.stringify([]));
  }
};

render(localLibrary);

const toggleForm = () => {
  document.getElementById("book-form").classList.toggle("hidden-form");
};

document.getElementById("book-form").addEventListener("submit", event => {
  localLibrary = localStorage.getItem('myLibrary');
  let newBook = {};

  [...event.target].forEach(input => {
    if (input.type === "submit") {
      return;
    } else {
      newBook[input.name] = input.value;
    }
  });

  // Add new Book with values from form to myLibrary array
  addBookToLibrary(newBook, JSON.parse(localLibrary), Book);
  // Get updated localStorage values
  localLibrary = localStorage.getItem('myLibrary');
  updateLibrary = JSON.parse(localLibrary);
  booksSection.innerHTML =
    bookAdder(updateLibrary[updateLibrary.length - 1], updateLibrary.length - 1) +
    booksSection.innerHTML;

  event.preventDefault();
});

const deleteBook = index => {
  // get latested localStorage values
  localLibrary = localStorage.getItem('myLibrary');
  // parse string into array
  let updateLibrary = JSON.parse(localLibrary);
  // take item out of array
  updateLibrary.splice(index, 1);
  // parse array into string and save it again in the locastorage
  localStorage.setItem('myLibrary', JSON.stringify(updateLibrary));
  document.getElementById(`book-${index}`).outerHTML = "";
};

const updateBook = (index, field) => {
  // get latested localStorage values
  localLibrary = localStorage.getItem('myLibrary');
  // parse string into array
  let updateLibrary = JSON.parse(localLibrary);
  // update value of read as oposite of current value
  updateLibrary[index][field] = !updateLibrary[index][field];
  // parse array into string and save it again in the locastorage
  localStorage.setItem('myLibrary', JSON.stringify(updateLibrary));
  document.getElementById(`book-${index}`).outerHTML = bookAdder(
    updateLibrary[index],
    index
  );
};
