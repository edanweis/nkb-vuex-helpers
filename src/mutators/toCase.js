// Mutates a state string to an all-lowercase or all-uppercase version
// nameUpperCase: toCase('name', 'upper')
// commit('nameUpperCase')
export const toCase = (key, setCase = 'upper') => state => {
  const stateString = String(state[key])
  const stateCase = setCase == 'upper' ? stateString.toUpperCase() : stateString.toLowerCase()
  state[key] = stateCase
}
