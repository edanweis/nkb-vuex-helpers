/**
 * Mutator helper functions
 */
import traversePath from './helpers/traversePath'

// Abstraction over setState and setPath
export const set = key => Array.isArray(key) ? setPath(key) : setState(key)

// Sets a property on a state
// setSTR: set('strength')
// commit('setSTR', 18)
export const setState = key => (state, value) => {
  state[key] = value
}

// Sets a value at a specific path within a state
// set2hSwordSkill: set(['skills', 0, 'twohand_sword'])
// commit('set2hSwordSkill', 5)
export const setPath = path => (state, value) => {
  const stateObj = traversePath(state, path, true)
  stateObj[path[path.length - 1]] = value
}

// Merges an object into a state object
// resetData: assignObject(initialData)
// commit('resetData')
export const assignObject = data => state => {
  Object.assign(state, data)
}

// Increment a number value in a state by an iterator
// incSTR: increment('strength')
// commit('incSTR')
export const increment = key => (state, iterator = 1) => {
  state[key] += iterator
}

// Decrement a number value in a state by an iterator
// decSTR: decrement('strength')
// commit('decSTR')
export const decrement = key => (state, iterator = 1) => {
  state[key] -= iterator
}

// Push an item onto a list
// addSkill: pushTo('skills')
// commit('addskill', ['dagger'])
export const pushTo = key => (state, value) => {
  state[key].push(value)
}

// add or extend a record in a list
// extCharByID: ('characters', 'id')
// commit('extCharByID', payload)
export const extendRecordInList = (key, targetKey = 'id', valueKey) => (state, data) => {
  const id = data[targetKey]
  const value = valueKey ? data[valueKey] : data
  const index = state[key].findIndex(element => element[targetKey] === id)
  return index < 0 ? state[key].push(value) : state[key].splice(index, 1, Object.assign({}, state[key][index], value))
}

// add or replace a record in a list
// repCharByID('characters', 'id')
// commit('repCharByID', payload)
export const replaceRecordInList = (key, targetKey = 'id', valueKey) => (state, data) => {
  const id = data[targetKey]
  const value = valueKey ? data[valueKey] : data
  const index = state[key].findIndex(element => element[targetKey] === id)
  return index < 0 ? state[key].push(value) : state[key].splice(index, 1, value)
}

// remove a record in a list
// removeWeapons: removeRecordInList('weapons')
// removeCharactersByID: removeRecordInList('characters', 'id')
// commit('removeWeapons', ['dagger', 'quarter staff'])
// commit('removeCharactersByID', 21)
export const removeRecordInList = (key, targetKey) => (state, items) => {
  if (!Array.isArray(items)) items = [items]
  state[key] = state[key].filter(item => targetKey ? !items.some(element => element === item[targetKey]) : !items.includes(item))
}

// Toggle boolean in a state
// toggleBool: toggle('bool')
// commit('toggleBool')
export const toggle = key => state => {
  state[key] = !state[key]
}

