import {Router} from '@core/routes/Router'
import {DashboardPage} from '@/pages/DashboardPage'
import './scss/index.scss'
import {SpreadsheetPage} from '@/pages/SpreadsheetPage'

new Router('#app', {
  dashboard: DashboardPage,
  spreadsheet: SpreadsheetPage
})
