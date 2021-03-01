const { toggle } = require('../../../dist/index')

describe('toggle', () => {
  it('toggles a boolean in a state property', () => {
    const state = { bool: true }
    toggle('bool')(state)
    expect(state.bool).toBe(false)
    toggle('bool')(state)
    expect(state.bool).toBe(true)
  })
})
