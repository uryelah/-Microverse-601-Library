let booksSection = document.getElementById("books");

const bookAdder = (book, index) => {
  return `<article class='book' id='book-${index}'>
  <h3>${book.title}</h3>
  <p><small>${book.author} - <em>${book.year}</em></small></p>
  <figure>
    <img class='book-image' src='${book.cover}' alt="${book.title}'s cover">
  </figure>
  </article>`;
};

let myLibrary = [];

function Book(title, author, year, cover) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.cover = cover;
};

const addBookToLibrary = (book, library, Book) => {
  const { title, author, year, cover } = book;
  let newBook = new Book(title, author, year, cover);
  library.push(newBook);
};

addBookToLibrary({ title: "Killing Eve", author: 'Christina Chen', year: '2005', cover: 'https://http2.mlstatic.com/dvd-killing-eve-1-temporada-completa-frete-gratis-D_NQ_NP_926551-MLB28004445126_082018-F.jpg' }, myLibrary, Book);
addBookToLibrary({ title: "Autonomous", author: 'Christina Chen', year: '2005', cover: 'https://http2.mlstatic.com/dvd-killing-eve-1-temporada-completa-frete-gratis-D_NQ_NP_926551-MLB28004445126_082018-F.jpg' }, myLibrary, Book);

const render = library => {
  library.forEach((book, i) => {
    booksSection.innerHTML += bookAdder(book, i);
  });
};
render(myLibrary);
console.log(myLibrary)