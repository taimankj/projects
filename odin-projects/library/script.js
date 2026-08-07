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

addBookToLibrary("J.K. Rowling", "Harry Potter and the Goblet of Fire");
