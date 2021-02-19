const CODES = {
  A: 65,
  Z: 90
}

function toChar(code, index) {
  return String.fromCharCode(code + index)
}

function toCell(content, index) {
  const indexChar = toChar(CODES.A, index)
  return `
    <div class="cell" data-row="${index + 1}" data-column="${indexChar}">
      ${content}
    </div>
  `
}

function toColumn(_, index) {
  const indexChar = toChar(CODES.A, index)
  return `
    <div class="column" data-type="resizable" data-column="${indexChar}">
      ${indexChar}
      <div class="column__resize" data-resize="column"></div>
      <div class="column__resize-line" data-resize-line="column"></div>
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
    <div class="row" data-type="resizable" data-row="${index}">
      <div class="row__info">
        ${index}
        ${resize}
        ${resizeLine}
      </div>
      <div class="row__data">${content}</div>
    </div>
  `
}

export function createTable(rowsCount) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toColumn)
      .join('')

  rows.push(createRow(cols, ''))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')

    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
}
