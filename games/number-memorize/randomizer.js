let array = [];
while (array.length !== 9) {
  let random = parseInt(getRandom())
  if (!array.includes(random))
    array.push(random)
}
let i = 0
for (let td of numbers) {
  if (i === 10) break
  td.innerHTML = array[i]
  td.setAttribute("number", array[i])
  i++
}

find.style.display = "none"
space.style.display = "block"
