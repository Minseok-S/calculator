<계산기>

기능

1. 기본적인 사칙연산 수행
2. 연산자 입력시 깜빡임 -> 연산자가 입력되었음을 사용자가 알 수 있도록.

```
function blink() {
  const displayElement = document.querySelector(".display");

  displayElement.style.color = "var(--t1-screen-background)";
  setTimeout(() => {
    displayElement.style.color = "var(--t1-text-display)";
  }, 100);
}
```

어려웠던 점

1. 한 인덱스 안에 .이 있다면 더 이상 입력되지 않도록 구현.

   ```
     if (last && last.indexOf(key) !== -1) {
     break;
     } else {
     num = buffer.pop();
     buffer.push(num + key);

     break;
     }
   ```

   문제점 1) 산칙연산 기호 입력 후 .을 입력하면 한 인덱스의 여러개의 .가 입력되는 현상 발생

   ```
   if (last.charAt(last.length - 1) === ".") {
    buffer.pop();
    buffer.push(last.slice(0, -1));
   }
   ```

   해결 1) 이전에 저장된 문자열의 마지막이 .으로 끝나면 마지막 문자를 삭제후 다시 buffer에 넣어준다.

```

2. 숫자와 연산자 입력 후 모든 인덱스를 더하여 결과 값 출력 구현
```

      case "btns-equal":
      result = eval(replaceMultiplyString);
      buffer = [result];
      break;

}
replaceMultiplyString = buffer.join("").replace(/\*/g, "x");

```

문제 1) 결과 값 추출 후 숫자를 입력하면 이전 결과값에 숫자가 이어서 입력되는 현상 발생

해결 1) 배열에 입력되는 숫자와 연산 기호는 string으로 저장됨, 그러나 결과 값은 배열에 number로 저장되는 것을 이용하여 숫자를 입력시 buffer에 입력된 type을 확인. number일 경우 버퍼에 저장된 결과값을 지우고 숫자가 새로 입력되도록 함.

```

if (buffer[0] == "0" || typeof buffer[0] == "number") {
buffer.pop();
buffer.push(key);
}

```

문제 2) 결과가 나온후 결과값에 연속으로 연산이 되지 않고, 이어져 작성만 되는 현상 발생

해결 2) 해결 1)에 진행한 type 확인을 인덱스 0번으로 진행헀더니, 0번에 들어있던 결과값이 number이기 때문에 그 다음 연산자를 입력 후 숫자를 입력하면 연산자가 삭제되는 현상이 발생했음. -> type 확인은 인덱스 0번이 아닌 그전에 저장되있는 인덱스 값을 확익하는 last 변수로 변경하여 해결

```

let last = buffer[buffer.length - 1];
if (buffer[0] == "0" || typeof last == "number") {
buffer.pop();
buffer.push(key);
}

```

```
