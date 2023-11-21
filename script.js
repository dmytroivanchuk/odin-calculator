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
  const button = event.target;
  const buttonId = event.target.id;
  switch (buttonId) {
    case "clear":
      handleClear();
      addTapAnimation(button);
      break;
    case "+/-":
      handleChangeSign();
      addTapAnimation(button);
      break;
    case "%":
      handlePercent();
      addTapAnimation(button);
      break;
    case ".":
      handleDot();
      addTapAnimation(button);
      break;
    case "=":
      handleEquals();
      addTapAnimation(button);
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
      addTapAnimation(button);
  }
});

function handleClear() {
  if (calculationState === "unfinished") {
    if (operand2 != "" && operand2 != "0") {
      operand2 = "0";
      output.textContent = operand2;
      addSelectAnimation();
    } else {
      if (operator != "") {
        let button = document.getElementById(operator);
        button.classList.remove("select");
        button.classList.add("unselect");

        setTimeout(function () {
          button.classList.remove("unselect");
        }, 250);

        operator = "";
      }
      operand1 = "0";
      output.textContent = operand1;

      let button = document.getElementById("clear");
      button.textContent = "AC";
    }
  } else {
    operand1 = "0";
    operator = "";
    operand2 = "";
    calculationState = "unfinished";
    output.textContent = operand1;

    let button = document.getElementById("clear");
    button.textContent = "AC";
  }
}

function handleChangeSign() {}

function handlePercent() {}

function handleDot() {}

function handleEquals() {
  if (operator != "") {
    if (operand2 === "") {
      operand2 = operand1;
      let button = document.getElementById(operator);
      button.classList.remove("select");
      button.classList.add("unselect");

      setTimeout(function () {
        button.classList.remove("unselect");
      }, 250);
    }
    operate();
    calculationState = "finished";
  }
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
  addSelectAnimation();
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

  if (operator != "") {
    let button = document.getElementById(operator);
    if (button.classList.contains("select")) {
      button.classList.remove("select");
      button.classList.add("unselect");

      setTimeout(function () {
        button.classList.remove("unselect");
      }, 250);
    }
  }

  let button = document.getElementById("clear");
  if ((button.textContent = "AC")) {
    button.textContent = "C";
  }
}

function addTapAnimation(button) {
  button.classList.add("tap");
  setTimeout(function () {
    button.classList.remove("tap");
  }, 500);
}

function addSelectAnimation() {
  let button = document.getElementById(operator);
  button.classList.add("select");
}
