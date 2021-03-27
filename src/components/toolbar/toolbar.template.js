import {wrap} from '@core/utils'

function toButton(buttonClass, isDropDown) {
  return function(button) {
    const arrow = `<span class="material-icons"> arrow_drop_down </span>`
    return `
    <div 
      class="${buttonClass} ${button.active ? 'active' : ''}"
      data-type="button"
      ${isDropDown ? 'data-button-type="dropdown"' : ''}
      data-value='${JSON.stringify(button.value)}'
    >
      <span class="material-icons"> ${button.icon} </span>
      ${isDropDown ? arrow : ''}
    </div>
  `
  }
}

function insertDivider() {
  return `
  <span class="divider"></span>
  `
}

function whichAlign(state) {
  switch (state['justifyContent']) {
    case 'flex-start': return 'format_align_left'
    case 'center': return 'format_align_justify'
    case 'flex-end': return 'format_align_right'
  }
}

export function createToolbar(state) {
  const buttons = [
    {
      icon: 'format_bold',
      active: state['fontWeight'] === 'bold',
      value: {fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'}
    },
    {
      icon: 'format_italic',
      active: state['fontStyle'] === 'italic',
      value: {fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'}
    },
    {
      icon: 'format_strikethrough',
      active: state['textDecoration'] === 'underline',
      value: {textDecoration: state['textDecoration'] === 'underline'
        ? 'none' : 'underline'}
    },
    {
      icon: 'format_align_left',
      active: state['justifyContent'] === 'flex-start',
      value: {justifyContent: 'flex-start'}
    },
    {
      icon: 'format_align_justify',
      active: state['justifyContent'] === 'center',
      value: {justifyContent: 'center'}
    },
    {
      icon: 'format_align_right',
      active: state['justifyContent'] === 'flex-end',
      value: {justifyContent: 'flex-end'}
    },
    {
      icon: whichAlign(state),
      active: state['activeDropDown'] === 'justifyContent',
      value: {activeDropDown: state['activeDropDown'] === 'justifyContent'
        ? 'none' : 'justifyContent'}
    }
  ]

  let fontButtons = buttons.slice(0, 3)
  fontButtons = fontButtons.map(toButton('button')).join('')
  fontButtons = wrap(fontButtons, 'div', 'edit-tool')

  let alignButtons = buttons.slice(3, 6)
  alignButtons = alignButtons.map(toButton('button button--align')).join('')
  alignButtons = wrap(
      alignButtons, 'div',
      `edit-tool--align
      ${state['activeDropDown'] === 'justifyContent' ? 'active' : ''}`,
      'data-type="drop-down-menu"'
  )
  let alignDropDown = buttons.slice(6, 7)
  alignDropDown = alignDropDown.map(toButton('button button--align', true))
  alignButtons = wrap(alignDropDown + alignButtons, 'div', 'edit-tool')

  return wrap(fontButtons + insertDivider() + alignButtons,
      'div', 'excel__toolbar__inner')
}
