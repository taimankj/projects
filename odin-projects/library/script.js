const myLirbrary = [];

function Book(author, title) {
  this.author = author;
  this.title = title;
  this.id = crypto.randomUUID();

  this.info = () =>
    `Author: ${this.author}\nTitle: ${this.title}\nEntry-ID: ${this.id}`;
}

function addBookToLibrary(author, title) {
  const newBook = new Book(author, title);
  myLirbrary.push(newBook);
}

function displayBooks(books) {
  const table = document.createElement("table");

  if (books.length == 0) {
    const header = document.createElement("h1");
    header.innerText = `No books added yet!`;
    return;
  }
}
