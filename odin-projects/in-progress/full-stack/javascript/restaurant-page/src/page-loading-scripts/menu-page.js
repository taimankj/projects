import finaDenne from "../images/fina-denne.jpeg";
import hagunSuni from "../images/hagun-suni.jpeg";
import tamalesGisu from "../images/tamales-gisu.jpeg";

function createDishCard(dishName, description, img) {
  const dishCard = document.createElement("div");
  const title = document.createElement("h2");
  const paraDescription = document.createElement("p");
  const dishImg = document.createElement("img");

  title.innerText = dishName;
  paraDescription.innerText = description;
  dishImg.src = img;

  dishCard.className = "dish-card";
  dishCard.appendChild(title);
  dishCard.appendChild(dishImg);
  dishCard.appendChild(paraDescription);

  return dishCard;
}

export function createMenuPage(contentDiv) {
  const container = document.createElement("div");
  const recipeOne = createDishCard(
    `fina'denne'`,
    "Savory soy-vinegar dipping sauce with onion and chili.",
    finaDenne,
  );
  const recipeTwo = createDishCard(
    `hågun suni`,
    "Taro leaves cooked in rich coconut milk.",
    hagunSuni,
  );
  const recipeThree = createDishCard(
    `tamåles gisu`,
    "Savory Chamoru corn tamales with achote and spices.",
    tamalesGisu,
  );

  container.className = "menu-content";

  container.appendChild(recipeOne);
  container.appendChild(recipeTwo);
  container.appendChild(recipeThree);
  contentDiv.appendChild(container);
}
