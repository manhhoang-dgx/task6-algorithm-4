const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("enter text: ", (text) => {
  console.log("result: ", evaluateExpression(text));
  readline.close();
});

function addPrecedence(params) {
  if (typeof params === "string") {
    let result =
      "(" +
      addPrecedence({
        text: params,
        start: 0,
      }) +
      ")";
    return result;
  }
  let text = params.text;
  let start = params.start;
  let prevIsAddMinus = true;
  let recentNumberFirstIndex = -1;
  let recentNumberLastIndex = -1;
  for (let i = start; i < text.length; i++) {
    if (text[i] === " ") continue;

    switch (text[i]) {
      case "(":
        if (recentNumberFirstIndex === -1) recentNumberFirstIndex = i;
        params.text = text;
        params.start = i + 1;
        text = addPrecedence(params);
        i = params.start;
        if (recentNumberFirstIndex !== -1) recentNumberLastIndex = i;
        break;
      case ")":
        if (!prevIsAddMinus) {
          if (recentNumberLastIndex !== -1) {
            let tmp =
              text.substring(0, recentNumberLastIndex + 1) +
              ")" +
              text.substring(recentNumberLastIndex + 1);
            text = tmp;
          }
        }
        params.start = i;
        return text;
      case "*":
      case "/":
        if (prevIsAddMinus) {
          if (recentNumberFirstIndex !== -1) {
            let tmp =
              text.substring(0, recentNumberFirstIndex) +
              "(" +
              text.substring(recentNumberFirstIndex);
            text = tmp;
          }
        }
        prevIsAddMinus = false;
        recentNumberFirstIndex = -1;
        recentNumberLastIndex = -1;
        break;
      case "+":
      case "-":
        if (!prevIsAddMinus) {
          if (recentNumberLastIndex !== -1) {
            let tmp =
              text.substring(0, recentNumberLastIndex + 1) +
              ")" +
              text.substring(recentNumberLastIndex + 1);
            text = tmp;
          }
        }
        prevIsAddMinus = true;
        recentNumberFirstIndex = -1;
        recentNumberLastIndex = -1;
        break;
      default:
        if (recentNumberFirstIndex === -1) recentNumberFirstIndex = i;
        if (recentNumberFirstIndex !== -1) recentNumberLastIndex = i;
        break;
    }
  }
  if (!prevIsAddMinus) {
    if (recentNumberLastIndex !== -1) {
      let tmp =
        text.substring(0, recentNumberLastIndex + 1) +
        ")" +
        text.substring(recentNumberLastIndex + 1);
      text = tmp;
    }
  }
  return text;
}

function calculate(result, number, operation) {
  switch (operation) {
    case "+":
      result += number;
      break;
    case "-":
      result -= number;
      break;
    case "*":
      result *= number;
      break;
    case "/":
      result /= number;
      break;
    default:
      return "invalid operation";
  }
  return result;
}

function evaluateExpression(params) {
  if (typeof params === "string") {
    return evaluateExpression({
      text: addPrecedence(params),
      start: 0,
    });
  }
  const text = params.text;
  const start = params.start;
  let result = 0;
  let isNegative = false;
  let operation = "+";
  let confirmedOperation = "";
  let number = null;

  for (let i = start; i < text.length; i++) {
    if (text[i] === " ") continue;
    if (
      text[i] === "+" ||
      text[i] === "-" ||
      text[i] === "*" ||
      text[i] === "/" ||
      text[i] === ")"
    ) {
      if (confirmedOperation !== "") {
        if (number === null) return "invalid expression";
        result = calculate(result, number, confirmedOperation);
        confirmedOperation = "";
        number = null;
        isNegative = false;
      }
    }
    switch (text[i]) {
      case "+":
        if (operation === "") operation = "+";
        break;
      case "-":
        if (operation === "") operation = "-";
        else isNegative = !isNegative;
        break;
      case "*":
        if (operation === "") operation = "*";
        else return "invalid expression";

        break;
      case "/":
        if (operation === "") operation = "/";
        else return "invalid expression";

        break;
      case "(":
        params.start = i + 1;
        let innerResult = evaluateExpression(params);
        if (innerResult !== "invalid expression") number = innerResult;
        else return innerResult;

        if (operation !== "") {
          confirmedOperation = operation;
          operation = "";
        }

        i = params.start;
        break;
      case ")":
        params.start = i;
        return result;
      default:
        if (text[i] === " ") continue;
        let tmp = Number.parseFloat(text[i]);
        if (!Number.isInteger(tmp)) return "invalid expression";

        if (isNegative) tmp = -tmp;

        if (number === null) number = tmp;
        else number = number * 10 + tmp;

        if (operation !== "") {
          confirmedOperation = operation;
          operation = "";
        }

        break;
    }
  }
  result = number;
  return result;
}
