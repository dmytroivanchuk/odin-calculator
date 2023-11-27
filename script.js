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
  const result = Number(operand1) + Number(operand2);
  const strResult = result.toString();

  if (strResult.length > 7) {
    if (strResult.includes(".")) {
      const strResultParts = strResult.split(".");
      const strResultIntegerPart = strResultParts[0];

      if (strResultIntegerPart.length <= 7) {
        const resultRounded = result.toFixed(7 - strResultIntegerPart.length);
        const strResultRounded = resultRounded.toString();
        return strResultRounded;
      } else {
        const resultExp = result.toExponential(2);
        const strResultExp = resultExp.toString();
        return strResultExp;
      }
    } else {
      const resultExp = result.toExponential(2);
      const strResultExp = resultExp.toString();
      return strResultExp;
    }
  } else {
    return strResult;
  }
}

function subtract() {
  const result = Number(operand1) - Number(operand2);
  const strResult = result.toString();

  if (strResult.length > 7) {
    if (strResult.includes(".")) {
      const strResultParts = strResult.split(".");
      const strResultIntegerPart = strResultParts[0];

      if (strResultIntegerPart.length <= 7) {
        const resultRounded = result.toFixed(7 - strResultIntegerPart.length);
        const strResultRounded = resultRounded.toString();
        return strResultRounded;
      } else {
        const resultExp = result.toExponential(2);
        const strResultExp = resultExp.toString();
        return strResultExp;
      }
    } else {
      const resultExp = result.toExponential(2);
      const strResultExp = resultExp.toString();
      return strResultExp;
    }
  } else {
    return strResult;
  }
}

function multiply() {
  const result = Number(operand1) * Number(operand2);
  const strResult = result.toString();

  if (strResult.length > 7) {
    if (strResult.includes(".")) {
      const strResultParts = strResult.split(".");
      const strResultIntegerPart = strResultParts[0];

      if (strResultIntegerPart.length <= 7) {
        const resultRounded = result.toFixed(7 - strResultIntegerPart.length);
        const strResultRounded = resultRounded.toString();
        return strResultRounded;
      } else {
        const resultExp = result.toExponential(2);
        const strResultExp = resultExp.toString();
        return strResultExp;
      }
    } else {
      const resultExp = result.toExponential(2);
      const strResultExp = resultExp.toString();
      return strResultExp;
    }
  } else {
    return strResult;
  }
}

function divide() {
  const result = Number(operand1) / Number(operand2);
  const strResult = result.toString();

  if (strResult.length > 7) {
    if (strResult.includes(".")) {
      const strResultParts = strResult.split(".");
      const strResultIntegerPart = strResultParts[0];

      if (strResultIntegerPart.length <= 7) {
        const resultRounded = result.toFixed(7 - strResultIntegerPart.length);
        const strResultRounded = resultRounded.toString();
        return strResultRounded;
      } else {
        const resultExp = result.toExponential(2);
        const strResultExp = resultExp.toString();
        return strResultExp;
      }
    } else {
      const resultExp = result.toExponential(2);
      const strResultExp = resultExp.toString();
      return strResultExp;
    }
  } else {
    return strResult;
  }
}

const buttons = document.querySelector(".button-container");
buttons.addEventListener("click", (event) => {
  const button = event.target;
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

  const button = document.getElementById("clear");
  addTapAnimation(button);
}

function handleChangeSign() {
  if (calculationState === "finished") {
    if (operand1[0] === "-") {
      operand1 = operand1.slice(1);
      output.textContent = operand1;
    } else {
      operand1 = "-" + operand1;
      output.textContent = operand1;
    }
  } else {
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

      if (operand2[0] === "-") {
        operand2 = operand2.slice(1);
        output.textContent = operand2;
      } else {
        operand2 = "-" + operand2;
        output.textContent = operand2;
      }
    } else {
      if (operand1[0] === "-") {
        operand1 = operand1.slice(1);
        output.textContent = operand1;
      } else {
        operand1 = "-" + operand1;
        output.textContent = operand1;
      }
    }
  }

  const button = document.getElementById("+/-");
  addTapAnimation(button);
}

function handlePercent() {
  if (calculationState === "finished") {
    operand1 = (Number(operand1) / 100).toString();
    output.textContent = operand1;
  } else {
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

      operand2 = (Number(operand2) / 100).toString();
      output.textContent = operand2;
    } else {
      operand1 = (Number(operand1) / 100).toString();
      output.textContent = operand1;
    }
  }

  const button = document.getElementById("%");
  addTapAnimation(button);
}

function handleDot() {
  if (calculationState === "finished") {
    if (operand1.length < 7) {
      if (!operand1.includes(".")) {
        operand1 += ".";
      }
    }
    output.textContent = operand1;
  } else {
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

      if (operand2.length < 7) {
        if (!operand2.includes(".")) {
          operand2 += ".";
        }
      }
      output.textContent = operand2;
    } else {
      if (operand1.length < 7) {
        if (!operand1.includes(".")) {
          operand1 += ".";
        }
      }
      output.textContent = operand1;
    }
  }

  const button = document.getElementById(".");
  addTapAnimation(button);
}

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

  const button = document.getElementById("=");
  addTapAnimation(button);
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

  let clearButton = document.getElementById("clear");
  if ((clearButton.textContent = "AC")) {
    clearButton.textContent = "C";
  }

  const button = document.getElementById(number);
  addTapAnimation(button);
}

function addTapAnimation(button) {
  if (button.id === "0") {
    for (const child of button.children) {
      child.classList.add("tap");
      setTimeout(function () {
        child.classList.remove("tap");
      }, 500);
    }
  }
  button.classList.add("tap");
  setTimeout(function () {
    button.classList.remove("tap");
  }, 500);
}

function addSelectAnimation() {
  let button = document.getElementById(operator);
  button.classList.add("select");
}

document.addEventListener("keydown", (event) => {
  const pressedKey = event.key;

  if (event.ctrlKey && pressedKey === "-") {
    handleChangeSign();
    return;
  }

  switch (pressedKey) {
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
    case "=":
    case "Enter":
      handleEquals();
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
});
