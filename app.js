let buffer = ["0"];

document.body.addEventListener("click", (e) => {
  let target = e.target;
  let last = buffer[buffer.length - 1];

  if (e.target.id) {
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
      if (buffer[0] == "0" || typeof last == "number") {
        buffer.pop();
        buffer.push(key);
      } else if (isNaN(last) == false) {
        num = buffer.pop();
        console.log(num);
        if (num === "") {
          buffer.push(key);
        } else {
          buffer.push(num + key);
        }
      } else {
        buffer.push(key);
      }
      display();

      break;

    case "btns-dot":
      if (
        last === "*" ||
        last === "%" ||
        last === "/" ||
        last === "+" ||
        last === "-"
      ) {
        buffer.pop();
      }

      if (last && last.indexOf(key) !== -1) {
        break;
      } else {
        num = buffer.pop();
        buffer.push(num + key);

        break;
      }

    case "btns-sign":
      blink();

      const btnsSign = document.getElementById("btns-sign");
      const dataTheme = btnsSign.dataset.theme;

      if (buffer[0] != "0") {
        if (dataTheme == "plus") {
          btnsSign.setAttribute("data-theme", "minus");
          buffer.unshift("-");
          display();
          break;
        } else {
          btnsSign.setAttribute("data-theme", "plus");
          buffer.shift();
          display();
          break;
        }
      }

    case "btns-del":
      blink();
      buffer = ["0"];
      display();
      break;

    case "btns-equal":
      blink();

      try {
        let combine = buffer.join("");
        result = eval(combine);
        buffer = [result];
        display();
      } catch (error) {
        error;
      }
      break;

    case "btns-divide":
    case "btns-plus":
    case "btns-minus":
    case "btns-percent":
    case "btns-multiply":
      calculateExpression(buffer, last);
      break;
  }
});

function calculateExpression(buffer, last) {
  blink();
  if (buffer[0] != "0") {
    if (
      last === "*" ||
      last === "%" ||
      last === "/" ||
      last === "+" ||
      last === "-"
    ) {
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
  let displayElement = document.querySelector(".display");

  console.log(buffer);
  displayElement.textContent = buffer[buffer.length - 1];
}
