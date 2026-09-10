// Variables for calculations
let n1 = ""; // number 1 input
let n2 = ""; // number 2 input
let op = ""; // operator

// DOM Nodes
let buttons = document.querySelectorAll("button");
let outputArea = document.querySelector("#output");
let historyArea = document.querySelector("#history");

function add(n1, n2) {
  return n1 + n2;
}

function subtract(n1, n2) {
  return n1 - n2;
}

function multiply(n1, n2) {
  return n1 * n2;
}

function divide(n1, n2) {
  // Rounds the quotient to two decimal places so long decimals don't overflow
  // (handles Gotcha: "round answers with long decimals")
  // NOTE: only divide is rounded; +, -, * can still overflow the display
  return Math.round((n1 / n2 + Number.EPSILON) * 100) / 100;
}

function operate(n1, n2, op) {
  switch (op) {
    case "+":
      return add(n1, n2);
    case "-":
      return subtract(n1, n2);
    case "*":
      return multiply(n1, n2);
    case "/":
      return divide(n1, n2);
    default:
      return "INVALID INPUT";
  }
}

function isSet(...variables) {
  let isVarSet = true;
  for (const i in variables) {
    if (!variables[i]) isVarSet = false;
  }

  return isVarSet;
}

function clearState() {
  // Wipes display and all state so the user starts fresh
  // (handles Gotcha: "clear should wipe out any existing data")
  historyArea.innerText = "";
  outputArea.innerText = "";
  n1 = "";
  n2 = "";
  op = "";
}

function evaluateCalculation() {
  let calculatedVal = operate(+n1, +n2, op);

  historyArea.innerText = `${n1} ${op} ${n2}`;
  outputArea.innerText = `${calculatedVal} ${op}`;
  n1 = `${calculatedVal}`; // carry result forward as n1 for chained operations
  n2 = "";
}

function processInput(input) {
  /*
  if operator is equals and if n1, op, and n2 is set,
     process expression: n1 op n2
     set innerText for history and output area to ''
     set n1, op, n2 to ''
  else if input is 'clear'
     set innerText for history and output area to ''
     set n1, op, n2 to ''
  else if input is '.', then
     if op is set and n2 has no decimal, append '.' to n2
     else if n1 is set, op is not set, and n1 has no decimal, append '.' to n1
  else if input is not a number (+, *, -, or /), then
     if n1, n2, and op are all set, evaluate first, then set op to input
     else if n1 is not initialized, set n1 to '0'
     set op to input
  else input is number, then
     if operator is set
         if dividing by zero, show snarky message and bail
         if n2 is set, then append input to n2
         else, set n2 to input
     else,
         if n1 is set, then append input to n1
         else, set n1 to input
  */

  if (input == "=" && isSet(n1, n2, op)) {
    // Only evaluates with two numbers AND an operator present
    // (handles Gotcha: "pressing = before entering all numbers/operator")
    evaluateCalculation();
    return;
  } else if (input == "clear") {
    clearState();
  } else if (input == ".") {
    // Guard prevents a second decimal point in the same number
    if (isSet(op) && !n2.includes(".")) {
      n2 += input;
      outputArea.innerText = `${n1} ${op} ${n2}`;
      return;
    }

    if (isSet(n1) && !isSet(op) && !n1.includes(".")) {
      n1 += input;
      outputArea.innerText = `${n1} ${op} ${n2}`;
      return;
    }
  } else if (Number.isNaN(+input)) {
    // Second consecutive operator: evaluate the existing pair first,
    // then keep the new operator for the next operation
    // (handles Gotcha: "only take the last operator" / chained ops)
    if (isSet(n1, n2, op)) {
      evaluateCalculation();
      op = input;
      outputArea.innerText = `${n1} ${op} `;
      return;
    }
    // BUG (Gotcha: "consecutive operator presses"): when n1 is set but n2
    // is empty, pressing another operator just overwrites op. That's the
    // desired "only take the last operator" behavior, so this branch is
    // actually fine — but note it silently replaces op with no display
    // update, so the screen won't show the operator change here.
    if (!isSet(n1)) n1 = "0";
    op = input;
  } else {
    if (isSet(op)) {
      // Snarky divide-by-zero guard that doesn't crash the calculator
      // (handles Gotcha: "snarky error on divide by 0")
      // NOTE: only catches a leading "0" as the first digit of n2.
      // Typing "10" then editing won't reach this, but "5 / 0" does.
      if (!isSet(n2) && input == "0" && op == "/") {
        alert("WTH, who said you can do that?!");
        return;
      }
      if (isSet(n2)) {
        n2 += input;
      } else {
        n2 = input;
      }
    } else {
      // MISSING (Gotcha: "pressing a digit after a result should start
      // a new calculation"). After evaluateCalculation, n1 holds the
      // result and op is "". Typing a digit here appends to that result
      // (e.g. result 18, press 5 -> n1 becomes "185") instead of starting
      // fresh. Need a flag marking "n1 is a finished result" so the next
      // digit replaces n1 rather than appending to it.
      if (isSet(n1)) {
        n1 += input;
      } else {
        n1 = input;
      }
    }
  }

  outputArea.innerText = `${n1} ${op} ${n2}`;
}

// event listeners
buttons.forEach((button) =>
  button.addEventListener("click", (e) => {
    processInput(e.target.value);
    console.log(`Current State:\n\tn1: ${n1} n2: ${n2} op: ${op}`);
  }),
);
