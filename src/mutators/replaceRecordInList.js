// add or replace a record in a list
// repCharByID('characters', 'id')
// commit('repCharByID', payload)
export const replaceRecordInList = (key, targetKey = 'id', valueKey) => (state, data) => {
  const id = data[targetKey]
  const value = valueKey ? data[valueKey] : data
  const index = state[key].findIndex(element => element[targetKey] === id)
  return index < 0 ? state[key].push(value) : state[key].splice(index, 1, value)
}
