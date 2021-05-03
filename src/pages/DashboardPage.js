import {Page} from '@core/page/Page'
import {$} from '@core/dom'
import {createSpreadsheetsTable} from '@/shared/dashboard.functions'

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString()
    return $.create('div', 'dashboard').html(`
      <div class="dashboard__header">
        <a class="dashboard__create" href="#spreadsheet/${now}"></a>
        <div class="dashboard__header__logo">
          <img src="logo.png" alt="Excel" class="img" />
        </div>
        <span class="dashboard__header__title">Spreadsheets</span>
      </div>
      ${createSpreadsheetsTable()}
    `)
  }
}
