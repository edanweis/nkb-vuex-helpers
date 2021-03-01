const { removeRecordInList } = require('../../../dist/index')

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

const weapons = ['dagger', 'quarter staff', 'crossbow', 'two-handed sword']

describe('removeRecordInList', () => {
  it('removes items from a list in state', () => {
    const state = { weapons: [...weapons] }
    removeRecordInList('weapons')(state, weapons.slice(0, 2))
    expect(state.weapons).toHaveLength(2)
    expect(state.weapons[0]).toBe('crossbow')
  })
  it('removes records from a list in state', () => {
    const state = { characters: [...characters] }
    removeRecordInList('characters', 'id')(state, 1)
    expect(state.characters).toHaveLength(3)
    expect(state.characters[0].id).toBe(2)
  })
})
