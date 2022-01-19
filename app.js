let firstNumber = "";
let secondNumber = "";
let currentCalc = null;
// math functions
const add = (a,b) => {
    return a + b;
}

const subtract = (a,b) => {
    return a - b;
}

const multiply = (a,b) => {
    return a * b;
}
const divide = (a,b) => {
    return a / b;
}

const squared = (a) => {
    a = Number(a);
    return a * a
}

const operate = (a,operator,b) => {
    a = Number(a);
    b = Number(b);
    if (operator === "+") {
        return add(a,b);
    } else if (operator === "—") {
        return subtract(a,b);
    } else if (operator === "x") {
        return multiply(a,b);
    } else if (operator === "÷" && b !== 0) {
        return divide(a,b);
    } else return null
     
}

// screen updators

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const currentScreen = document.getElementById("currentScreen");
const pastScreen = document.getElementById("lastScreen");
const clearButton = document.getElementById("clearBtn");
const equalButton = document.getElementById("equalsBtn");
const deleteButton = document.getElementById("deleteBtn");
const negateButton = document.getElementById("negateBtn");
const decimalButton = document.getElementById("decBtn");
const squareButton = document.getElementById("sqrBtn");

decimalButton.addEventListener("click", () => {
    currentScreen.textContent += "."
    document.getElementById("decBtn").disabled = true
})


negateButton.addEventListener("click", () => {
    let screenArray = Array.from(currentScreen.textContent);
     
    if (screenArray[0].match(/-/)) {
        screenArray.shift();
        let screenStr = screenArray.join("");
       return  currentScreen.textContent = screenStr
    } else {
        screenArray.unshift("-");
        let screenStr = screenArray.join("");
        return currentScreen.textContent = screenStr;
    }
})


const updateCurrentDisplay = (number) => {
    if (currentScreen.textContent === 0) {
        resetCurrentScreen();
    }
    currentScreen.textContent += number;

}

const updatePastDisplay = (number) => {
    if (pastScreen.textContent == 0) {
        resetPastScreen();
    }
    pastScreen.textContent += (currentScreen.textContent + number);

}

numberButtons.forEach((button) => 
    button.addEventListener("click", () => {
        updateCurrentDisplay(button.textContent);

    }) 
)

operatorButtons.forEach((button) =>
    button.addEventListener("click", () => { 
        if ((currentScreen.textContent = "") || (currentScreen.textContent = "0")) {
            return 
        }
        if (button.id == "timesBtn") {
            currentCalc = "x"
            firstNumber = currentScreen.textContent
            disableBtns();
            if (currentCalc != null) {
                resetPastScreen();
            }
        } else if (button.id == "plusBtn") {
            currentCalc = "+"
            firstNumber = currentScreen.textContent
            disableBtns();
            if (currentCalc != null) {
                resetPastScreen();
            }
        } else if (button.id == "divideBtn") {
            currentCalc = "÷"
            firstNumber = currentScreen.textContent
            disableBtns();
            if (currentCalc != null) {
                resetPastScreen();
            }
        } else if (button.id == "minusBtn") {
            currentCalc = "—"
            firstNumber = currentScreen.textContent
            disableBtns();
            if (currentCalc != null) {
                resetPastScreen();
            }
        }
        
        updatePastDisplay(" " + button.textContent);
        resetCurrentScreen();
        
    })
)

clearButton.addEventListener("click", () => {
    firstNumber = ""
    secondNumber = ""
    currentScreen.textContent = ""
    pastScreen.textContent = ""
    enableBtns();
})

equalButton.addEventListener("click", () => {
    if (currentCalc == "x") {
        secondNumber = currentScreen.textContent;
        pastScreen.textContent += (" " + secondNumber + " "); 
        resetCurrentScreen();
        currentScreen.textContent = operate(firstNumber,currentCalc,secondNumber);
        enableBtns();
    } else if (currentCalc == "÷") {
        secondNumber = currentScreen.textContent;
        pastScreen.textContent += (" " + secondNumber + " "); 
        resetCurrentScreen();
        if (secondNumber == 0) {
            enableBtns();
            firstNumber = ""
            secondNumber = ""
            currentScreen.textContent = ""
            pastScreen.textContent = ""
           return alert("You can't do that!")
        }
        currentScreen.textContent = operate(firstNumber,currentCalc,secondNumber);
        enableBtns();
    } else if (currentCalc == "+") {
        secondNumber = currentScreen.textContent;
        pastScreen.textContent += (" " + secondNumber + " "); 
        resetCurrentScreen();
        currentScreen.textContent = operate(firstNumber,currentCalc,secondNumber);
        enableBtns();
    } else if (currentCalc == "—") {
        secondNumber = currentScreen.textContent;
        pastScreen.textContent += (" " + secondNumber + " "); 
        resetCurrentScreen();
        currentScreen.textContent = operate(firstNumber,currentCalc,secondNumber);
        enableBtns();
    } else return null
    

})

const disableBtns = () => {
    document.getElementById("timesBtn").disabled = true;
    document.getElementById("divideBtn").disabled = true;
    document.getElementById("minusBtn").disabled = true;
    document.getElementById("plusBtn").disabled = true;
}

const enableBtns = () => {
    document.getElementById("timesBtn").disabled = false;
    document.getElementById("divideBtn").disabled = false;
    document.getElementById("minusBtn").disabled = false;
    document.getElementById("plusBtn").disabled = false;
    document.getElementById("decBtn").disabled = false
}

const resetCurrentScreen = () => {
    currentScreen.textContent = ""
}

const resetPastScreen = () => {
    pastScreen.textContent = ""
}

squareButton.addEventListener("click", () => {
    let number = parseInt(currentScreen.textContent, 10);
    currentScreen.textContent = squared(number);
})

deleteButton.addEventListener("click", () => {
    let delText = currentScreen.textContent;
    currentScreen.textContent = delText.slice(0,-1)
})

