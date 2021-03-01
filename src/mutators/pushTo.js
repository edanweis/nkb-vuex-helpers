// Push an item onto a list
// addSkill: pushTo('skills')
// commit('addskill', ['dagger'])
export const pushTo = key => (state, value) => {
  state[key].push(value)
}
