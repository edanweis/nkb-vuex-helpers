const { getChunk } = require('../../../dist/')

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

describe('getChunk', () => {
  const state = {
    weapons: weapons,
  }
  it('chunks a given array into groups based on given size, modulo 0', () => {
    expect(getChunk('weapons')(state, 2)).toStrictEqual([
      ['dagger', 'shortbow'],
      ['dart', 'katana'],
    ])
  })
  it('chunks a given array into groups based on given size, modulo not 0', () => {
    expect(getChunk('weapons')(state, 3)).toStrictEqual([['dagger', 'shortbow', 'dart'], ['katana']])
  })
  it('chunks an array of objects', () => {
    const state = {
      characters: characters,
    }
    expect(getChunk('characters')(state, 2)).toStrictEqual([
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
