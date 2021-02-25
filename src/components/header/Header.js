import {ExcelComponent} from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options
    })
  }

  toHTML() {
    return `
    <div class="excel__header__inner">
      <div class="excel__logo">
        <img src="logo.png" alt="Excel" class="img" />
      </div>
      <input type="text" class="excel__title-input" value="New Table" />
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
}
