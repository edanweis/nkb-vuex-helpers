const { filterNil } = require('../../../dist/')

const noahData = {
  name: 'Noah',
  age: 33,
  email: null,
}

const noahNested = {
  class: 'Sorcerer',
  level: undefined,
  prestige: false,
}

const reneeData = {
  name: 'Renee',
  age: undefined,
  email: null,
}

const reneeNested = {
  class: 'Paladin',
  level: 20,
  prestige: false,
}

describe('filterNil', () => {
  it('returns a filtered top-level object', () => {
    const state = {
      user: noahData,
    }
    expect(filterNil('user')(state)).toStrictEqual({
      name: 'Noah',
      age: 33,
    })
  })
  it('returns a filtered nested object', () => {
    const state = {
      user: { ...noahData, character: { ...noahNested } },
    }
    expect(filterNil('user')(state)).toStrictEqual({
      name: 'Noah',
      age: 33,
      character: {
        class: 'Sorcerer',
        prestige: false,
      },
    })
  })
  it('returns a filtered array of objects', () => {
    const state = {
      user: [
        { ...noahData, character: { ...noahNested } },
        { ...reneeData, character: { ...reneeNested } },
      ],
    }
    expect(filterNil('user')(state)).toStrictEqual({
      0: {
        name: 'Noah',
        age: 33,
        character: {
          class: 'Sorcerer',
          prestige: false,
        },
      },
      1: {
        name: 'Renee',
        character: {
          class: 'Paladin',
          level: 20,
          prestige: false,
        },
      },
    })
  })
})
