document.addEventListener("DOMContentLoaded", function() {
    const screenPrevious = document.querySelector(".previous");
    const screenCurrent = document.querySelector(".current");
    const clearButton = document.querySelector(".clear");
    const deleteButton = document.querySelector(".delete");
    const numberButtons = document.querySelectorAll(".number");
    const operatorButtons = document.querySelectorAll(".operator");
    const decimalButton = document.querySelector(".decimal");
    const equalButton = document.querySelector(".equal");
  
    let previousOperand = "";
    let currentOperand = "";
    let selectedOperator = null;
  
    // Helper function to update the display
    function updateDisplay() {
        screenCurrent.innerText = currentOperand;
        if (selectedOperator) {
            screenPrevious.innerText = `${previousOperand} ${selectedOperator}`;
        } else {
            screenPrevious.innerText = previousOperand;
        }
    }
  
    // Helper function to format the number with a specified precision
    function formatNumber(number, precision = 10) {
        const roundedNumber = Math.round(number * precision) / precision;
        return roundedNumber.toString();
    }
  
    // Helper function to perform calculation
    function calculate() {
        let result;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (selectedOperator) {
            case "+":
                result = prev + current;
                break;
            case "-":
                result = prev - current;
                break;
            case "*":
                result = prev * current;
                break;
            case "/":
                if (current === 0) return null
                else result = prev / current;
                break;
            default:
                return;
            }

        currentOperand = formatNumber(result);
        previousOperand = "";
        selectedOperator = null;
    }
  
    // Event listener for number buttons
    numberButtons.forEach(button => {
        button.addEventListener("click", function() {
            if (currentOperand === "0" && button.innerText === "0") return;
            if (currentOperand.includes(".") && button.innerText === ".") return;
            if (selectedOperator && previousOperand === currentOperand) {
            currentOperand = "";
            }
            currentOperand += button.innerText;
            updateDisplay();
        });
    });
  
    // Event listener for operator buttons
    operatorButtons.forEach(button => {
        button.addEventListener("click", function() {
            if (currentOperand === "") return;
            if (previousOperand !== "") {
            calculate();
            }
            selectedOperator = button.innerText === "x" ? "*" : button.innerText;
            previousOperand = currentOperand;
            currentOperand="";
            updateDisplay();
        });
    });
  
    // Event listener for equal button
    equalButton.addEventListener("click", function() {
        if (currentOperand === "" || previousOperand === "") return;
        calculate();
        updateDisplay();
    });
  
    // Event listener for clear button
    clearButton.addEventListener("click", function() {
        previousOperand = "";
        currentOperand = "";
        selectedOperator = null;
        updateDisplay();
    });
  
    // Event listener for delete button
    deleteButton.addEventListener("click", function() {
        currentOperand = currentOperand.slice(0, -1);
        updateDisplay();
    });
  
    // Event listener for decimal button
    decimalButton.addEventListener("click", function() {
        if (currentOperand.includes(".")) return;
        currentOperand += ".";
        updateDisplay();
    });
  
    // Event listener for keyboard input
    document.addEventListener("keydown", function(event) {
        const key = event.key;
    
        if (/[0-9]/.test(key)) {
            numberButtons.forEach(button => {
            if (button.innerText === key) {
                button.click();
            }
            });
            } else if (key === "." || key === ",") {
                decimalButton.click();
            } else if (/[+\-*/]/.test(key)) {
                operatorButtons.forEach(button => {
                if (button.innerText === key || (key === "*" && button.innerText === "x")) {
                    button.click();
                }
                });
            } else if (key === "=" || key === "Enter") {
                equalButton.click();
            } else if (key === "Backspace") {
                deleteButton.click();
            } else if (key === "Escape") {
                clearButton.click();
            }
    });
});