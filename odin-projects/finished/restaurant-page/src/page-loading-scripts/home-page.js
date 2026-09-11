export function createHomePage(contentDiv) {
  const container = document.createElement("div");
  const h1 = document.createElement("h1");
  const p = document.createElement("p");

  container.className = "home-content";
  h1.innerText = "banda na'yan - side dish";
  p.innerText =
    "Chamoru side dishes are an important part of a traditional meal, bringing together bold flavors, fresh ingredients, and recipes that have been passed down through generations. Dishes such as red rice, fina'denne', kelaguen, cucumber salad, and pickled vegetables often accompany barbecue, seafood, and other main dishes. With flavors that can be savory, tangy, spicy, and slightly sweet, these sides are a familiar and flavorful part of Chamoru cooking and help make every plate feel complete.";

  container.appendChild(h1);
  container.appendChild(p);
  contentDiv.appendChild(container);
}
