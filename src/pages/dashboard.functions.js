import {storage} from '@core/utils'

export function toHTML(key) {
  const model = storage(key)
  const id = key.split(':')[1]
  return `
  <li class="spreadsheets-list__item">
    <a class="spreadsheets-list__item__link" href="#spreadsheet/${id}">
      <span class="spreadsheets-list__item__name">${model.tableTitle}</span>
      <span class="spreadsheets-list__item__date">
        ${new Date(model.lastOpenedDate).toLocaleDateString()}
        ${new Date(model.lastOpenedDate).toLocaleTimeString()}
      </span>
    </a>
  </li>
  `
}

function getAllKeys() {
  const keys = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)

    if (!key.includes('spreadsheet')) {
      continue
    }

    keys.push(key)
  }

  return keys
}

export function createSpreadsheetsTable() {
  const keys = getAllKeys()

  if (!keys.length) {
    return `
    <p class="no-spreadsheets">You still have not created any spreadsheets.</p>
    `
  }

  return `
  <ul class="spreadsheets-list">
    ${keys.map(toHTML).join('')}
  </ul>
  `
}
