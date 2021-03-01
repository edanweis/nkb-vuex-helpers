// Toggle boolean in a state
// toggleBool: toggle('bool')
// commit('toggleBool')
export const toggle = key => state => {
  state[key] = !state[key]
}
