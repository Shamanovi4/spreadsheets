import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {$} from '@core/dom'
import {createToolbar} from '@/components/toolbar/toolbar.template'
import {defaultStyles} from '@/constants'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }

  prepare() {
    this.initState(defaultStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      const mergedValue = {...value, ...{activeDropDown: 'none'}}

      $target.data.buttonType === 'dropdown'
          ? this.setState(value)
          : this.setState(mergedValue)
      $target.data.buttonType === 'dropdown'
          ? this.$emit('toolbar:applyStyle', value)
          : this.$emit('toolbar:applyStyle', mergedValue)
    }
  }
}

