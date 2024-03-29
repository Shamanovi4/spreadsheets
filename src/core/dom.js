class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  text(text) {
    if (typeof text === 'string' || typeof text === 'number') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  getOffset() {
    return {
      top: this.$el.offsetTop,
      left: this.$el.offsetLeft
    }
  }

  getScroll() {
    return {
      top: this.$el.scrollTop,
      left: this.$el.scrollLeft
    }
  }

  get data() {
    return this.$el.dataset
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  findDom(selector) {
    return $(this.$el.querySelector(selector))
  }

  getPropertyValue(selector, property, pseudoElement) {
    return window.getComputedStyle(selector, pseudoElement)
        .getPropertyValue(property)
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => {
      this.$el.style[key] = styles[key]
    })
  }

  getStyles(styles = []) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s]
      return res
    }, {})
  }

  addClass(className) {
    this.$el.classList.add(className)
  }

  removeClass(className) {
    this.$el.classList.remove(className)
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.data.id
  }

  focus() {
    this.$el.focus()
    return this
  }

  attribute(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
