const { increment } = require('../../../dist/index')

describe('increment', () => {
  it('increments the value of a property on a state by a specified number', () => {
    const state = { strength: 10 }
    increment('strength')(state, '5')
    expect(state.strength).toBe(15)
  })
  it('increments by the default value of 1', () => {
    const state = { strength: 10 }
    increment('strength')(state)
    expect(state.strength).toBe(11)
  })
})
