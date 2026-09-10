# odin-etch-a-sketch

# Etch-a-Sketch

A browser-based sketchpad built with HTML, CSS, and vanilla JavaScript. Hovering the mouse over the grid leaves a pixelated trail, and the grid resolution can be changed on the fly.

## Requirements

### 1. Build the grid

Create a webpage with a 16x16 grid of square divs.

- Generate the divs with JavaScript — do **not** hand-write or copy-paste them into the HTML.
- Put the grid squares inside a `container` div. That container can live in the HTML file.
- Use **Flexbox** to lay the divs out as a grid. Despite the name, avoid CSS Grid — it's taught in a later lesson, and this project exists specifically to practice Flexbox.
- Watch out for borders and margins; they can throw off the size of the squares.

### 2. Add the hover effect

Set up a hover effect so grid divs change color when the mouse passes over them, leaving a trail like a pen.

- Hovering starts when the mouse enters a div and ends when it leaves. Event listeners for either event are a good starting point.
- Ways to change the color include:
  - Adding a new class to the div.
  - Setting the div's `background-color` directly in JavaScript.

### 3. Add a resize button

Add a button at the top of the screen that prompts the user for the number of squares per side. Once entered, the existing grid is removed and a new one is generated **in the same total space** (e.g. 960px wide), giving a fresh sketchpad.

- Look into `prompt`.
- Cap user input at **100** squares per side. Larger grids eat computer resources and can cause delays, freezing, or crashes.
- Entering `64` should produce a brand new 64x64 grid without changing the total pixel dimensions.

## Troubleshooting

> "OMG, why isn't my grid being created???"

- Did you link your CSS stylesheet?
- Open your browser's developer tools.
- Check the JavaScript console for errors.
- Check the Elements panel to see whether the elements exist but are somehow hidden.
- Go willy-nilly and scatter `console.log` statements through your JavaScript to confirm it's actually loading.
