const { chunk } = require('../../../dist/index')

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
const weapons = ['dagger', 'shortbow', 'dart', 'katana']

describe('chunk', () => {
  it('chunks a given state array into groups based on the given number, modulo 0', () => {
    const state = {
      weapons: weapons,
    }
    chunk('weapons')(state, 2)
    expect(state.weapons).toStrictEqual([
      ['dagger', 'shortbow'],
      ['dart', 'katana'],
    ])
  })
  it('chunks a given state array into groups based on the given number, modulo not 0', () => {
    const state = {
      weapons: weapons,
    }
    chunk('weapons')(state, 3)
    expect(state.weapons).toStrictEqual([['dagger', 'shortbow', 'dart'], ['katana']])
  })
  it('chunks an array of objects', () => {
    const state = {
      characters: characters,
    }
    chunk('characters')(state, 2)
    expect(state.characters).toStrictEqual([
      [
        { id: 1, class: 'sorcerer' },
        { id: 2, class: 'barbarian' },
      ],
      [
        { id: 3, class: 'paladin' },
        { id: 4, class: 'paladin' },
      ],
    ])
  })
})
