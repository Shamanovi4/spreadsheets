import {SpreadsheetComponent} from '@core/SpreadsheetComponent'
import {$} from '@core/dom'

export class Formula extends SpreadsheetComponent {
  static className = 'spreadsheet__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    })
  }

  toHTML() {
    return `
    <div class="spreadsheet__formula__inner">
      <div class="formula__info"></div>
      <span class="divider"></span>
      <div class="formula__label">fx</div>
      <span class="divider"></span>
      <div 
      id="formula" class="formula__input"
      contenteditable="true" spellcheck="false"
      >
      </div>
    </div>
    `
  }

  init() {
    super.init()

    this.$formula = this.$root.findDom('#formula')

    this.$on('table:select', $cell => {
      this.$formula.text($cell.data.value)
    })
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText)
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}
