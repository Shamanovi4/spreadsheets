import {Page} from '@core/page/Page'
import {$} from '@core/dom'
import {createSpreadsheetsTable} from '@/shared/dashboard.functions'

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString()
    return $.create('div', 'dashboard').html(`
      <div class="dashboard__header">
        <div class="dashboard__header__logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <span class="dashboard__header__title">Spreadsheets</span>
      </div>
      ${createSpreadsheetsTable()}
      <div class="dashboard__create">
        <a class="dashboard__create__button" href="#spreadsheet/${now}"></a>
      </div>
    `)
  }
}
