const { set } = require('../../../dist/index')

describe('set', () => {
  it('sets the value of a property on a state', () => {
    const state = {}
    set('strength')(state, 18)
    expect(state.strength).toBe(18)
  })
  it('sets the value to a path within a state', () => {
    const state = { skills: [{ twohand_sword: 2 }] }
    set(['skills', 0, 'twohand_sword'])(state, 3)
    expect(state.skills[0].twohand_sword).toBe(3)
  })
  it('creates objects along the set path as needed', () => {
    const state = {}
    set(['skills', 0, 'twohand_sword'])(state, 4)
    expect(state.skills[0].twohand_sword).toBe(4)
  })
})
