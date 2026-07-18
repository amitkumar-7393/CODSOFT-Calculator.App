const display = document.getElementById("display");
const history = document.getElementById("history");

const buttons = document.querySelectorAll(".btn");
const themeBtn = document.querySelector(".theme-btn");

let expression = "";

// Update Display
function updateDisplay() {
    display.value = expression || "0";
}

// Calculate Result
function calculate() {

    if (expression === "") return;

    try {

        let exp = expression
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/−/g, "-");

        let result = eval(exp);

        if (!isFinite(result)) {
            display.value = "Error";
            expression = "";
            return;
        }

        history.innerText = expression + " =";

        expression = result.toString();

        updateDisplay();

    } catch {

        display.value = "Error";

        expression = "";

    }

}

// Button Click
buttons.forEach(button => {

    button.addEventListener("click", () => {

        if (button.classList.contains("clear")) {

            expression = "";

            history.innerText = "";

            updateDisplay();

            return;

        }

        if (button.classList.contains("delete")) {

            expression = expression.slice(0, -1);

            updateDisplay();

            return;

        }

        if (button.classList.contains("equal")) {

            calculate();

            return;

        }

        let value = button.innerText.trim();

        expression += value;

        updateDisplay();

    });

});

// Keyboard Support
document.addEventListener("keydown", (e) => {

    const key = e.key;

    if (!isNaN(key) || "+-*/.%".includes(key)) {

        expression += key;

        updateDisplay();

    }

    if (key === "Enter") {

        e.preventDefault();

        calculate();

    }

    if (key === "Backspace") {

        expression = expression.slice(0, -1);

        updateDisplay();

    }

    if (key === "Escape") {

        expression = "";

        history.innerText = "";

        updateDisplay();

    }

});

// Theme Toggle
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    themeBtn.innerHTML = document.body.classList.contains("light")
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

});

updateDisplay();
