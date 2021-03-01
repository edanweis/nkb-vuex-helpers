//
// getOldestUser: getMax('user', 'age')
// getYoungestUser: getMin('user', 'age')
// getters.getOldestUser
// getters.getYoungestUser

export const getMin = (key, input) => state => {
  const stateObject = state[key]
  const select = (a, b) => (a[input] <= b[input] ? a : b)
  return stateObject.reduce(select, {})
}

export const getMax = (key, input) => state => {
  const stateObject = state[key]
  const select = (a, b) => (a[input] >= b[input] ? a : b)
  return stateObject.reduce(select, {})
}
