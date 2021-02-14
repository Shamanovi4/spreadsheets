import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
    })
  }

  toHTML() {
    return `
    <div class="excel__formula__inner">
      <div class="formula__info"></div>
      <span class="divider"></span>
      <div class="formula__label">fx</div>
      <span class="divider"></span>
      <div class="formula__input" contenteditable="true"></div>
    </div>
    `
  }

  onInput(event) {
    console.log('Formula: onInput', event)
  }

  onClick(event) {
    console.log('Formula: onClick', event)
  }
}
