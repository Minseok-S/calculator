# 계산기

이 프로젝트는 HTML, CSS 및 JavaScript를 사용하여 구현된 간단한 계산기입니다. 사용자가 숫자 및 연산자 버튼을 클릭하면 결과가 표시되며 다양한 계산이 수행됩니다.

---
## 기능

- 숫자 버튼을 클릭하면 해당 숫자가 화면에 표시됩니다.
- 소수점 버튼을 클릭하여 소수점을 입력할 수 있습니다.
- +/- 버튼을 클릭하여 숫자의 부호를 변경할 수 있습니다.
- AC 버튼을 클릭하여 모든 입력을 지울 수 있습니다.
- 연산자 버튼(+, -, \*, /)을 클릭하여 계산 작업을 설정할 수 있습니다.
- = 버튼을 클릭하여 입력된 식을 평가하고 결과를 표시합니다.

---
# 코드 설명

```js
// "buffer"는 숫자나 연산자 등의 값을 저장하는 배열입니다. 초기값으로 "0"을 가지고 있습니다.
let buffer = ["0"];

// 문서의 본문(body)에 클릭 이벤트 리스너를 추가합니다. 이 리스너는 "handleButtonClick" 함수를 호출합니다.
document.body.addEventListener("click", handleButtonClick);
```


## 1. handleButtonClick()

```js
// 버튼 클릭 이벤트를 처리하는 함수입니다.
// 클릭한 버튼의 정보를 기반으로 해당 버튼의 동작을 처리하고 화면을 업데이트합니다.
function handleButtonClick(e) {
  // 클릭한 버튼 요소를 가져옵니다.
  const target = e.target;
  
  // 버퍼 배열에서 마지막으로 입력한 값(숫자 또는 연산자)을 가져오는 변수입니다.
  const last = buffer[buffer.length - 1];
  
  // '=' 버튼의 데이터 테마 속성을 확인하여 '=' 버튼이 눌렸는지 여부를 결정하는 변수입니다.
  const equalCheck = document.getElementById("btns-equal");
  const dataThemeEqualCheck = equalCheck.dataset.theme;

  // 클릭한 버튼의 값을 가져옵니다.
    if (target.id) {
    key = document.querySelector(`#${e.target.id}`).textContent;
  }


  // 클릭한 버튼의 ID에 따라 다른 동작을 수행합니다.
  switch (target.id) {
    // 숫자 버튼을 클릭한 경우:
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
      // 숫자 버튼 처리 함수를 호출합니다.
      handleNumberButtonClick(last, key, dataThemeEqualCheck);
      break;
      
    // 소수점 버튼을 클릭한 경우:
    case "btns-dot":
      // 소수점 버튼 처리 함수를 호출합니다.
      handleDotButtonClick(last, key);
      break;

    // 부호 변경 버튼을 클릭한 경우:
    case "btns-sign":
      // 부호 변경 버튼 처리 함수를 호출합니다.
      handleSignButtonClick(last);
      break;

    // 삭제 버튼을 클릭한 경우:
    case "btns-del":
      // 삭제 버튼 처리 함수를 호출합니다.
      handleDeleteButtonClick();
      break;

    // '=' 버튼을 클릭한 경우:
    case "btns-equal":
      // '=' 버튼 처리 함수를 호출합니다.
      handleEqualButtonClick();
      break;

    // 사칙 연산자 버튼을 클릭한 경우:
    case "btns-divide":
    case "btns-plus":
    case "btns-minus":
    case "btns-percent":
    case "btns-multiply":
      // 사칙 연산자 버튼 처리 함수를 호출합니다.
      handleOperatorButtonClick(buffer, last);
      break;
  }
}

```

## 2. handleNumberButtonClick()
```js
// 숫자 버튼이 클릭되었을 때 호출되는 함수입니다.
// 이 함수는 현재 상태와 클릭된 버튼 정보를 받아서 버퍼에 숫자를 처리하고 화면을 업데이트합니다.
function handleNumberButtonClick(last, key, dataThemeEqualCheck) {
  // 만약 현재 버퍼의 내용이 "0" 이거나, 이전에 "=" 버튼이 눌렸을 경우:
  if (buffer[0] === "0" || dataThemeEqualCheck === "1") {
    // 버퍼의 마지막 값을 제거하고 새로운 숫자 버튼의 값으로 대체합니다.
    buffer.pop();
    buffer.push(key);
    // "btns-equal" 요소의 데이터 테마 속성을 "0"으로 설정합니다.
    document.getElementById("btns-equal").setAttribute("data-theme", "0");
  }
  // 만약 마지막 값이 숫자라면:
  else if (!isNaN(last)) {
    // 버퍼에서 숫자를 꺼내옵니다.
    const num = buffer.pop();
    // 만약 꺼내온 숫자가 빈 문자열이라면 현재 클릭된 숫자 버튼 값으로 대체하고, 아니라면 뒤에 숫자를 추가합니다.
    buffer.push(num === "" ? key : num + key);
  }
  // 마지막 값이 숫자가 아닌 경우:
  else {
    // 현재 클릭된 숫자 버튼 값을 버퍼에 추가합니다.
    buffer.push(key);
  }

  // 변경된 버퍼의 내용을 화면에 업데이트합니다.
  display();
}
```


## 3. `handleSignButtonClick()`

```js
// '부호 변경' 버튼을 처리하는 함수입니다.
function handleSignButtonClick(last) {
  // '=' 버튼 상태 체크와 깜박임 효과 함수를 호출합니다.
  EqualCheck();
  blink();
  
  // '부호 변경' 버튼 요소와 해당 요소의 데이터 테마 속성을 가져옵니다.
  const signCheck = document.getElementById("btns-sign");
  const dataThemeSign = signCheck.dataset.theme;

  // 만약 버퍼의 첫 번째 값이 "0"이 아니라면:
  if (buffer[0] !== "0") {
    // '데이터 테마' 값에 따라서 부호 변경 작업을 수행합니다.
    if (dataThemeSign === "plus") {
      // 데이터 테마를 "minus"로 변경하고, 현재 값에 "-" 부호를 추가하여 음수로 만듭니다.
      signCheck.setAttribute("data-theme", "minus");
      buffer[buffer.length - 1] = "-" + last;
    } else {
      // 데이터 테마를 "plus"로 변경하고, 현재 값에서 "-" 부호를 제거하여 양수로 만듭니다.
      signCheck.setAttribute("data-theme", "plus");
      buffer[buffer.length - 1] = last.slice(1);
    }

    // 변경된 값을 화면에 업데이트합니다.
    display();
  }
}
```

## 4.`handleDeleteButtonClick()`
```js

// '삭제' 버튼을 처리하는 함수입니다.
function handleDeleteButtonClick() {
  // '=' 버튼 상태 체크와 깜박임 효과 함수를 호출합니다.
  EqualCheck();
  blink();
  
  // 버퍼 배열을 초기화하여 값들을 모두 삭제하고, 초기값 "0"을 넣습니다.
  buffer = ["0"];

  // 변경된 값을 화면에 업데이트합니다.
  display();
}
```

## 5.`handleEqualButtonClick()`
```js
// '=' 버튼을 처리하는 함수입니다.
function handleEqualButtonClick() {
  // 깜박임 효과 함수를 호출합니다.
  blink();
  
  try {
    // 버퍼의 내용을 하나의 문자열로 합칩니다.
    const combined = buffer.join("");
    // 합쳐진 문자열을 eval() 함수를 사용하여 평가하고, 그 결과를 문자열 형태로 변환합니다.
    const result = eval(combined).toString();
    // 버퍼를 계산 결과로 대체하고, '=' 버튼의 데이터 테마를 "1"로 설정합니다.
    buffer = [result];
    document.getElementById("btns-equal").setAttribute("data-theme", "1");
    // 변경된 값을 화면에 업데이트합니다.
    display();
  } catch (error) {
    // 오류가 발생하면 아무 작업도 하지 않습니다.
  }
}

```

## 6.   `handleOperatorButtonClick()`
```js

// 사칙 연산자 버튼을 처리하는 함수입니다.
function handleOperatorButtonClick(buffer, last) {
  // '=' 버튼 상태 체크와 깜박임 효과 함수를 호출합니다.
  EqualCheck();
  blink();
  
  // 버퍼의 첫 번째 값이 "0"이 아닌 경우:
  if (buffer[0] !== "0") {
    // 마지막 입력이 사칙 연산자인 경우:
    if (["*", "%", "/", "+", "-"].includes(last)) {
      // 마지막 입력을 제거합니다.
      buffer.pop();
    } // 마지막 입력이 소수점으로 끝나는 경우:
    else if (last.endsWith(".")) {
      // 마지막 입력에서 소수점을 제거합니다.
      buffer[buffer.length - 1] = last.slice(0, -1);
    }

    // 현재 클릭된 연산자 버튼 값을 버퍼에 추가합니다.
    buffer.push(key);
  }
}

```



## 7.`blink()`
```js

// 화면 깜박임 효과를 처리하는 함수입니다.
function blink() {
  // 화면 표시 영역의 요소를 가져옵니다.
  const displayElement = document.querySelector(".display");

  // 화면 표시 영역의 글자 색상을 잠시 변경하여 깜박임 효과를 줍니다.
  displayElement.style.color = "var(--t1-screen-background)";

  // 일정 시간 후에 원래 글자 색상으로 되돌립니다.
  setTimeout(() => {
    displayElement.style.color = "var(--t1-text-display)";
  }, 100); // 100 밀리초(0.1초) 후에 변경됩니다.
}

```
## 8.`display()`
```js
// 화면에 버퍼에 저장된 값을 표시하는 함수입니다.
function display() {
  // 화면 표시 영역의 요소를 가져옵니다.
  const displayElement = document.querySelector(".display");
  
  // 화면 표시 영역의 내용을 버퍼의 마지막 값으로 업데이트합니다.
  displayElement.textContent = buffer[buffer.length - 1];
}

```


## 9.`EqualCheck()`
```js
// '=' 버튼의 데이터 테마를 초기값인 "0"으로 변경하는 함수입니다.
function EqualCheck() {
  // '=' 버튼 요소를 가져와서 데이터 테마 속성을 "0"으로 설정합니다.
  document.getElementById("btns-equal").setAttribute("data-theme", "0");
}

```
---
## 어려웠던 점
1. 한 인덱스 안에 .이 중복 입력되는 현상

	- 이전 혹은 현재 인덱스 문자열의 마지막이 .으로 끝나면 마지막 문자를 삭제후 다시 buffer에 저장

3. 결과 값 추출 후 숫자를 입력하면 이전 결과값에 숫자가 이어서 입력되는 현상
4. 결과가 나온후 결과값에 연속으로 연산이 되지 않고, 이어져 작성만 되는 현상
	- data-theme을 이용하여 결과값 추출 후 숫자가 바로 입력될시 buffer를 초기화 후 저장


---
[calculator 구현](https://minseok-s.github.io/calculator/)
![](https://velog.velcdn.com/images/minseok_s/post/cbf11a8a-542e-425d-8d14-7348a3fac63f/image.png)
