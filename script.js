let operand1 = "0";
let operator = "";
let operand2 = "";
let calculationState = "unfinished";

const buttonContainer = document.querySelector(".button-container");
const output = document.querySelector(".output");
const clearButton = document.getElementById("clear");
const changeSignButton = document.getElementById("+/-");
const percentButton = document.getElementById("%");
const dotButton = document.getElementById(".");
const equalsButton = document.getElementById("=");

buttonContainer.addEventListener("click", handleButton);
document.addEventListener("keydown", handleKey);

function handleButton(event) {
  const buttonId = event.target.id;
  switch (buttonId) {
    case "=":
      handleEquals();
      break;
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
}

function handleKey(event) {
  const pressedKey = event.key;
  if (event.ctrlKey && pressedKey === "-") {
    handleChangeSign();
    return;
  }
  switch (pressedKey) {
    case "=":
    case "Enter":
      handleEquals();
      break;
    case "Backspace":
    case "Escape":
      handleClear();
      break;
    case "%":
      handlePercent();
      break;
    case ".":
      handleDot();
      break;
    case "/":
    case "*":
    case "+":
    case "-":
      handleOperator(pressedKey);
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
      handleNumber(pressedKey);
  }
}

function handleEquals() {
  if (operator != "") {
    if (operand2 === "") {
      operand2 = operand1;
      addUnselectAnimation();
    }
    operate();
    calculationState = "finished";
  }
  addTapAnimation(equalsButton);
}

function handleClear() {
  switch (calculationState) {
    case "finished":
      operand1 = "0";
      operator = "";
      operand2 = "";
      calculationState = "unfinished";
      output.textContent = operand1;
      clearButton.textContent = "AC";
      break;
    case "unfinished":
      switch (operand2) {
        case "":
        case "0":
          if (operator != "") {
            addUnselectAnimation();
            operator = "";
          }
          if (operand2 != "") {
            operand2 = "";
          }
          operand1 = "0";
          output.textContent = operand1;
          clearButton.textContent = "AC";
          break;
        default:
          operand2 = "0";
          output.textContent = operand2;
          addSelectAnimation();
      }
  }
  addTapAnimation(clearButton);
}

function handleChangeSign() {
  switch (calculationState) {
    case "finished":
      handleChangeSignIn(operand1, "operand1");
      break;
    case "unfinished":
      switch (operator) {
        case "":
          handleChangeSignIn(operand1, "operand1");
          break;
        default:
          if (operand2 === "") {
            operand2 = operand1;
          }
          handleChangeSignIn(operand2, "operand2");
          addUnselectAnimation();
      }
  }
  addTapAnimation(changeSignButton);

  function handleChangeSignIn(operand, operandId) {
    const result = operand[0] === "-" ? operand.slice(1) : "-" + operand;
    switch (operandId) {
      case "operand1":
        operand1 = result;
        break;
      case "operand2":
        operand2 = result;
    }
    output.textContent = result;
  }
}

function handlePercent() {
  switch (calculationState) {
    case "finished":
      handlePercentIn(operand1, "operand1");
      break;
    case "unfinished":
      switch (operator) {
        case "":
          handlePercentIn(operand1, "operand1");
          break;
        default:
          if (operand2 === "") {
            operand2 = operand1;
          }
          handlePercentIn(operand2, "operand2");
          addUnselectAnimation();
      }
  }
  addTapAnimation(percentButton);

  function handlePercentIn(operand, operandId) {
    const result = convertToPercent(operand);
    switch (operandId) {
      case "operand1":
        operand1 = result;
        break;
      case "operand2":
        operand2 = result;
    }
    output.textContent = result;

    function convertToPercent(operand) {
      const result = Number(operand) / 100;
      const strResult = result.toString();
      return strResult;
    }
  }
}

function handleDot() {
  switch (calculationState) {
    case "finished":
      handleDotIn(operand1, "operand1");
      break;
    case "unfinished":
      switch (operator) {
        case "":
          handleDotIn(operand1, "operand1");
          break;
        default:
          if (operand2 === "") {
            operand2 = operand1;
          }
          handleDotIn(operand2, "operand2");
          addUnselectAnimation();
      }
  }
  addTapAnimation(dotButton);

  function handleDotIn(operand, operandId) {
    if (operand.length < 7 && !operand.includes(".")) {
      const result = operand + ".";
      switch (operandId) {
        case "operand1":
          operand1 = result;
          break;
        case "operand2":
          operand2 = result;
      }
      output.textContent = result;
    }
  }
}

function handleOperator(op) {
  switch (calculationState) {
    case "finished":
      operand2 = "";
      calculationState = "unfinished";
      break;
    case "unfinished":
      if (operand2 != "") {
        operate();
        operand2 = "";
      }
  }
  operator = op;
  addSelectAnimation();
}

function handleNumber(number) {
  switch (calculationState) {
    case "finished":
      handleNumberIn(operand1, "operand1");
      break;
    case "unfinished":
      switch (operator) {
        case "":
          handleNumberIn(operand1, "operand1");
          break;
        default:
          handleNumberIn(operand2, "operand2");
          addUnselectAnimation();
      }
  }

  if (clearButton.textContent === "AC") {
    clearButton.textContent = "C";
  }

  const numberButton = document.getElementById(number);
  switch (numberButton.id) {
    case "0":
      for (const child of numberButton.children) {
        addTapAnimation(child);
      }
    default:
      addTapAnimation(numberButton);
  }

  function handleNumberIn(operand, operandId) {
    if (operand.length < 7) {
      const result = operand === "0" ? number : operand + number;
      switch (operandId) {
        case "operand1":
          operand1 = result;
          break;
        case "operand2":
          operand2 = result;
      }
      output.textContent = result;
    }
  }
}

function operate() {
  let result;
  switch (operator) {
    case "+":
      result = add();
      break;
    case "-":
      result = subtract();
      break;
    case "*":
      result = multiply();
      break;
    case "/":
      result = divide();
  }

  const formattedResult = format(result);
  operand1 = formattedResult;
  output.textContent = formattedResult;

  function add() {
    const result = Number(operand1) + Number(operand2);
    return result;
  }

  function subtract() {
    const result = Number(operand1) - Number(operand2);
    return result;
  }

  function multiply() {
    const result = Number(operand1) * Number(operand2);
    return result;
  }

  function divide() {
    const result = Number(operand1) / Number(operand2);
    return result;
  }

  function format(result) {
    const strResult = result.toString();
    if (strResult.length > 7) {
      if (strResult.includes(".")) {
        const strResultParts = strResult.split(".");
        const strResultIntegerPart = strResultParts[0];

        if (strResultIntegerPart.length <= 7) {
          const strResultRounded = round(result);
          return strResultRounded;
        } else {
          const strResultExp = convertToExponential(result);
          return strResultExp;
        }

        function round(result) {
          const resultRounded = result.toFixed(7 - strResultIntegerPart.length);
          const strResultRounded = resultRounded.toString();
          return strResultRounded;
        }
      } else {
        const strResultExp = convertToExponential(result);
        return strResultExp;
      }
    } else {
      return strResult;
    }

    function convertToExponential(result) {
      const resultExp = result.toExponential(2);
      const strResultExp = resultExp.toString();
      return strResultExp;
    }
  }
}

function addTapAnimation(button) {
  button.classList.add("tap");
  setTimeout(() => button.classList.remove("tap"), 500);
}

function addSelectAnimation() {
  const operatorButton = document.getElementById(operator);
  operatorButton.classList.add("select");
}

function addUnselectAnimation() {
  const operatorButton = document.getElementById(operator);
  if (operatorButton.classList.contains("select")) {
    operatorButton.classList.remove("select");
    operatorButton.classList.add("unselect");
    setTimeout(() => operatorButton.classList.remove("unselect"), 250);
  }
}
