const CODES = {
  A: 65,
  Z: 90
}

function toChar(index) {
  return String.fromCharCode(CODES.A + index)
}

function toCell(row) {
  return function(_, index) {
    const indexChar = toChar(index)
    return `
      <div class="cell" contenteditable 
        data-type="cell"
        data-row="${row}" 
        data-col="${indexChar}"
        data-id="${row}:${index + 1}">
      </div>
    `
  }
}

function toCol(_, index) {
  const indexChar = toChar(index)
  return `
    <div class="col" 
      data-type="resizable" 
      data-col="${indexChar}">
      ${indexChar}
      <div class="col__resize" data-resize="col"></div>
      <div class="col__resize-line" data-resize-line="col"></div>
    </div>
  `
}

function createRow(content, index) {
  const resize = index
  ? '<div class="row__resize" data-resize="row"></div>'
  : ''
  const resizeLine = index
  ? '<div class="row__resize-line" data-resize-line="row"></div>'
  : ''
  return `
    <div class="row" 
      data-type="resizable" 
      data-row="${index}">
      <div class="row__info">
        ${index}
        ${resize}
        ${resizeLine}
      </div>
      <div class="row__data">${content}</div>
    </div>
  `
}

export function createTable(rowsCount, colsCount) {
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toCol)
      .join('')

  rows.push(createRow(cols, ''))

  for (let row = 1; row <= rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row))
        .join('')

    rows.push(createRow(cells, row))
  }

  return rows.join('')
}
