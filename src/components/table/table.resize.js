import {$} from '@core/dom'

function findRow(event, rowId) {
  const $table = $(event.target).closest('.spreadsheet__table')
  const $grid = $table.findDom('.grid')
  return $grid.findDom(`[data-row="${rowId}"]`)
}

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const eventType = $resizer.data.resize
    const $row = eventType === 'col' ? '' : findRow(event, $parent.data.row)
    const coords = $parent.getCoords()
    let value
    const $resizerLine = $parent.findDom(`[data-resize-line="${eventType}"]`)
    const $cells = $root.findAll(
        `[data-col="${$parent.data.col}"]`
    )
    const property = eventType === 'col' ? 'min-width' : 'min-height'
    const minValue = Number($parent.getPropertyValue(
        $parent.$el, property
    ).slice(0, -2))

    if (eventType === 'col') {
      const tableHeight = $root.getPropertyValue(
          $root.$el, 'height'
      )
      $resizerLine.css({height: tableHeight})
    }

    document.onmousemove = e => {
      if (eventType === 'col') {
        const delta = e.pageX - coords.right
        value = coords.width + delta

        if (value >= minValue) {
          $resizer.css({right: -delta -5 + 'px'})
          $resizerLine.css({right: -delta + 2 + 'px'})
        }
      } else {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta

        if (value >= minValue) {
          $resizer.css({bottom: -delta -5 + 'px'})
          $resizerLine.css({bottom: -delta + 2 + 'px'})
        }
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      if (eventType === 'col') {
        if (value >= minValue) {
          $cells.forEach(el => el.style.width = value + 'px')
        } else {
          $cells.forEach(el => el.style.width = minValue + 'px')
        }

        $resizer.css({right: -5 + 'px'})
        $resizerLine.css({right: 2 + 'px'})
      } else {
        if (value >= minValue) {
          $parent.css({height: value + 'px'})
          $row.css({height: value + 'px'})
        } else {
          $parent.css({height: minValue + 'px'})
          $row.css({height: minValue + 'px'})
        }

        $resizer.css({bottom: -5 + 'px'})
        $resizerLine.css({bottom: 2 + 'px'})
      }

      resolve({
        value: value > minValue ? value : minValue,
        eventType,
        id: $parent.data[eventType]
      })
    }
  })
}
