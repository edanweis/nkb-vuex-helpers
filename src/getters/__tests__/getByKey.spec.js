const { getByKey } = require('../../../dist/')

const users = [{ name: 'Noah' }, { name: 'Noah' }, { name: 'Renee' }, { name: 'MJ' }]

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

describe('getByKey', () => {
  const state = { users, session: { characters } }
  it('finds a list item if given a single value', () => {
    let find = getByKey('users', 'name')
    expect(find(state)('Noah')).toBe(state.users[0])
    find = getByKey(['session', 'characters'], 'class')
    expect(find(state)('barbarian')).toBe(state.session.characters[1])
  })
  it('returns a list if given a list of values', () => {
    let find = getByKey('users', 'name')
    expect(find(state)(['Renee', 'MJ'])).toEqual(state.users.slice(2, 4))
    find = getByKey(['session', 'characters'], 'class')
    expect(find(state)(['sorcerer', 'barbarian', 'paladin'])).toEqual(state.session.characters.slice(0, -1))
  })
})
