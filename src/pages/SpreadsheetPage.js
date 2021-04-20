import {Spreadsheet} from '@/components/spreadsheet/Spreadsheet'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {normalizeInitialState} from '@/redux/initialState'
import {storage, debounce} from '@core/utils'
import {Page} from '@core/Page'

function storageName(param) {
  return 'spreadsheet:' + param
}

export class SpreadsheetPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString()

    const state = storage(storageName(params))
    const store = createStore(rootReducer, normalizeInitialState(state))

    const stateListener = debounce(state => {
      storage(storageName(params), state)
    }, 250)

    store.subscribe(stateListener)

    this.spreadsheet = new Spreadsheet({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.spreadsheet.getRoot()
  }

  afterRender() {
    this.spreadsheet.init()
  }

  destroy() {
    this.spreadsheet.destroy()
  }
}
