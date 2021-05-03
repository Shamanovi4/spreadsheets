import {Router} from '@core/routes/Router'
import {Page} from '@core/page/Page'

class DashboardPage extends Page {
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'dashboard'
    return root
  }
}
class SpreadsheetPage extends Page {}

describe('Router:', () => {
  let router
  let $root

  beforeEach(() => {
    $root = document.createElement('div')
    router = new Router($root, {
      dashboard: DashboardPage,
      spreadsheet: SpreadsheetPage
    })
  })

  test('should be defined', () => {
    expect(router).toBeDefined()
  })
})
