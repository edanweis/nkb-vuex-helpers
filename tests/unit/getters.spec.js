const {
  getter,
  getByKey,
  filterbyKey,
  filterNil,
  getCase,
  dayTimeFormatter,
} = require('../../dist')
// import { getter, getByKey, filterbyKey } from '@/store/helpers/getters.js'

const users = [
  { name: 'Noah' },
  { name: 'Noah' },
  { name: 'Renee' },
  { name: 'MJ' },
]

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

describe('getter', () => {
  const state = { strength: 18 }
  it('returns the value of the selected state', () => {
    let strValue = getter('strength')(state)
    expect(strValue).toBe(18)
  })
})

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
    expect(find(state)(['sorcerer', 'barbarian', 'paladin'])).toEqual(
      state.session.characters.slice(0, -1)
    )
  })
})

describe('filterByKey', () => {
  it('filters a list by a key/value pair', () => {
    const state = { users, session: { characters } }
    expect(filterbyKey('users', 'name')(state)('Noah')).toEqual(
      state.users.slice(0, 2)
    )
    expect(
      filterbyKey(['session', 'characters'], 'class')(state)('paladin')
    ).toEqual(state.session.characters.slice(2, 4))
  })
})

describe('filterNil', () => {
  it('returns a an object with only truthy kvps at one level in an object', () => {
    const state = {
      user: {
        name: 'Noah',
        age: undefined,
        email: null,
        character: 'Sorcerer',
        charLevel: 11,
        prestige: false,
      },
    }
    expect(filterNil('user')(state)).toMatchObject({
      name: 'Noah',
      character: 'Sorcerer',
      charLevel: 11,
      prestige: false,
    })
  })
  it('returns object with truthy kvps in nested object', () => {
    const state = {
      user: {
        name: 'Noah',
        age: undefined,
        email: null,
        character: {
          class: 'Sorcerer',
          level: 15,
          prestige: false,
        },
      },
    }
    expect(filterNil('user')(state)).toMatchObject({
      name: 'Noah',
      character: { class: 'Sorcerer', level: 15 },
    })
  })
  it('returns an object with non-nil kvps in array object', () => {
    const state = {
      users: [
        {
          name: 'Noah',
          age: 33,
          email: null,
          character: {
            class: 'Sorcerer',
            level: 15,
            prestige: false,
          },
        },
        {
          name: 'Renee',
          age: undefined,
          email: null,
          character: {
            class: 'Paladin',
            level: 20,
            prestige: false,
          },
        },
      ],
    }
    expect(filterNil('users')(state)).toMatchObject({
      0: {
        name: 'Noah',
        age: 33,
        character: { class: 'Sorcerer', level: 15, prestige: false },
      },
      1: {
        name: 'Renee',
        character: { class: 'Paladin', level: 20, prestige: false },
      },
    })
  })
})

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

describe('dayTimeFormatter', () => {
  const stateAM = { time: 36500 }
  const statePM = { time: 79600 }
  it('returns a 24 hour timestamp', () => {
    let formattedTime = dayTimeFormatter('time')(statePM, 24)
    expect(formattedTime).toBe('22:06:40')
  })
  it('returns a 12 hour AM timestamp', () => {
    let formattedTime = dayTimeFormatter('time')(stateAM, 12)
    expect(formattedTime).toBe('10:08:20 AM')
  })
  it('returns a 12 hour PM timestamp without seconds', () => {
    let formattedTime = dayTimeFormatter('time')(statePM, 12, false)
    expect(formattedTime).toBe('10:06 PM')
  })
  it('24 clock parameter as numeric string', () => {
    let formattedTime = dayTimeFormatter('time')(statePM, '24')
    expect(formattedTime).toBe('22:06:40')
  })
})
