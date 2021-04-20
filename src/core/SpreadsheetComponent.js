import {DomListener} from '@core/DomListener'

export class SpreadsheetComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.unsubscribers = []
    this.store = options.store
    this.storeSub = null

    this.prepare()
  }

  // Set up component before init
  prepare() {}

  // Returns component template
  toHTML() {
    return ''
  }

  // Inform listeners about event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Subscribe to event
  $on(event, func) {
    const unsub = this.emitter.subscribe(event, func)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // Only changes in the fields that we subscribed to, comes here
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // Init component, add DOM listeners
  init() {
    this.initDOMListeners()
  }

  // Delete component, clear listeners
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
