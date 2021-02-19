import {$} from '@core/dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const eventType = $resizer.data.resize
  let newValue
  const $resizerLine = $($parent.find(`[data-resize-line="${eventType}"]`))
  const $columns = $root.findAll(
      `[data-column="${$parent.data.column}"]`
  )
  const property = eventType === 'column' ? 'min-width' : 'min-height'
  const minValue = $parent.getPropertyValue(
      $parent.$el, property
  )

  if (eventType === 'column') {
    const tableHeight = $root.getPropertyValue(
        $root.$el, 'height'
    )
    $resizerLine.css({height: tableHeight})
  }

  document.onmousemove = e => {
    if (eventType === 'column') {
      const delta = e.pageX - coords.right
      newValue = coords.width + delta

      if (newValue >= minValue.slice(0, -2)) {
        $resizer.css({right: -delta -5 + 'px'})
        $resizerLine.css({right: -delta + 2 + 'px'})
      }
    } else {
      const delta = e.pageY - coords.bottom
      newValue = coords.height + delta

      if (newValue >= minValue.slice(0, -2)) {
        $resizer.css({bottom: -delta -5 + 'px'})
        $resizerLine.css({bottom: -delta + 2 + 'px'})
      }
    }
  }

  document.onmouseup = e => {
    document.onmousedown = null
    document.onmousemove = null
    document.onmouseup = null

    if (eventType === 'column') {
      if (newValue >= minValue.slice(0, -2)) {
        $columns.forEach(el => el.style.width = newValue + 'px')
      } else {
        $columns.forEach(el => el.style.width = minValue)
      }

      $resizer.css({right: -5 + 'px'})
      $resizerLine.css({right: 2 + 'px'})
    } else {
      if (newValue >= minValue.slice(0, -2)) {
        $parent.css({height: newValue + 'px'})
      } else {
        $parent.css({height: minValue})
      }

      $resizer.css({bottom: -5 + 'px'})
      $resizerLine.css({bottom: 2 + 'px'})
    }
  }
}
