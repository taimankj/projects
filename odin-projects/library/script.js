const myLibrary = [];

class Book {
  constructor(author, title) {
    this.author = author;
    this.title = title;
    this.id = crypto.randomUUID();
  }
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
  tbody.innerHTML = "";
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

const form = document.querySelector("form");
const dialog = document.querySelector("dialog#add-book");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  let userInput = Object.fromEntries(formData.entries());

  addBookToLibrary(userInput.author, userInput.book);

  author.value = "";
  book.value = "";
  dialog.close();

  displayBooks(myLibrary);
});

displayBooks(myLibrary);
