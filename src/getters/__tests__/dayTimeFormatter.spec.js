const { dayTimeFormatter } = require('../../../dist/')

const AM = 36500
const PM = 79600

describe('dayTimeFormatter', () => {
  it('returns a 24 hour timestamp', () => {
    const state = {
      time: PM,
    }
    let formattedTime = dayTimeFormatter('time')(state, 24)
    expect(formattedTime).toBe('22:06:40')
  })
  it('returns a 12 hour AM timestamp', () => {
    const state = {
      time: AM,
    }
    let formattedTime = dayTimeFormatter('time')(state, 12)
    expect(formattedTime).toBe('10:08:20 AM')
  })
  it('returns a 12 hour PM timestamp without seconds', () => {
    const state = {
      time: PM,
    }
    let formattedTime = dayTimeFormatter('time')(state, 12, false)
    expect(formattedTime).toBe('10:06 PM')
  })
  it('24 clock parameter as numeric string', () => {
    const state = {
      time: PM,
    }
    let formattedTime = dayTimeFormatter('time')(state, '24')
    expect(formattedTime).toBe('22:06:40')
  })
})
