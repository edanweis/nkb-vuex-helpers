// remove a record in a list
// removeWeapons: removeRecordInList('weapons')
// removeCharactersByID: removeRecordInList('characters', 'id')
// commit('removeWeapons', ['dagger', 'quarter staff'])
// commit('removeCharactersByID', 21)
export const removeRecordInList = (key, targetKey) => (state, items) => {
  if (!Array.isArray(items)) items = [items]
  state[key] = state[key].filter(item =>
    targetKey ? !items.some(element => element === item[targetKey]) : !items.includes(item)
  )
}
