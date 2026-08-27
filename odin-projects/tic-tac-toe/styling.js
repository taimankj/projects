// home page
const xLabel = document.querySelector('label[for="x"]');
const xRadio = document.querySelector('input#x[type="radio"]');
const oLabel = document.querySelector('label[for="o"]');
const oRadio = document.querySelector('input#o[type="radio"]');

xRadio.addEventListener("click", (e) => {
  xLabel.className = "x-chosen";
  oLabel.className = "";
});

oRadio.addEventListener("click", (e) => {
  oLabel.className = "o-chosen";
  xLabel.className = "";
});
