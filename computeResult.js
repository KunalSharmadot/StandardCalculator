const display = document.querySelector(".display");

let firstValue = "";
let operator = "";
let secondValue = "";

function updateDisplay(text) {
    // ?? it check the left side if it got null or undefined than asign the right side work
    display.value = text ?? "";
}
// below convert str to num
function toNumber(str) {
    return str ? Number(str) : 0;
}

function formatResult(n) {
    if (n === "Error") return "Error";
    if (Number.isInteger(n)) return String(n);
    return parseFloat(n.toFixed(12)).toString().replace(/\.0+$/, "");
}

// compute all calculation
function computeResult() {
    const a = toNumber(firstValue);
    const b = toNumber(secondValue);

    switch (operator) {
        case "+": return formatResult(a + b);
        case "-": return formatResult(a - b);
        case "*": return formatResult(a * b);
        case "÷": return b === 0 ? "Error" : formatResult(a / b);
        case "%": return formatResult(percentCount(a, b));
        default: return a;
    }
}

function percentCount(a, b) {
    return ((b * a) / 100);
}

function handleNumber(num) {
    // before any operator click
    if (operator === "") {
        // if the . already include in firstValue than exit
        if (num === "." && firstValue.includes(".")) return;
        firstValue += num;
        updateDisplay(firstValue);
    }
    // after operator click
    else {
        if (num === "." && secondValue.includes(".")) return;
        secondValue += num;
        updateDisplay(firstValue + operator + secondValue);
    }
}

function handleOperator(op) {
    if (firstValue === "") firstValue = "0";
    // if any operator does not exist
    if (operator === "") {
        operator = op;
        updateDisplay(firstValue + operator);
    } else {
        if (secondValue === "") {
            operator = op;
            updateDisplay(firstValue + operator);
            console.log(firstValue + operator);
        } else {
            const result = computeResult();
            if (result === "Error") {
                updateDisplay("Error");
                return clearAll();
            }
            firstValue = result;
            operator = op;
            secondValue = "";
            updateDisplay(firstValue + operator);
        }
    }
}

function handleEqual() {
    if (operator === "" || secondValue === "") return;
    const result = computeResult();
    const exp = `${firstValue} ${operator} ${secondValue}`;

    // add history
    addToHistory(exp, result);

    updateDisplay(result);
    firstValue = result === "Error" ? "" : result;
    operator = "";
    secondValue = "";
}

function clearAll() {
    firstValue = "";
    operator = "";
    secondValue = "";
    updateDisplay("0");
}

function clearLastEntry() {
    if (operator === "") {
        firstValue = "";
        updateDisplay("0");
    } else {
        secondValue = "";
        updateDisplay(firstValue + operator);
    }
}

function handleBack() {
    if (operator === "") {
        firstValue = firstValue.slice(0, -1);
        updateDisplay(firstValue);
    } else {
        if (secondValue > 0) {
            secondValue = secondValue.slice(0, -1);
            updateDisplay(firstValue + operator + secondValue);
        } else {
            operator = "";
            updateDisplay(firstValue);
        }
    }
}

function handleSquare() {
    if (operator === "") {
        const val = toNumber(firstValue);
        firstValue = val * val;
        updateDisplay(formatResult(firstValue));
    } else {
        const val = toNumber(secondValue);
        secondValue = val * val;
        updateDisplay(firstValue + operator + formatResult(secondValue));
    }
}

function handleFraction() {
    if (operator === "") {
        const val = toNumber(firstValue);
        firstValue = 1 / val;
        updateDisplay(formatResult(firstValue));
    } else {
        const val = toNumber(secondValue);
        secondValue = 1 / val;
        updateDisplay(firstValue + operator + formatResult(secondValue));
    }
}

function handleSquareRoot() {
    if (operator === "") {
        const val = toNumber(firstValue);
        firstValue = Math.sqrt(val);
        updateDisplay(formatResult(firstValue));
    } else {
        const val = toNumber(secondValue);
        secondValue = Math.sqrt(val);
        updateDisplay(firstValue + operator + formatResult(secondValue));
    }
}
function handleToggleSign() {
    // If no operator yet → modify firstValue
    if (operator === "") {
        if (firstValue === "") return;

        // Toggle sign
        firstValue = firstValue.startsWith('-') ? firstValue.slice(1): '-' + firstValue;

        updateDisplay(firstValue);
    }

    // If operator exists → modify secondValue
    else {
        if (secondValue === "") return;

        secondValue = secondValue.startsWith('-') ? secondValue.slice(1) : '-' + secondValue;

        updateDisplay(firstValue + operator + secondValue);
    }
}







// Try other
// const buttons = document.querySelectorAll(".btn");
// const display = document.querySelector(".display");

// let string = "";

// buttons.forEach(btn => {
//   btn.addEventListener('click', (e) => {
//     if(e.target.innerHTML == '=') {
//       string = eval(string);
//       display.value = string;
//     } else if(e.target.innerHTML == 'C' || e.target.innerHTML == 'CE') {
//       string = "0";
//       display.value = string;
//     } else if (e.target.innerHTML == '⌫') {
//       string = string.slice(0, string.length - 1);
//       display.value = string;
//     }
//     else {
//       string = string + e.target.innerHTML;
//       display.value = string;
//     }
//   })
// })