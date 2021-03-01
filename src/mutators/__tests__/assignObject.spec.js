const { assignObject } = require('../../../dist/index')

describe('assignObject', () => {
  it('merges an object into another object in state', () => {
    const data = { strength: 18 }
    const state = {}
    assignObject(data)(state)
    expect(state).toMatchObject(data)
  })
})
