import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {shouldResize, nextSelector} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
import {isCell} from '@/components/table/table.functions'
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constants'
import {parse} from '@core/parse'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
    this.tableSize = {
      rows: 100,
      cols: 26
    }
  }

  toHTML() {
    return createTable(this.tableSize.rows, this.tableSize.cols,
        this.store.getState())
  }

  prepare() {
    this.tableSelection = new TableSelection()
  }

  init() {
    super.init()

    this.selectCell(this.$root, this.$root.findDom('[data-id="1:1"'))

    this.$on('formula:input', value => {
      this.tableSelection.current
          .attribute('data-value', value)
          .text(parse(value))
      this.updateTextInStore(value)
    })

    this.$on('formula:done', () => {
      this.tableSelection.current.focus()
    })

    this.$on('toolbar:applyStyle', value => {
      this.tableSelection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.tableSelection.selectedIds
      }))
    })
  }

  selectCell($root, $cell) {
    this.tableSelection.select($root, $cell)
    this.$emit('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      if (event.shiftKey) {
        this.tableSelection.selectGroup(this.$root, $(event.target))
        this.tableSelection.selectionBordered()
      } else {
        this.selectCell(this.$root, $(event.target))
        this.tableSelection.selectionHandler(this.$root)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight'
    ]

    const {key} = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.tableSelection.current.id(true)
      const $next = this.$root.findDom(nextSelector(key, id, this.tableSize))
      this.selectCell(this.$root, $next)
      this.$emit('table:select', $next)
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.tableSelection.current.id(),
      value
    }))
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }
}
