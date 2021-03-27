export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // Inform listeners if there are any
  // component.emit('table:select', {A: 1})
  emit(eventName, ...args) {
    if (!Array.isArray(this.listeners[eventName])) {
      return false
    }
    this.listeners[eventName].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // Subscribe to notification / add new listener
  // component.subscribe('table:select', (callback) => {})
  subscribe(eventName, func) {
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(func)
    return () => {
      this.listeners[eventName] = this.listeners[eventName]
          .filter(listener => listener !== func)
    }
  }
}
