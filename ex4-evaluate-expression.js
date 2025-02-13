const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("enter text: ", (text) => {
  console.log("result: ", evaluateExpression(text));
  readline.close();
});

function checkPrecedence(operator) {
  switch (operator) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
    case "(":
      return -1;
    default:
      return 0;
  }
}

function toPosfix(text) {
  let result = [];
  let stack = ["("];
  let number = null;
  let operatorExisted = true;
  let negative = false;
  text += ")";
  for (let i = 0; i < text.length; i++) {
    if (text[i] === " ") continue;
    if (text[i] === "-" && operatorExisted) {
      negative = !negative;
      continue;
    }
    switch (text[i]) {
      case "+":
      case "-":
      case "*":
      case "/":
      case "(":
      case ")":
        if (number !== null) {
          result.push(negative ? -number : number);
          number = null;
          if (text[i] !== "(" && text[i] !== ")") {
            negative = false;
            operatorExisted = true;
          } else operatorExisted = false;
        }
        while (
          text[i] !== "(" &&
          checkPrecedence(stack[stack.length - 1]) >= checkPrecedence(text[i])
        ) {
          result.push(stack.pop());
        }
        if (text[i] === ")") stack.pop();
        else stack.push(text[i]);
        break;
      default:
        operatorExisted = false;
        if (number === null) number = Number.parseInt(text[i]);
        else number = number * 10 + Number.parseInt(text[i]);
        break;
    }
  }
  return result;
}

function calculate(a, b, operator) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      return 0;
  }
}

function evaluateExpression(text) {
  let arr = toPosfix(text);
  let stack = [];
  arr.forEach((value) => {
    if (typeof value === "number") stack.push(value);
    else {
      let b = stack.pop();
      let a = stack.pop();
      stack.push(calculate(a, b, value));
    }
  });
  return stack.pop();
}
