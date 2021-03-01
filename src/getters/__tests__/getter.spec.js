const { getter } = require('../../../dist/')

describe('getter', () => {
  const state = { strength: 18 }
  it('returns the value of the selected state', () => {
    let strValue = getter('strength')(state)
    expect(strValue).toBe(18)
  })
})
