import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CHANGE_STYLES,
  APPLY_STYLE,
  CHANGE_TITLE,
  UPDATE_DATE
} from './types'

export function rootReducer(state, action) {
  let field
  let val

  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.eventType === 'col' ? 'colState' : 'rowState'
      return {...state, [field]: getValue(state, field, action)}
    case CHANGE_TEXT:
      field = 'dataState'
      return {
        ...state,
        currentText: action.data.value,
        [field]: getValue(state, field, action)
      }
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data}
    case APPLY_STYLE:
      field = 'stylesState'
      val = state[field] || {}
      action.data.ids.forEach(id => {
        val[id] = {...val[id], ...action.data.value}
      })
      return {
        ...state,
        [field]: val,
        currentStyles: {...state.currentStyles, ...action.data.value}
      }
    case CHANGE_TITLE:
      return {...state, tableTitle: action.data}
    case UPDATE_DATE:
      return {...state, lastOpenedDate: new Date().toJSON()}
    default: return state
  }
}

function getValue(state, field, action) {
  const value = state[field] || {}
  value[action.data.id] = action.data.value
  return value
}
