const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("enter the array, seperate element by space: ", (input) => {
  const arr = input.split(" ");
  console.log("result array: ", removeDuplicate(arr));
  readline.close();
});

function removeDuplicate(arr) {
  let st = new Set(arr);
  return [...st];
}
