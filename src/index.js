import "./style.css";

const display = document.querySelector(".display");
const ac = document.querySelector(".ac");
const buttons = document.querySelector(".buttons");

let firstOperand = ""; // первое число
let secondOperand = ""; // второе число
let operator = ""; // знак
let finish = false;

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ","];
const symbols = ["÷", "×", "−", "+"];

function clearAll() {
  firstOperand = ""; // первое число
  secondOperand = ""; // второе число
  operator = ""; // знак
  finish = false;
  display.textContent = "0";
}

function pushPlusMinus() {
  // если оператор ещё не выбран - меняем знак первого числа
  if (operator === "") {
    if (firstOperand !== "") {
      firstOperand = firstOperand * -1;
      display.textContent = firstOperand;
    }
  } else {
    if (secondOperand !== "") {
      secondOperand = secondOperand * -1;
      display.textContent = secondOperand;
    }
    return;
  }
}

buttons.addEventListener("click", function (event) {
  // нажата кнопка AC
  if (event.target.classList.contains("ac")) {
    return;
  } else {
    ac.onclick = clearAll;
  }

  if (event.target.classList.contains("plusMinus")) {
    pushPlusMinus();
    return;
  }

  //display.textContent = '';

  // получаю нажатую кнопку
  const value = event.target.textContent;

  // если нажата цифра или ','
  if (numbers.includes(value)) {
    if (secondOperand === "" && operator === "") {
      firstOperand += value;
      display.textContent = firstOperand;
    } else if (firstOperand !== "" && secondOperand !== "" && finish) {
      secondOperand = value;
      finish = false;
      display.textContent = secondOperand;
    } else {
      secondOperand += value;
      display.textContent = secondOperand;
    }

    return;
  }

  // если нажат знак
  if (symbols.includes(value)) {
    operator = value;
    display.textContent = operator;
    return;
  }

  // нажато '='
  if (value === "=") {
    if (secondOperand === "") {
      secondOperand = firstOperand;
    }

    switch (operator) {
      case "÷":
        if (secondOperand === "0") {
          display.textContent = "Error";
          firstOperand = "";
          secondOperand = "";
          operator = "";
          return;
        } else {
          firstOperand / secondOperand;
        }
        break;
      case "×":
        firstOperand = firstOperand * secondOperand;
        break;
      case "−":
        firstOperand = firstOperand - secondOperand;
        break;
      case "+":
        firstOperand = +firstOperand + +secondOperand;
        break;
    }

    finish = true;
    display.textContent = firstOperand;
  }
});
