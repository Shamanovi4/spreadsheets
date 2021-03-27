import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {changeTableTitle} from '@/redux/actions';
import {defaultTitle} from '@/constants'
import {debounce} from '@core/utils'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 250)
  }

  toHTML() {
    const tableTitle = this.store.getState().tableTitle || defaultTitle
    return `
    <div class="excel__header__inner">
      <div class="excel__logo">
        <img src="logo.png" alt="Excel" class="img" />
      </div>
      <input type="text" class="excel__title-input" value="${tableTitle}" />
      <div class="table__control">
        <div class="button">
          <span class="material-icons"> delete </span>
        </div>
        <div class="button">
          <span class="material-icons"> exit_to_app </span>
        </div>
      </div>
    </div>
    `
  }

  onInput(event) {
    console.log('onInput')
    const $target = $(event.target)
    this.$dispatch(changeTableTitle($target.text()))
  }
}
