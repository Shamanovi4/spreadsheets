import {wrap} from '@core/utils'
import {toInlineStyles} from '@core/utils'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 100
const DEFAULT_HEIGHT = 21

export function toChar(index) {
  return String.fromCharCode(CODES.A + index)
}

function getWidth(state, index) {
  return (state[toChar(index)] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function insertSelection() {
  return `
    <div class="table-selection" 
      data-type="selection"
    >
    </div>
  `
}

function toCell(row, state) {
  return function(_, index) {
    const id = `${row}:${index + 1}`
    const indexChar = toChar(index)
    const width = getWidth(state.colState, index)
    const data = state.dataState[id]
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })
    return `
      <div 
        class="cell" contenteditable 
        data-type="cell"
        data-row="${row}" 
        data-col="${indexChar}"
        data-id="${id}"
        data-value="${data || ''}"
        style="${styles}; width: ${width}"
      >
      <span>${parse(data) || ''}</span>
      </div>
    `
  }
}

function toColLabel({index, width}) {
  const indexChar = toChar(index)
  return `
    <div 
      class="col--label" 
      data-type="resizable" 
      data-col="${indexChar}"
      style="width: ${width}"
    >
      ${indexChar}
      <div class="col__resize" data-resize="col"></div>
      <div class="col__resize-line" data-resize-line="col"></div>
    </div>
  `
}

function createNotationCol(content) {
  return `
    <div
      class="notation-col"
      data-type="notation-col"
    >
      ${content}
    </div>
  `
}

function toRowLabel(state) {
  return function(_, index) {
    const height = getHeight(state.rowState, index + 1)
    return `
      <div
        class="row row--label" 
        data-type="resizable" 
        data-row="${index + 1}"
        style="height: ${height}"
      >
        ${index + 1}
        <div class="row__resize" data-resize="row"></div>
        <div class="row__resize-line" data-resize-line="row"></div>
      </div>
    `
  }
}

function createRow(content, index, rowState, rowType) {
  const height = rowType === 'notation-row'
      ? '' : `style="height: ${getHeight(rowState, index)}"`
  const className = rowType
  const selector = rowType === 'notation-row'
      ? '<div class="selector"></div>' : ''
  const dataType = rowType === 'notation-row'
      ? `data-type="notation-row"` : ''
  return `
    <div
      class="${className}" 
      data-row="${index}"
      ${dataType}
      ${height}
    >
      ${selector}
      ${content}
    </div>
  `
}

function withWidthFrom(state) {
  return function(_, index) {
    return {
      index, width: getWidth(state.colState, index)
    }
  }
}

function withHeightFrom(state) {
  return function(_, index) {
    return {
      index, height: getHeight(state.rowState, index)
    }
  }
}

export function createTable(rowsCount, colsCount, state = {}) {
  const rows = []

  const colLabels = new Array(colsCount)
      .fill('')
      .map(withWidthFrom(state))
      .map(toColLabel)
      .join('')

  const notationRow = createRow(colLabels, '', {}, 'notation-row')

  const rowLabels = new Array(rowsCount)
      .fill('')
      .map(withHeightFrom(state))
      .map(toRowLabel(state))
      .join('')

  const notationCol = createNotationCol(rowLabels)

  for (let row = 1; row <= rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row, state))
        .join('')

    rows.push(createRow(cells, row, state.rowState, 'row'))
  }

  let grid = wrap(insertSelection() + rows.join(''),
      'div', 'grid', 'data-type="grid"')
  grid = wrap(notationCol + grid,
      'div', 'grid-scrollable-wrapper', 'data-type="scrollable"')
  grid = wrap(grid, 'div', 'grid-fixed-container', 'data-type="fixed"')


  return wrap(notationRow + grid, 'div', 'spreadsheet__table__inner')
}
