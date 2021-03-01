// add or extend a record in a list
// extCharByID: ('characters', 'id')
// commit('extCharByID', payload)
export const extendRecordInList = (key, targetKey = 'id', valueKey) => (state, data) => {
  const id = data[targetKey]
  const value = valueKey ? data[valueKey] : data
  const index = state[key].findIndex(element => element[targetKey] === id)
  return index < 0
    ? state[key].push(value)
    : state[key].splice(index, 1, Object.assign({}, state[key][index], value))
}
