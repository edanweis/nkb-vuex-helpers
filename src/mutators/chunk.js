// Chunk state arrays into smaller arrays based on the given parameter number
// chunkArray:
// commit('chunkArray')

export const chunk = key => (state, size) => {
  state[key] = state[key].reduce((arr, item, idx) => {
    return idx % size === 0 ? [...arr, [item]] : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]]
  }, [])
}
