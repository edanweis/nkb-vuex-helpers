const { getMin, getMax } = require('../../../dist/')

describe('getMinMax', () => {
  const state = {
    data: [{ number: 6 }, { number: 2 }, { number: 4 }],
  }
  it('finds the maximum value', () => {
    const maxValue = getMax('data', 'number')(state)
    expect(maxValue).toStrictEqual({ number: 6 })
  })
  it('finds the minimum value', () => {
    const minValue = getMin('data', 'number')(state)
    expect(minValue).toStrictEqual({ number: 2 })
  })
})
