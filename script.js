const displayContainer = document.querySelector("p");
const buttons = document.querySelectorAll("button");
let firstNum = "";
let secondNum = "";
let globalOperator = "";
let numToDisplay = "";
let filterFirstNum = [];
let filterSecondNum = [];
let globalOperatorRef = "";

const operatorControl = (operator) => {
  if (firstNum !== "" && secondNum !== "") {
    calculate();
  }
  if (firstNum === "" || globalOperator !== "") {
    return;
  }

  globalOperatorRef = operator;
  operator.style.backgroundColor = "rgb(23, 27, 32)";
  globalOperator = operator.dataset.value;
};

const calculate = () => {
  if (globalOperator === "" || secondNum === "") return;
  switch (globalOperator) {
    case "/":
      if (parseFloat(secondNum) === 0) {
        displayContainer.textContent = "Cannot Divide by Zero";
        globalOperator = "";
        secondNum = "";
        firstNum = "";
        return;
      }
      firstNum = parseFloat(firstNum) / parseFloat(secondNum);

      break;
    case "+":
      firstNum = parseFloat(firstNum) + parseFloat(secondNum);
      break;
    case "*":
      firstNum = parseFloat(firstNum) * parseFloat(secondNum);
      break;
    case "-":
      firstNum = parseFloat(firstNum) - parseFloat(secondNum);
      break;
  }
  displayContainer.textContent = firstNum;
  globalOperator = "";
  secondNum = "";
  globalOperatorRef.style.backgroundColor = "rgb(52, 56, 65)";
};

const clearAll = () => {
  document.querySelector("p").textContent = "0";
  globalOperator = "";
  secondNum = "";
  firstNum = "";
  globalOperatorRef.style.backgroundColor = "rgb(52, 56, 65)";
};

buttons.forEach((val) => {
  val.addEventListener("click", () => {
    if (
      parseInt(val.dataset.value) ||
      val.dataset.value === "." ||
      val.dataset.value === "0"
    ) {
      if (firstNum.length >= 12 || secondNum.length >= 12) {
        return;
      }
      if (globalOperator === "") {
        if (
          val.dataset.value === "." &&
          filterFirstNum.includes(val.dataset.value)
        )
          return;
        numToDisplay = firstNum += val.dataset.value;
        filterFirstNum.push(val.dataset.value);
      } else {
        if (
          val.dataset.value === "." &&
          filterSecondNum.includes(val.dataset.value)
        )
          return;
        numToDisplay = secondNum += val.dataset.value;
        filterSecondNum.push(val.dataset.value);
      }

      displayContainer.textContent = numToDisplay;
    } else if (val.dataset.value === "c") {
      clearAll();
    } else if (val.dataset.value === "=") {
      calculate();
    } else {
      operatorControl(val);
    }
  });
});
