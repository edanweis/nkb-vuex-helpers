import traversePath from '../helpers/traversePath'

// Filters an object by searching property key values
// usersByName: filterByKey('users', 'name')
// charactersByClass: filterByKey(['session', 'characters'], 'class')
// getters.usersByName('Noah')
// getters.charactersByClass('paladin')
export function filterbyKey(keyPath, targetKey) {
  return state => {
    let key = keyPath
    if (Array.isArray(keyPath)) {
      state = traversePath(state, keyPath, false)
      key = keyPath[keyPath.length - 1]
    }
    return values => {
      if (!Array.isArray(values)) values = [values]
      return state[key].filter(valToFind => values.includes(valToFind[targetKey]))
    }
  }
}
