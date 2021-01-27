const {
  set,
  assignObject,
  increment,
  decrement,
  pushTo,
  extendRecordInList,
  replaceRecordInList,
  removeRecordInList,
  toggle
} = require('../../dist')
// import { set, assignObject, increment, decrement, pushTo, extendRecordInList, replaceRecordInList, removeRecordInList, toggle } from '@/store/helpers/mutators.js'

const characters = [
  {
    id: 1,
    class: "sorcerer",
  },
  {
    id: 2,
    class: "barbarian",
  },
  {
    id: 3,
    class: "paladin",
  },
  {
    id: 4,
    class: "paladin",
  },
]

const weapons = ['dagger', 'quarter staff', 'crossbow', 'two-handed sword']

describe('set', () => {
  it('sets the value of a property on a state', () => {
    const state = {}
    set('strength')(state, 18)
    expect(state.strength).toBe(18)
  })
  it('sets the value to a path within a state', () => {
    const state = { skills: [{ twohand_sword: 2 }] }
    set(['skills', 0, 'twohand_sword'])(state, 3)
    expect(state.skills[0].twohand_sword).toBe(3)
  })
  it('creates objects along the set path as needed', () => {
    const state = {}
    set(['skills', 0, 'twohand_sword'])(state, 4)
    expect(state.skills[0].twohand_sword).toBe(4)
  })
})

describe('assignObject', () => {
  it('merges an object into another object in state', () => {
    const data = { strength: 18 }
    const state = {}
    assignObject(data)(state)
    expect(state).toMatchObject(data)
  })
})

describe('increment', () => {
  it('increments the value of a property on a state by a specified number', () => {
    const state = { strength: 10 }
    increment('strength')(state, 5)
    expect(state.strength).toBe(15)
  })
  it('increments by the default value of 1', () => {
    const state = { strength: 10 }
    increment('strength')(state)
    expect(state.strength).toBe(11)
  })
})

describe('decrement', () => {
  it('decrements the value of a property on a state by a specified number', () => {
    const state = { strength: 10 }
    decrement('strength')(state, 5)
    expect(state.strength).toBe(5)
  })
  it('decrements by the default value of 1', () => {
    const state = { strength: 10 }
    decrement('strength')(state)
    expect(state.strength).toBe(9)
  })
})

describe('pushTo', () => {
  it('pushes an item onto an array', () => {
    const state = { spells: ['magic missile', 'chromatic orb', 'burning hands'] }
    const spell = 'identify'
    pushTo('spells')(state, spell)
    expect(state.spells[3]).toBe(spell)
  })
})

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

describe('toggle', () => {
  it('toggles a boolean in a state property', () => {
    const state = { bool: true }
    toggle('bool')(state)
    expect(state.bool).toBe(false)
    toggle('bool')(state)
    expect(state.bool).toBe(true)
  })
})