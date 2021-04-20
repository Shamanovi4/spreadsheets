import {SpreadsheetComponent} from '@core/SpreadsheetComponent'
import {$} from '@core/dom'
import {changeTableTitle} from '@/redux/actions';
import {defaultTitle} from '@/constants'
import {debounce} from '@core/utils'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Header extends SpreadsheetComponent {
  static className = 'spreadsheet__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 250)
  }

  toHTML() {
    const tableTitle = this.store.getState().tableTitle || defaultTitle
    return `
    <div class="spreadsheet__header__inner">
      <a class="logo" href="#dashboard">
        <img src="logo.png" alt="Spreadsheet" class="img" />
      </a>
      <input class="title-input" type="text" value="${tableTitle}">
      <div class="control-panel">
        <div class="button" data-button-type="delete">
          <span class="material-icons"> delete </span>
        </div>
        <div class="button" data-button-type="exit">
          <span class="material-icons"> exit_to_app </span>
        </div>
      </div>
    </div>
    `
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.data.buttonType === 'delete') {
      const decision = confirm('Do you want to delete this table?')

      if (decision) {
        localStorage.removeItem('spreadsheet:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.buttonType === 'exit') {
      ActiveRoute.navigate('')
    }
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTableTitle($target.text()))
  }
}
