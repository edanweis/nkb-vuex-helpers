/**
 * Getter helper functions
 */
import traversePath from './helpers/traversePath'

// Most basic possible getter
// getSTR: getter('strength')
// getters.getSTR
export const getter = key => state => state[key]

// Gets an object in a list by searching property key values
// userByID: getByKey('users', 'name')
// characterByClass: getByKey(['session', 'characters'], 'class')
// getters.userByID('Noah')
// getters.characterByClass('sorcerer')
export function getByKey(keyPath, targetKey) {
  return state => {
    let key = keyPath
    if(Array.isArray(keyPath)) {
      state = traversePath(state, keyPath, false)
      key = keyPath[keyPath.length - 1]
    }
    const find = value => state[key].find(element => element[targetKey] === value)
    return value => Array.isArray(value) ? value.map(find) : find(value)
  }
}

// Filters an object by searching property key values
// usersByName: filterByKey('users', 'name')
// charactersByClass: filterByKey(['session', 'characters'], 'class')
// getters.usersByName('Noah')
// getters.charactersByClass('paladin')
export function filterbyKey(keyPath, targetKey) {
  return state => {
    let key = keyPath
    if(Array.isArray(keyPath)) {
      state = traversePath(state, keyPath, false)
      key = keyPath[keyPath.length - 1]
    }
    return values => {
      if(!Array.isArray(values)) values = [values]
      return state[key].filter(valToFind => values.includes(valToFind[targetKey]))
    }
  }
}