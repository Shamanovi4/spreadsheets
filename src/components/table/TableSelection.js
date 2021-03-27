import {$} from '@core/dom'
import {toChar} from '@/components/table/table.template'

export class TableSelection {
  static className = 'selected'
  static selectionType = `[data-type="selection"]`
  static cell = 'cell'
  static gridType = `[data-type="grid"]`
  static scrollableType = `[data-type="scrollable"]`
  static fixedType = `[data-type="fixed"]`
  static selectionClasses = {
    active: 'table-selection--active',
    bordered: 'table-selection--bordered'
  }
  static notationTypes = {
    row: `[data-type="notation-row"]`,
    col: `[data-type="notation-col"]`
  }

  constructor() {
    this.group = []
    this.current = null
    this.selection = null
    this.labels = {
      rows: [],
      cols: []
    }
  }

  get selectedIds() {
    return this.group.map($el => $el.id())
  }

  range(start, end) {
    if (start > end) {
      [end, start] = [start, end]
    }

    return new Array(end - start + 1)
        .fill('')
        .map((_, index) => start + index)
  }

  setClasses($root, $el, rows, cols) {
    const $notationRow = $root.findDom(TableSelection.notationTypes.row)
    const $notationCol = $root.findDom(TableSelection.notationTypes.col)

    if (typeof(rows) === 'undefined' || typeof(cols) === 'undefined') {
      const $col = $notationRow.findDom(`[data-col="${this.current.data.col}"]`)
      const $row = $notationCol.findDom(`[data-row="${this.current.data.row}"]`)
      this.labels.cols.push($col)
      this.labels.rows.push($row)
      $col.addClass(TableSelection.className)
      $row.addClass(TableSelection.className)
    } else {
      const $cols = cols
          .map(col => $notationRow.findDom(`[data-col="${toChar(col - 1)}"]`))
      const $rows = rows
          .map(row => $notationCol.findDom(`[data-row="${row}"]`))
      $cols.forEach($el => this.labels.cols.push($el))
      $rows.forEach($el => this.labels.rows.push($el))
      $cols.forEach($el => $el.addClass(TableSelection.className))
      $rows.forEach($el => $el.addClass(TableSelection.className))
    }

    this.current.focus().addClass(TableSelection.className)
  }

  selectionBordered() {
    this.selection.addClass(TableSelection.selectionClasses.bordered)
  }

  selectionHandler($root) {
    document.onmousemove = e => {
      const $el = $(document.elementFromPoint(e.pageX, e.pageY))
      if ($el.data.type === TableSelection.cell) {
        this.selectGroup($root, $el)
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      if (this.selection !== null) {
        this.selectionBordered()
      }
    }
  }

  setSelectionCSS(top, right, bottom, left, scroll, offset) {
    this.selection.css({
      top: top + scroll.top - offset.top + 'px',
      left: left + scroll.left - offset.left + 'px',
      height: bottom - top + 'px',
      width: right - left + 'px'
    })
  }

  setSelection($root, $el) {
    const targetId = $el.id(true)
    const currentId = this.current.id(true)
    const targetCoords = $el.getCoords()
    const currentCoords = this.current.getCoords()
    this.selection = $root.findDom(TableSelection.selectionType)
    const $gridScrollable = $el.closest(TableSelection.scrollableType)
    const $gridFixed = $el.closest(TableSelection.fixedType)
    const $grid = $el.closest(TableSelection.gridType)
    const scroll = $gridScrollable.getScroll()
    const offset = {
      top: $root.getOffset().top + $gridFixed.getOffset().top,
      left: $grid.getOffset().left
    }
    this.selection.addClass(TableSelection.selectionClasses.active)

    if (targetId.row <= currentId.row &&
      targetId.col >= currentId.col) {
      this.setSelectionCSS(
          targetCoords.top,
          targetCoords.right,
          currentCoords.bottom,
          currentCoords.left,
          scroll,
          offset
      )
    } else if (targetId.row >= currentId.row &&
      targetId.col >= currentId.col) {
      this.setSelectionCSS(
          currentCoords.top,
          targetCoords.right,
          targetCoords.bottom,
          currentCoords.left,
          scroll,
          offset
      )
    } else if (targetId.row >= currentId.row &&
      targetId.col <= currentId.col) {
      this.setSelectionCSS(
          currentCoords.top,
          currentCoords.right,
          targetCoords.bottom,
          targetCoords.left,
          scroll,
          offset
      )
    } else if (targetId.row <= currentId.row &&
      targetId.col <= currentId.col) {
      this.setSelectionCSS(
          targetCoords.top,
          currentCoords.right,
          currentCoords.bottom,
          targetCoords.left,
          scroll,
          offset
      )
    }
  }

  select($root, $el) {
    this.current = $el
    this.clear()
    this.group.push($el)
    this.setClasses($root, $el)
  }

  selectGroup($root, $el) {
    const targetId = $el.id(true)
    const currentId = this.current.id(true)

    const rows = this.range(currentId.row, targetId.row)
    const cols = this.range(currentId.col, targetId.col)

    const ids = rows.reduce((acc, row) => {
      cols.forEach(col => acc.push(`${row}:${col}`))
      return acc
    }, [])

    const $cells = ids.map(id => $root.findDom(`[data-id="${id}"]`))

    this.clear()
    this.setSelection($root, $el)
    this.group = $cells
    this.setClasses($root, $el, rows, cols)
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = []
    this.labels.rows.forEach($el => $el.removeClass(TableSelection.className))
    this.labels.rows = []
    this.labels.cols.forEach($el => $el.removeClass(TableSelection.className))
    this.labels.cols = []

    if (this.selection !== null) {
      this.selection.removeClass(TableSelection
          .selectionClasses.active)
      this.selection.removeClass(TableSelection
          .selectionClasses.bordered)
    }
  }

  applyStyle(style) {
    this.group.forEach($el => $el.css(style))
  }
}
