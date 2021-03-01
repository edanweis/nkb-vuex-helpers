const { toCase } = require('../../../dist/index')

describe('toCase', () => {
  const state = { test_string: 'KoOKYcAsE', test_array: ['a', 'b', 'c'] }
  it('returns a string as all uppercase', () => {
    toCase('test_string')(state)
    expect(state.test_string).toBe('KOOKYCASE')
  })
  it('returns a string as all lowercase', () => {
    toCase('test_string', 'lower')(state)
    expect(state.test_string).toBe('kookycase')
  })
  it('takes a non-string without throwing a tantrum', () => {
    toCase('test_array', 'upper')(state)
    expect(state.test_array).toBe('A,B,C')
  })
})
