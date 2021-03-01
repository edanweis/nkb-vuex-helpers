// Filters out object key-value pairs that are undefined or null.
// validUsers: filterNil('users')
// getters.validUsers
export const filterNil = key => state => {
  const stateObject = state[key]
  const filteredObject = removeEmpty(stateObject)
  return filteredObject
}

const removeEmpty = obj => {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, value]) => value != null)
      .map(([key, value]) => [key, value === Object(value) ? removeEmpty(value) : value])
  )
}
