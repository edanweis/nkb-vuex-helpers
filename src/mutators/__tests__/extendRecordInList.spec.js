const { extendRecordInList } = require('../../../dist/index')

const characters = [
  {
    id: 1,
    class: 'sorcerer',
  },
  {
    id: 2,
    class: 'barbarian',
  },
  {
    id: 3,
    class: 'paladin',
  },
  {
    id: 4,
    class: 'paladin',
  },
]

describe('extendRecordInList', () => {
  const extend = extendRecordInList('characters', 'id')
  it('adds a record to a list if one isnt found', () => {
    const state = { characters: [...characters] }
    const newCharacter = { id: 5 }
    extend(state, newCharacter)
    expect(state.characters).toContain(newCharacter)
  })
  it('extends a record if found', () => {
    const state = { characters: [...characters, { id: 5 }] }
    const extendedCharacter = { id: 5, class: 'fighter' }
    extend(state, extendedCharacter)
    expect(state.characters[4]).toHaveProperty('class', 'fighter')
  })
})
