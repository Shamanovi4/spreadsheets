import {ExcelComponent} from '@core/ExcelComponent'

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options
    })
  }

  toHTML() {
    return `
    <div class="excel__toolbar__inner">
      <div class="edit edit__fonts">
        <div class="button">
          <span class="material-icons"> format_bold </span>
        </div>
        <div class="button">
          <span class="material-icons"> format_italic </span>
        </div>
        <div class="button">
          <span class="material-icons"> format_strikethrough </span>
        </div>
      </div>
      <span class="divider"></span>
      <div class="edit edit__align">
        <div class="button button--align">
          <span class="material-icons"> format_align_left </span>
        </div>
        <div class="button button--align">
          <span class="material-icons"> format_align_justify </span>
        </div>
        <div class="button button--align">
          <span class="material-icons"> format_align_right </span>
        </div>
      </div>
    </div>
    `
  }

  onClick(event) {
    console.log(event.target)
  }
}

