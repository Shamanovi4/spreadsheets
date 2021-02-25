export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function nextSelector(key, {row, col}, {rows, cols}) {
  const MIN_VALUE = 1

  switch (key) {
    case 'Enter':
      row = row + 1 < rows ? row + 1 : rows
      break
    case 'Tab': col++
      break
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
      break
    case 'ArrowDown':
      row = row + 1 < rows ? row + 1 : rows
      break
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
      break
    case 'ArrowRight':
      col = col + 1 < cols ? col + 1 : cols
      break
  }

  return `[data-id="${row}:${col}"]`
}
