const { decrement } = require('../../../dist/index')

describe('decrement', () => {
  it('decrements the value of a property on a state by a specified number', () => {
    const state = { strength: 10 }
    decrement('strength')(state, 5)
    expect(state.strength).toBe(5)
  })
  it('decrements by the default value of 1', () => {
    const state = { strength: 10 }
    decrement('strength')(state)
    expect(state.strength).toBe(9)
  })
})
