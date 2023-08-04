const iterationKey = 'matrix_memorize_iteration'
const percentKey = 'matrix_memorize_percent'
const cellsCount = 25

const matrix = []
let errorAttempts = 0
let iteration
let percent

document.addEventListener('DOMContentLoaded', function () {
  const hideButton = document.getElementById('hideButton')
  const resetButton = document.getElementById('resetButton')
  const matrixContainer = document.getElementById('matrix')

  for (let item = 0; item < cellsCount; item++) {
    const cell = createCell()
    matrix.push(cell)
    matrixContainer.appendChild(cell)
  }

  setStatistics()
  loadMatrix(true)

  hideButton.addEventListener('click', function () {
    loadMatrix(false)
    this.style.display = 'none'
    resetButton.style.display = 'none'
  })

  resetButton.addEventListener('click', function () {
    const confirmed = confirm('Are you sure you want to reset the game?')
    if (confirmed) {
      localStorage.removeItem(iterationKey)
      localStorage.removeItem(percentKey)
      location.reload()
    }
  })
})

function createCell() {
  const cell = document.createElement('div')
  cell.classList.add('cell', 'off')
  cell.dataset.state = '0-'
  cell.addEventListener('click', onClickButton)
  return cell
}

function setStatistics() {
  const dataLabel = document.getElementById('dataLabel')
  iteration = parseInt(localStorage.getItem(iterationKey) || 0)
  percent = parseInt(localStorage.getItem(percentKey) || 0)

  let data = ''
  if (iteration !== 0 && percent !== 0)
    data = `Iteration ${iteration}: ${percent}%`
  dataLabel.textContent = data
}

function loadMatrix(mode) {
  for (const cell of matrix) {
    if (mode) {
      const flag = getRandom()
      cell.classList.remove('active', 'passive', 'off')
      cell.classList.add(flag ? 'active' : 'off')
      cell.dataset.state = flag ? '1-' : '0-'
    } else {
      const tag = cell.dataset.state
      cell.classList.remove('active', 'passive')
      cell.classList.add('off')
      cell.dataset.state = tag.charAt(0)
    }
  }
}

function onClickButton() {
  const self = this
  switch (self.dataset.state) {
    case '0':
      self.classList.remove('off')
      self.classList.add('passive')
      self.dataset.state = '0+'
      errorAttempts++
      break
    case '1':
      self.classList.remove('off')
      self.classList.add('active')
      self.dataset.state = '1+'

      let flag = true
      for (const cell of matrix) {
        const tag = cell.dataset.state
        if (tag.includes('1') && !tag.includes('1+')) {
          flag = false
          break
        }
      }
      if (flag) {
        iteration++
        percent = percent === 0 ? getSuccessPercent(errorAttempts) : (getSuccessPercent(errorAttempts) + percent) / 2
        localStorage.setItem(iterationKey, iteration)
        localStorage.setItem(percentKey, percent)
        location.reload()
      }
      break
  }
}

function getSuccessPercent(errorsCount) {
  const successCount = cellsCount - errorsCount
  return Math.round((successCount * 100) / cellsCount)
}

function getRandom() {
  return Math.random() < 0.5
}
