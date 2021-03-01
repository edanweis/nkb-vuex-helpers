// Transforms input state property into a string that is then forced either to upper or lower case
// getUpperName: getCase('name', 'upper')
// getters.getUpperName
export const getCase = (key, setCase = 'upper') => state => {
  const stateString = String(state[key])
  const stateCase = setCase == 'upper' ? stateString.toUpperCase() : stateString.toLowerCase()
  return stateCase
}
