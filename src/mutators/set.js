import traversePath from '../helpers/traversePath'

// Abstraction over setState and setPath
export const set = key => (Array.isArray(key) ? setPath(key) : setState(key))

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
