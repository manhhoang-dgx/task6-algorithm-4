const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Enter a list of numbers separated by space: ", (input) => {
  arr = input.split(" ").map((num) => parseFloat(num));
  console.log("Second largest: " + findSecondLargestInt(arr));
  readline.close();
});

function findSecondLargestInt(arr) {
  let largest = arr[0];
  let secondLargest = null;

  for (let num of arr) {
    if (!Number.isInteger(num)) return "Invalid input";
    if (num > largest) {
      secondLargest = largest;
      largest = num;
    } else if (num > secondLargest && num !== largest) {
      secondLargest = num;
    }
  }

  return secondLargest ?? "There is no second largest number";
}
