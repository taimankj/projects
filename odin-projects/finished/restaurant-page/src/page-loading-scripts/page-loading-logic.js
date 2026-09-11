import { createHomePage } from "./home-page.js";
import { createMenuPage } from "./menu-page.js";

function clearContentPane() {
  const contentDiv = document.querySelector("#content");
  while (contentDiv.firstChild) {
    contentDiv.removeChild(contentDiv.firstChild);
  }
}

function loadHomePage() {
  clearContentPane();
  createHomePage(document.querySelector("#content"));
}

function loadMenuPage() {
  clearContentPane();
  createMenuPage(document.querySelector("#content"));
}

export { clearContentPane, loadHomePage, loadMenuPage };
