const { filterbyKey } = require('../../../dist/')

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

describe('filterByKey', () => {
  it('filters a list by a key/value pair', () => {
    const state = { users, session: { characters } }
    expect(filterbyKey('users', 'name')(state)('Noah')).toEqual(state.users.slice(0, 2))
    expect(filterbyKey(['session', 'characters'], 'class')(state)('paladin')).toEqual(
      state.session.characters.slice(2, 4)
    )
  })
})
