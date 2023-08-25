let buffer = ["0"];

document.body.addEventListener("click", handleButtonClick);

function handleButtonClick(e) {
  const target = e.target;
  const last = buffer[buffer.length - 1];
  const equalCheck = document.getElementById("btns-equal");
  const dataThemeEqualCheck = equalCheck.dataset.theme;

  if (target.id) {
    key = document.querySelector(`#${e.target.id}`).textContent;
  }

  switch (target.id) {
    case "btns-9":
    case "btns-8":
    case "btns-7":
    case "btns-6":
    case "btns-5":
    case "btns-4":
    case "btns-3":
    case "btns-2":
    case "btns-1":
    case "btns-0":
      handleNumberButtonClick(last, key, dataThemeEqualCheck);
      break;

    case "btns-dot":
      handleDotButtonClick(last, key);
      break;

    case "btns-sign":
      handleSignButtonClick(last);
      break;

    case "btns-del":
      handleDeleteButtonClick();
      break;

    case "btns-equal":
      handleEqualButtonClick();
      break;

    case "btns-divide":
    case "btns-plus":
    case "btns-minus":
    case "btns-percent":
    case "btns-multiply":
      handleOperatorButtonClick(buffer, last);
      break;
  }
}

function handleNumberButtonClick(last, key, dataThemeEqualCheck) {
  if (buffer[0] === "0" || dataThemeEqualCheck === "1") {
    buffer.pop();
    buffer.push(key);
    document.getElementById("btns-equal").setAttribute("data-theme", "0");
  } else if (!isNaN(last)) {
    const num = buffer.pop();
    buffer.push(num === "" ? key : num + key);
  } else {
    buffer.push(key);
  }

  display();
}

function handleDotButtonClick(last, key) {
  EqualCheck();
  if (["*", "%", "/", "+", "-"].includes(last)) {
    buffer.pop();
  }

  if (last && last.includes(key)) {
    return;
  } else {
    const num = buffer.pop();
    buffer.push(num + key);
    display();
  }
}

function handleSignButtonClick(last) {
  EqualCheck();
  blink();
  const signCheck = document.getElementById("btns-sign");
  const dataThemeSign = signCheck.dataset.theme;

  if (buffer[0] !== "0") {
    if (dataThemeSign === "plus") {
      signCheck.setAttribute("data-theme", "minus");
      buffer[buffer.length - 1] = "-" + last;
    } else {
      signCheck.setAttribute("data-theme", "plus");
      buffer[buffer.length - 1] = last.slice(1);
    }

    display();
  }
}

function handleDeleteButtonClick() {
  EqualCheck();
  blink();
  buffer = ["0"];
  display();
}

function handleEqualButtonClick() {
  blink();

  try {
    const combined = buffer.join("");
    const result = eval(combined).toString();
    buffer = [result];
    document.getElementById("btns-equal").setAttribute("data-theme", "1");
    display();
  } catch (error) {
    // Handle the error
  }
}

function handleOperatorButtonClick(buffer, last) {
  EqualCheck();
  blink();
  if (buffer[0] !== "0") {
    if (["*", "%", "/", "+", "-"].includes(last)) {
      buffer.pop();
    } else if (last.charAt(last.length - 1) === ".") {
      buffer.pop();
      buffer.push(last.slice(0, -1));
    }

    buffer.push(key);
  }
}

function blink() {
  const displayElement = document.querySelector(".display");
  displayElement.style.color = "var(--t1-screen-background)";
  setTimeout(() => {
    displayElement.style.color = "var(--t1-text-display)";
  }, 100);
}

function display() {
  const displayElement = document.querySelector(".display");
  displayElement.textContent = buffer[buffer.length - 1];
}

function EqualCheck() {
  document.getElementById("btns-equal").setAttribute("data-theme", "0");
}
