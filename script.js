let operand1 = "0";
let operator = "";
let operand2 = "";
let calculationState = "unfinished";

const output = document.querySelector(".output");

function operate() {
  switch (operator) {
    case "+":
      operand1 = add();
      break;
    case "-":
      operand1 = subtract();
      break;
    case "*":
      operand1 = multiply();
      break;
    case "/":
      operand1 = divide();
  }

  output.textContent = operand1;
}

function add() {
  return Number(operand1) + Number(operand2);
}

function subtract() {
  return Number(operand1) - Number(operand2);
}

function multiply() {
  return Number(operand1) * Number(operand2);
}

function divide() {
  return Number(operand1) / Number(operand2);
}

const buttons = document.querySelector(".button-container");
buttons.addEventListener("click", (event) => {
  const buttonId = event.target.id;
  switch (buttonId) {
    case "clear":
      handleClear();
      break;
    case "+/-":
      handleChangeSign();
      break;
    case "%":
      handlePercent();
      break;
    case ".":
      handleDot();
      break;
    case "=":
      handleEquals();
      break;
    case "/":
    case "*":
    case "-":
    case "+":
      handleOperator(buttonId);
      break;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
      handleNumber(buttonId);
  }
});

function handleClear() {
  if (calculationState === "unfinished") {
    if (operand2 != "") {
      operand2 = "0";
      output.textContent = operand2;
    } else {
      operand1 = "0";
      output.textContent = operand1;
    }
  } else {
    operand1 = "0";
    operator = "";
    operand2 = "";
    calculationState = "unfinished";
    output.textContent = operand1;
  }
}

function handleChangeSign() {}

function handlePercent() {}

function handleDot() {}

function handleEquals() {
  if (operand2 === "") {
    operand2 = operand1;
  }
  operate();
  calculationState = "finished";
}

function handleOperator(op) {
  if (calculationState === "finished") {
    operand2 = "";
    calculationState = "unfinished";
  } else {
    if (operand2 != "") {
      operate();
      operand2 = "";
    }
  }
  operator = op;
}

function handleNumber(number) {
  if (operator != "") {
    if (operand2.length < 7) {
      if (operand2 === "0") {
        operand2 = number;
      } else {
        operand2 += number;
      }

      output.textContent = operand2;
    }
  } else {
    if (operand1.length < 7) {
      if (operand1 === "0") {
        operand1 = number;
      } else {
        operand1 += number;
      }

      output.textContent = operand1;
    }
  }
}
