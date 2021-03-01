const { pushTo } = require('../../../dist/index')

const weapons = ['dagger', 'quarter staff', 'crossbow', 'two-handed sword']

describe('pushTo', () => {
  it('pushes an item onto an array', () => {
    const state = {
      weapons: weapons,
    }
    const weapon = 'dart'
    pushTo('weapons')(state, weapon)
    expect(state.weapons[4]).toBe(weapon)
  })
  // it('turns initial non-arrays into arrays', () => {
  //   const state = {
  //     spells: 'magic missile',
  //   }
  //   const spell = 'identify'
  //   pushTo('spells')(state, spell)
  //   console.log(state.spells)
  //   expect(state.spells).toBe(spell)
  // })
})
