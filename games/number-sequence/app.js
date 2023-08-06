const iterationKey = 'number_sequence_iteration'
const recordKey = 'number_sequence_record'
const livesCountKey = 'number_sequence_lives_count'

const CellsCount = 9;
let SequenceNumbers = [1, 2, 3];

const matrix = [];
let hideButtonClicked = false;
let sequenceIndex = 0;
let iteration = parseInt(localStorage.getItem(iterationKey)) || 0;
let record = parseInt(localStorage.getItem(recordKey)) || 0;

const dataLabel = document.getElementById('dataLabel');
const hideButton = document.getElementById('hideButton');
const resetButton = document.getElementById('resetButton');
const matrixContainer = document.getElementById('matrix');

for (let i = 0; i < CellsCount; i++) {
  const cell = createCell();
  matrix.push(cell);
  matrixContainer.appendChild(cell);
}

resetGame()
createItem(iterationKey)
createItem(recordKey)
createItem(livesCountKey)

hideButton.addEventListener('click', function() {
  hideMatrix();
  this.style.display = 'none';
  resetButton.style.display = 'none';
  dataLabel.textContent = 'Click On Cells';
});

resetButton.addEventListener('click', resetGame);

function createItem(key, value = '0') {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, value)
  }
}

function createCell() {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.addEventListener('click', onClickCell);
  return cell;
}

function resetGame() {
  hideButtonClicked = false;
  sequenceIndex = 0;

  for (let i = 0; i < CellsCount; i++) {
    matrix[i].textContent = '';
  }

  hideButton.style.display = 'block';
  resetButton.style.display = 'block';

  iteration++;
  localStorage.setItem(iterationKey, iteration.toString())

  if (iteration % 3 === 0) {
    extendSequence();
  }

  // Show the sequence numbers in random cells
  const randomIndices = getRandomIndices(SequenceNumbers.length, CellsCount);
  for (let i = 0; i < SequenceNumbers.length; i++) {
    const index = randomIndices[i];
    matrix[index].textContent = SequenceNumbers[i];
    matrix[index].dataset.number = SequenceNumbers[i].toString();
  }
}

function hideMatrix() {
  hideButtonClicked = true;
  for (let i = 0; i < CellsCount; i++) {
    matrix[i].textContent = '';
  }
}

function onClickCell() {
  if (!hideButtonClicked) return;

  const clickedNumber = parseInt(this.dataset.number) || 0;
  if (clickedNumber === SequenceNumbers[sequenceIndex]) {
    // Show the target number briefly when the user clicks the correct item
    this.innerText = sequenceIndex < SequenceNumbers.length
        ? SequenceNumbers[sequenceIndex]
        : '';

    sequenceIndex++;

    if (sequenceIndex === SequenceNumbers.length) {
      if (iteration > record) {
        record = iteration;
        localStorage.setItem(recordKey, record);
      }
      extendSequence();
      resetGame();
    }
  } else {
    sequenceIndex = 0;
  }

  dataLabel.textContent = `Iteration: ${iteration} | Record: ${record}`;
}

function extendSequence() {
  const lastNumber = SequenceNumbers[SequenceNumbers.length - 1];
  const newNumber = lastNumber + 1;
  SequenceNumbers.push(newNumber);
}

function getRandomIndices(n, max) {
  const indices = Array.from({ length: max }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, n);
}
