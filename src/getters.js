/**
 * Getter helper functions
 */
import traversePath from './helpers/traversePath'

// Most basic possible getter
// getSTR: getter('strength')
// getters.getSTR
export const getter = key => state => state[key]

// Gets an object in a list by searching property key values
// userByID: getByKey('users', 'name')
// characterByClass: getByKey(['session', 'characters'], 'class')
// getters.userByID('Noah')
// getters.characterByClass('sorcerer')
export function getByKey(keyPath, targetKey) {
  return state => {
    let key = keyPath
    if (Array.isArray(keyPath)) {
      state = traversePath(state, keyPath, false)
      key = keyPath[keyPath.length - 1]
    }
    const find = value =>
      state[key].find(element => element[targetKey] === value)
    return value => (Array.isArray(value) ? value.map(find) : find(value))
  }
}

// Filters an object by searching property key values
// usersByName: filterByKey('users', 'name')
// charactersByClass: filterByKey(['session', 'characters'], 'class')
// getters.usersByName('Noah')
// getters.charactersByClass('paladin')
export function filterbyKey(keyPath, targetKey) {
  return state => {
    let key = keyPath
    if (Array.isArray(keyPath)) {
      state = traversePath(state, keyPath, false)
      key = keyPath[keyPath.length - 1]
    }
    return values => {
      if (!Array.isArray(values)) values = [values]
      return state[key].filter(valToFind =>
        values.includes(valToFind[targetKey])
      )
    }
  }
}

// Filters out object key-value pairs that are undefined or null.
// validUsers: filterNil('users')
// getters.validUsers
export const filterNil = key => state => {
  const stateObject = state[key]
  const newObj = {}
  for (const k in stateObject) {
    if (stateObject[k] !== null && stateObject[k] !== undefined) {
      newObj[k] = stateObject[k]
    }
  }
  return newObj
}

// Transforms input state property into a string that is then forced either to upper or lower case
// getUpperName: getCase('name', 'upper')
// getters.getUpperName
export const getCase = (key, setCase = 'upper') => state => {
  const stateString = String(state[key])
  const stateCase =
    setCase == 'upper' ? stateString.toUpperCase() : stateString.toLowerCase()
  return stateCase
}

// Formats state stored in 24 hours max-worth of seconds into 12 or 24 hour clock timestamp. Option to hide seconds in second argument.
// getPostTime: dayTimeFormatter('post_time')
// getters.getPostTime(24, true)
export const dayTimeFormatter = key => (
  state,
  clock = 24,
  showSeconds = true
) => {
  if (typeof state[key] !== 'number')
    throw new Error(`State ${state[key]} is not a number.`)
  if (state[key] > 86400)
    throw new Error(
      `${state[key]} is longer than 24 hours. This function is intended for use in 24 hour time spans.`
    )
  if (clock != 12 && clock != 24)
    throw new Error(`Please enter a valid clock type: 12 or 24`)

  let stateSeconds = state[key]

  let fHours = Math.floor(stateSeconds / 3600)
  let fMinutes = Math.floor((stateSeconds - fHours * 3600) / 60)
  let fSeconds = stateSeconds - fHours * 3600 - fMinutes * 60
  let amPM = 'AM'

  if (fHours < 10) fHours = '0' + fHours
  if (fMinutes < 10) fMinutes = '0' + fMinutes
  if (fSeconds < 10) fSeconds = '0' + fSeconds

  if (clock == 12 && fHours > 12) {
    fHours -= 12
    amPM = 'PM'
  }

  let formattedTime = fHours + ':' + fMinutes
  if (showSeconds === true) formattedTime += ':' + fSeconds

  if (clock == 12) {
    formattedTime += ' ' + amPM
    return formattedTime
  } else {
    return formattedTime
  }
}
