// Merges an object into a state object
// resetData: assignObject(initialData)
// commit('resetData')
export const assignObject = data => state => {
  Object.assign(state, data)
}
