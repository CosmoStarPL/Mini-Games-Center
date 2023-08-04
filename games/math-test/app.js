const currentKey = 'math_test_current'
const recordKey = 'math_test_record'

const createItem = (key, value = '0') => {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, value)
  }
}

const updateItem = (key, mode = true) => {
  if (mode) {
    const value = localStorage.getItem(key)
    localStorage.setItem(key, (parseInt(value) + 1).toString())
  } else {
    localStorage.setItem(key, '0')
  }
}

createItem(currentKey)
createItem(recordKey)

const current = document.getElementById('current')
const record = document.getElementById('record')
const firstOperand = document.getElementById('operand-first')
const operator = document.getElementById('operator')
const secondOperand = document.getElementById('operand-second')
const result = document.getElementById('result')
const answerYes = document.getElementById('answer-yes')
const answerNo = document.getElementById('answer-no')

const getRandomNumber = (except = 0) => {
  while (true) {
    const random = Math.floor(Math.random() * 100) + 1
    if (random !== except) {
      return random
    }
  }
}

const chooseRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

current.innerText = localStorage.getItem(currentKey)
record.innerText = localStorage.getItem(recordKey)

while (true) {
  firstOperand.innerText = getRandomNumber().toString()
  secondOperand.innerText = getRandomNumber().toString()

  if (firstOperand.innerText !== secondOperand.innerText) {
    break
  }
}

operator.innerText = chooseRandomElement(['+', '-', '*', '/'])

const expression = firstOperand.innerText + operator.innerText + secondOperand.innerText
const answer = eval(expression)
const option = chooseRandomElement([getRandomNumber(answer), answer])
result.innerText = option

const win = () => {
  updateItem(currentKey)
  if (localStorage.getItem(currentKey) > localStorage.getItem(recordKey)) {
    updateItem(recordKey)
  }
  location.reload()
}

const lose = () => {
  updateItem(currentKey, false)
  location.reload()
}

answerYes.onclick = () => (answer === option ? win : lose)()
answerNo.onclick = () => (answer !== option ? win : lose)()
