const { replaceRecordInList } = require('../../../dist/index')

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

describe('replaceRecordInList', () => {
  const replace = replaceRecordInList('characters', 'id')
  it('adds a record to a list if not found', () => {
    const state = { characters: [...characters] }
    const newCharacter = { id: 5, class: 'fighter' }
    replace(state, newCharacter)
    expect(state.characters).toContain(newCharacter)
  })
  it('it replaces a record if not found', () => {
    const state = { characters: [...characters] }
    const updatedCharacter = { id: 2, class: 'kensai' }
    replace(state, updatedCharacter)
    expect(state.characters[1]).toHaveProperty('class', 'kensai')
  })
})
