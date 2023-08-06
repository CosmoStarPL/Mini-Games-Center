const target_number = document.getElementById("target_number");
const alive = document.querySelector(".alive");
const content = document.getElementById("content");
const hide = document.getElementById("hide");
const bg = document.querySelector("body");

let numss_array = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => 0.5 - Math.random());
let hide_check = false;
let life = 3;
let boxCount = 0

let nums_array = [];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const updateTargetNumber = () => {
  if (nums_array.length === 0) {
    nums_array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffleArray(nums_array);
  }
  target_number.innerText = nums_array.pop();
};

alive.innerText = life;

for (let i = 1; i < 10; i++) {
  let cell = document.createElement("button");
  cell.classList.add("box");
  cell.innerText = numss_array[i - 1];

  updateTargetNumber();
  cell.addEventListener("click", (e) => {
    if (hide_check) {
      if (e.target.innerText == target_number.innerText) {
        cell.style.background = "transparent";
        updateTargetNumber();
        if(cell.style.background === "transparent"){
          boxCount++
          if (boxCount == 9) {
            location.reload()
          }
        }
      } else {
        life--;
        alive.innerText = life;
        if (life < 1) {
          location.reload();
        }
        bg.style.background = "red";
        setTimeout(() => {
          bg.style.background = "rgb(169, 222, 241)";
        }, 500);
      }
    }
  });
  content.appendChild(cell);
}

target_number.style.display = "none";
hide.onclick = () => {
  hide_check = true;
  target_number.style.display = "inline";
  for (const cell of document.querySelectorAll(".box")) {
    cell.style.background = "black";
  }
};
