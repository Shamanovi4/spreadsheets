import {storage} from '@core/utils'

export function toHTML(key) {
  const model = storage(key)
  const id = key.split(':')[1]
  return `
  <li class="dashboard__list__item">
    <a class="dashboard__list__item__link" href="#spreadsheet/${id}">
      <img src="favicon.ico" alt="Icon" class="dashboard__list__item__icon" />
      <span class="dashboard__list__item__name">${model.tableTitle}</span>
      <span class="dashboard__list__item__date">
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
    <p class="no-spreadsheets">You have no spreadsheets.</p>
    `
  }

  return `
  <div class="dashboard__list">
    <ul class="dashboard__list__inner">
      ${keys.map(toHTML).join('')}
    </ul>
  </div>
  `
}
