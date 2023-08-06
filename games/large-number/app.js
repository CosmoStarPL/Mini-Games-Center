const num1 = document.getElementById("num-1");
const num2 = document.getElementById("num-2");
const current_number = document.querySelector(".current_number");
const record_number = document.querySelector(".record_number");

const currentKey = "large_number_current";
const recordKey = "large_number_record";
let user_click = 0;

const createItem = (key, value = "0") => {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, value);
  }
};

const updateItem = (key, mode = true) => {
  if (mode) {
    const value = localStorage.getItem(key);
    localStorage.setItem(key, (parseInt(value) + 1).toString());
  } else {
    localStorage.setItem(key, "0");
  }
};

createItem(currentKey);
createItem(recordKey);

function random_nums() {
  let number1;
  let number2;
  number1 = Math.floor(Math.random() * 100);
  do {
    number2 = Math.floor(Math.random() * 100);
  } while (number2 === number1);

  return [number1, number2];
}

let [number1, number2] = random_nums();
num1.innerHTML = number1;
num2.innerHTML = number2;
current_number.innerHTML = localStorage.getItem(currentKey);
record_number.innerHTML = localStorage.getItem(recordKey);

const win = () => {
  updateItem(currentKey);
  if (parseInt(localStorage.getItem(currentKey)) > parseInt(localStorage.getItem(recordKey))) {
    updateItem(recordKey);
  }
  location.reload();
};

function check() {
  while (true) {
    if (number1 > number2) {
      if (user_click == number1) {
        win();
        break;
      } else {
        updateItem(currentKey, false);
        location.reload();
        break;
      }
    } else {
      if (user_click == number2) {
        win();
        break;
      } else {
        updateItem(currentKey, false);
        location.reload();
        break;
      }
    }
  }
}

num1.onclick = () => {
  user_click = number1;
  check();
};
num2.onclick = () => {
  user_click = number2;
  check();
};
