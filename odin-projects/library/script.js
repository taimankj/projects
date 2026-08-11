const myLibrary = [];

function Book(author, title) {
  this.author = author;
  this.title = title;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(author, title) {
  const newBook = new Book(author, title);
  myLibrary.push(newBook);
}

function displayBooks(books) {
  if (books.length == 0) {
    alertUserNoBooksAdded();
    return;
  }

  const tbody = document.querySelector(".books tbody");
  for (let i = 0; i < books.length; i++) {
    const tr = document.createElement("tr");

    for (const prop in books[i]) {
      const td = document.createElement("td");
      td.innerText = `${books[i][prop]}`;
      tr.appendChild(td);
    }

    appendRemoveButton(tr);
    tbody.appendChild(tr);
  }
}

function alertUserNoBooksAdded() {
  const header = document.createElement("h1");
  header.innerText = `No books added yet!`;

  const div = document.createElement("div");
  div.className = "alert-message";
  div.appendChild(header);

  document.querySelector("body").appendChild(div);
}

function appendRemoveButton(ele) {
  const button = document.createElement("button");
  button.className = "delete";
  button.type = "button";
  button.innerText = "Remove";

  const td = document.createElement("td");
  td.className = "table-button";
  td.appendChild(button);
  ele.appendChild(td);
}

const submitButton = document.querySelector('button[type="submit"]');
const dialog = document.querySelector("dialog#add-book");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  let author = document.querySelector("#author");
  let book = document.querySelector("#book");

  addBookToLibrary(author.value, book.value);

  author.value = "";
  book.value = "";
  dialog.close();
});

// Test books
// addBookToLibrary("George Orwell", "1984");
// addBookToLibrary("J.R.R. Tolkien", "The Hobbit");
// addBookToLibrary("Harper Lee", "To Kill a Mockingbird");
// addBookToLibrary("F. Scott Fitzgerald", "The Great Gatsby");
// addBookToLibrary("Jane Austen", "Pride and Prejudice");
// addBookToLibrary("Ray Bradbury", "Fahrenheit 451");
// addBookToLibrary("Mary Shelley", "Frankenstein");
// addBookToLibrary("Bram Stoker", "Dracula");
// addBookToLibrary("Herman Melville", "Moby-Dick");
// addBookToLibrary("J.D. Salinger", "The Catcher in the Rye");
// addBookToLibrary("Aldous Huxley", "Brave New World");
// addBookToLibrary("Douglas Adams", "The Hitchhiker's Guide to the Galaxy");
// addBookToLibrary("Stephen King", "The Shining");
// addBookToLibrary("Frank Herbert", "Dune");
// addBookToLibrary("Suzanne Collins", "The Hunger Games");
// addBookToLibrary("Andy Weir", "The Martian");
// addBookToLibrary("Cormac McCarthy", "The Road");
// addBookToLibrary("Margaret Atwood", "The Handmaid's Tale");
// addBookToLibrary("William Golding", "Lord of the Flies");
// addBookToLibrary("Khaled Hosseini", "The Kite Runner");

displayBooks(myLibrary);
