// Increment a number value in a state by an iterator
// incSTR: increment('strength')
// commit('incSTR')
export const increment = key => (state, iterator = 1) => {
  if (typeof state[key] === 'number') {
    state[key] += Number(iterator)
  } else {
    throw new Error(`State ${state[key]} is not a number.`)
  }
}
