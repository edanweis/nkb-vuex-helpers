// Get an array or array of objects in smaller arrays determined by the given parameter
// chunkedWeapons: getChunk('weapons', 2)
// getters.chunkedWeapons

export const getChunk = key => (state, size) => {
  return state[key].reduce((arr, item, idx) => {
    return idx % size === 0 ? [...arr, [item]] : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]]
  }, [])
}
