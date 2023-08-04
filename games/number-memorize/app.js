button.onclick = function () {
  button.style.display = "none"
  find.style.display = "flex"
  space.style.display = "none"
  guess.innerHTML = getRandom()

  for (let td of numbers) {
    td.innerHTML = "";
  }
}

let guessList = []
for (let td of numbers) {
  td.onclick = function (event) {
    if (find.style.display === "flex") {
      let number = event.target.getAttribute("number")
      if (guess.innerHTML === number) {
        event.target.innerHTML = number
        guessList.push(number)

        let random = getRandom()
        guess.innerHTML = random
        console.log(guessList.includes(random))
      }
    }
  }
}