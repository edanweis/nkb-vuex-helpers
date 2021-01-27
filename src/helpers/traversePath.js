/**
 * @function traversePath
 * 
 * @param {*} state 
 * @param {Array} path 
 * @param {boolean} createPathObjects 
 * @example
 *  const obj = traversePath(state, path, true)
 */

const traversePath = (state, path, createPathObjects) => {
  // Select all but the last entries in the path array, use reduce() to execute a function for each item in the array.
  return path.slice(0, -1).reduce((accumulator, currentValue, currentIndex) => {
    // Check if the requested path is already in the accumulator array
    if (!(currentValue in accumulator)) {
      // Check if the createPathObjects boolean is set to true
      if (createPathObjects) {
        // Set the return value of the created requested path to an array or an object, depending on whether it's a number or anything else
        accumulator[currentValue] = typeof path[currentIndex + 1] === 'number' ? [] : {}
      } else {
        throw new Error(`Path ${JSON.stringify(path.slice(0, -1))} is not in the current state`)
      }
    }
    return accumulator[currentValue]
  }, state)
}

export default traversePath