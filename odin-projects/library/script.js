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
  if (books.length == 0) {
    const header = document.createElement("h1");
    header.innerText = `No books added yet!`;

    const div = document.createElement("div");
    div.className = "alert-message";
    div.appendChild(header);

    document.querySelector("body").appendChild(div);
    return;
  }
}

displayBooks(myLirbrary);
