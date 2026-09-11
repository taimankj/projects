import "./styles.css";
import {
  clearContentPane,
  loadHomePage,
  loadMenuPage,
} from "./page-loading-scripts/page-loading-logic.js";

const homeBtn = document.querySelector("#home-btn");
const menuBtn = document.querySelector("#menu-btn");

loadHomePage();

homeBtn.addEventListener("click", () => {
  menuBtn.className = "";
  homeBtn.className = "btn-selected";
  loadHomePage();
});

menuBtn.addEventListener("click", () => {
  homeBtn.className = "";
  menuBtn.className = "btn-selected";
  loadMenuPage();
});
