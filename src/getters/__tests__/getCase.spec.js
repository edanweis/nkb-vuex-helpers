const { getCase } = require('../../../dist/')

describe('getCase', () => {
  const state = { test_string: 'KoOKYcAsE', test_array: ['a', 'b', 'c'] }
  it('returns a string as all uppercase', () => {
    expect(getCase('test_string')(state)).toBe('KOOKYCASE')
  })
  it('returns a string as all lowercase', () => {
    expect(getCase('test_string', 'lower')(state)).toBe('kookycase')
  })
  it('takes a non-string without throwing a tantrum', () => {
    expect(getCase('test_array', 'upper')(state)).toBe('A,B,C')
  })
})
