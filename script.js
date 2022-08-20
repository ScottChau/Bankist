"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements) {
  // innerHTML including the tag and text while textContent includes only text
  containerMovements.innerHTML = "";
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, value) => acc + value, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calDisplaySummary = function (acc) {
  //
  const income = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}€`;
  //
  const outcome = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcome)}€`;
  //at least 1 euro € will get interest
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUsername(accounts);

const updateUI = function () {
  // Display movements
  displayMovements(currentAccount.movements);
  // Display balance
  calcDisplayBalance(currentAccount);
  // Display summary
  calDisplaySummary(currentAccount);
};

// Event handler

let currentAccount;

// event object will be passed to callback function when clicked
btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();
  console.log("LOGIN");
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;
    updateUI();
  }

  // Clear input fields
  inputLoginUsername.value = inputLoginPin.value = "";
  // remove the cursor
  inputLoginPin.blur();
});

// Transfer money
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = "";
  if (
    amount > 0 &&
    // if object exists , return true
    receiverAcc &&
    currentAccount.balance >= amount &&
    currentAccount.username !== receiverAcc?.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI();
  }
});

// Delete account

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      (acc) => inputCloseUsername.value === acc.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = "";
    labelWelcome.textContent = `Log in to get started`;
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/*
// Slice method - does not mutate

let arr = ["a", "b", "c", "d", "e"];

console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(1, -2));

// create shallow copy
console.log(arr.slice());
console.log([...arr]);

// Splice method - will change to original array
console.log(arr.splice(2));
// arr.splice(-1);
// arr.splice(1, 2);
console.log(arr);

// Reverse method - will mutate the original array
const arr2 = ["t", "t", "o", "c", "s"];
arr2.reverse();
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);

// JOIN
console.log(letters.join("-"));
*/

/*
// At Method
const arr = [23, 11, 64];

console.log(arr[0]);
console.log(arr.at(0));

// getting last array
console.log(arr.slice(-1)[0]);
console.log(arr[arr.length - 1]);
console.log(arr.at(-1));

// at method on string
console.log("scott".at(0));

*/

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited for $${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew for $${Math.abs(movement)}`);
  }
}

console.log("------For Each-------");
// forEach method
// orders is important for parameter (elements , index , entire array)
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited for $${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew for $${Math.abs(mov)}`);
  }
});

*/

/*
// forEach method for Map
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// forEach method for set

const countries = new Set([
  "Canada",
  "Canada",
  "USA",
  "USA",
  "UK",
  "Taiwan",
  "Mexico",
]);

// _ means unnecessary variable
countries.forEach(function (value, _, set) {
  console.log(`${value}`);
});

*/

/*
// Challenge #1
const checkDogs = function (dogsJulia, dogsKate) {
  // shallow copy
  const juliaCopy = dogsJulia.slice();
  // remove elements
  juliaCopy.splice(0, 1);
  juliaCopy.splice(-2, 2);
  // combine
  const combineData = [...juliaCopy, ...dogsKate];
  // check if it is adult
  combineData.forEach(function (dogAge, i) {
    if (dogAge >= 3) {
      console.log(
        `Dog number ${i + 1} is an adult, and is ${dogAge} years old`
      );
    } else {
      console.log(
        `Dog number ${i + 1} is still a puppy, and is ${dogAge} years old 🐶`
      );
    }
  });
};

const juliaData = [3, 5, 2, 12, 7];
const juliaData2 = [9, 16, 6, 8, 3];

const kateData = [4, 1, 15, 8, 3];
const kateData2 = [10, 5, 6, 1, 4];

checkDogs(juliaData, kateData);
checkDogs(juliaData2, kateData2);
*/

/*
// map method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUsd = 1.1;

const movementsToUSD = movements.map(function (mov) {
  return mov * euroToUsd;
});

console.log(movements);
console.log(movementsToUSD);

// use arrow function to complete
const movementsToUSDArrow = movements.map((mov) => mov * euroToUsd);
console.log(movementsToUSDArrow);

//
const movementToUsdDescription = movements.map((mov, i) => {
  const type = mov > 0 ? "deposited" : "withdrew";
  return `Movement ${i + 1}: You ${type} ${Math.abs(mov)}`;
});

console.log(movementToUsdDescription);

// Using forLoop for the same task
const movementsUSD = [];

for (let mov of movements) {
  movementsUSD.push(mov * euroToUsd);
}

console.log(movementsUSD);

*/

/*
// Filter method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter((mov) => mov > 0);

console.log(deposits);

const withdrawals = movements.filter((mov) => mov < 0);
console.log(withdrawals);

// use for loop to filter

const depositFor = [];
for (const mov of movements) {
  if (mov > 0) {
    depositFor.push(mov);
  }
}
console.log(depositFor);
*/

/*
// Reduce method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// accumulator -> SNOWBALL
const balance = movements.reduce(function (acc, value, i, arr) {
  console.log(`Iteration: ${i}: ${acc}`);
  return acc + value;
}, 0);

console.log(balance);
// using arrow
const balanceArrow = movements.reduce((acc, value) => acc + value, 0);
console.log(balanceArrow);

// using for of loop

let sum = 0;

for (const mov of movements) {
  sum += mov;
}
console.log(sum);

// Maximum value

const max = movements.reduce((acc, value) => {
  if (acc < value) {
    acc = value;
  }
  return acc;
  // Jonas way
  // if (acc > mov) return acc
  // else return mov
}, 0);
console.log(max);

*/

/*

// Challenge #2

function calcAverageHumanAge(arr) {
  // convert dog age to human age
  const humanAge = arr.map(function (age) {
    if (age <= 2) {
      return 2 * age;
    } else {
      return 16 + age * 4;
    }
  });
  // Filter the less than 18
  const adultDogs = humanAge.filter((age) => age >= 18);

  // calculate average
  const average =
    adultDogs.reduce((acc, value, i) => acc + value, 0) / adultDogs.length;

  // another way to calculate average
  // const average = adultDogs.reduce((acc,value,i,arr) => acc + value/arr.length ,0)

  // 2 3 . (2+3)/2 = 2.5 === 2/2 + 3/2 = 2.5

  console.log(humanAge);
  console.log(adultDogs);

  console.log(average);
  console.log("-------------");
}

const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];

calcAverageHumanAge(data1);
calcAverageHumanAge(data2);

*/

/*

// Chaining method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUSD = 1.1;
// PIPELINE
const totalDepositsUSD = movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * eurToUSD)
  .reduce((arr, mov) => arr + mov);

console.log(totalDepositsUSD);

*/

/*
// Challenge 3
const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];

function calcAverageHumanAge(arr) {
  return arr
    .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter((humanAge) => humanAge > 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
}

console.log(calcAverageHumanAge(data1));
console.log(calcAverageHumanAge(data2));
*/

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// Find method only return the first elements that satisfy the condition

const firstWithdrawal = movements.find((mov) => mov < 0);

console.log(firstWithdrawal);

// find the object in the array based on property in object
const account = accounts.find((mov) => mov.owner === "Jessica Davis");
console.log(account);

// using for of loop

let targetAccount = {};

for (const account of accounts) {
  if (account.owner === "Jessica Davis") {
    targetAccount = account;
  }
}
console.log(targetAccount);

*/
