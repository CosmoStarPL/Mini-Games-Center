let numbers = document.querySelectorAll("#numbers td")
let button = document.querySelector("#hide-button")
let find = document.querySelector("#find-number")
let space = document.querySelector("#empty-space")
let guess = document.querySelector("#guess")

function getRandom() {
  return Math.floor(Math.random() * 9 + 1).toString()
}