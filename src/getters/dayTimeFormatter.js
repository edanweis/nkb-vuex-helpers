// Formats state stored in 24 hours max-worth of seconds into 12 or 24 hour clock timestamp. Option to hide seconds in second argument.
// getPostTime: dayTimeFormatter('post_time')
// getters.getPostTime(24, true)
export const dayTimeFormatter = key => (state, clock = 24, showSeconds = true) => {
  if (typeof state[key] !== 'number') throw new Error(`State ${state[key]} is not a number.`)
  if (state[key] > 86400)
    throw new Error(
      `${state[key]} is longer than 24 hours. This function is intended for use in 24 hour time spans.`
    )
  if (clock != 12 && clock != 24) throw new Error(`Please enter a valid clock type: 12 or 24`)

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
