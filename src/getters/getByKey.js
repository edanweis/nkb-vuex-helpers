import traversePath from '../helpers/traversePath'

// Gets an object in a list by searching property key values
// userByID: getByKey('users', 'name')
// characterByClass: getByKey(['session', 'characters'], 'class')
// getters.userByID('Noah')
// getters.characterByClass('sorcerer')
export function getByKey(keyPath, targetKey) {
  return state => {
    let key = keyPath
    if (Array.isArray(keyPath)) {
      state = traversePath(state, keyPath, false)
      key = keyPath[keyPath.length - 1]
    }
    const find = value => state[key].find(element => element[targetKey] === value)
    return value => (Array.isArray(value) ? value.map(find) : find(value))
  }
}
