export class TableSelection {
  static className = 'cell--selected'

  constructor() {
    this.group = []
    this.current = null
  }

  range(start, end) {
    if (start > end) {
      [end, start] = [start, end]
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, index) => start + index)
  }

  select($el) {
    this.current = $el
    this.clear()
    this.group.push($el)
    $el.focus().addClass(TableSelection.className)
  }

  selectGroup($group = []) {
    this.clear()
    this.group = $group
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }

  selectGroupLogic($root, $el) {
    const targetId = $el.id(true)
    const currentId = this.current.id(true)

    const rows = this.range(currentId.row, targetId.row)
    const cols = this.range(currentId.col, targetId.col)

    const ids = rows.reduce((acc, row) => {
      cols.forEach(col => acc.push(`${row}:${col}`))
      return acc
    }, [])

    const $cells = ids.map(id => $root.findDom(`[data-id="${id}"]`))
    this.selectGroup($cells)
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = []
  }
}
