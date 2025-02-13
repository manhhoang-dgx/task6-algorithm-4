const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("enter text: ", (text) => {
  console.log("result: ", reverseWord(text));
  readline.close();
});

function toUpperCase(text) {
  if (text < "a" || text > "z") return text;
  return String.fromCharCode(text.charCodeAt(0) - 32);
}

function upperCaseLast(word) {
  if (word.length < 1) return word;
  return (
    word.substring(0, word.length - 1) + toUpperCase(word[word.length - 1])
  );
}

function reverseWord(text) {
  let tmp = "";
  let result = "";
  for (let i = text.length - 1; i >= 0; i--) {
    if (text[i] === " ") {
      tmp = upperCaseLast(tmp);
      result += tmp + " ";
      tmp = "";
    } else tmp += text[i];
  }
  tmp = upperCaseLast(tmp);
  result += tmp + text;
  return result;
}
