# Mutators

## Example State

```javascript
const state = {
  name: 'Noah',
  characters: [
    { id: 1, class: 'sorcerer', level: 5},
    { id: 2, class: 'fighter', level: 2 },
    { id: 3, class: 'fighter', level: 9 },
    { id: 4, class: 'cleric', level: 0 },
    { id: 5, class: 'thief', level: 4 },
  ],
  weapons: ['dagger', 'crossbow', 'quarter staff'],
  userLevel: 1,
  prestige: false,
}
```

## set

`set` abstracts over two helper functions: `setState` and `setPath`, depending on if the arguments in `set` are an array or not. `setPath` creates objects and arrays along the path as needed if they don't already exist. Strings in the path cause objects to be created, integers cause arrays.

```javascript
// Store/module file
import { set } from 'nkb-vuex-helpers'

const mutations = {
  setClass: set(['character', 0, 'class']), // Uses setPath. If the paths did not exist in the state above, setPath would create them
  setLevel: set('userLevel'), // uses setState to set the userLevel
}

// Use for actions:
commit('setClass', 'mage') // { id: 1, class: 'mage', level: 5},
commit('setLevel', 5) // { userLevel: 5 }
```

## assignObject

`assignObject` merges a defined object into the state, regardless of any values passed to commit. Mostly useful for resetting whole state objects in modules.

```javascript
// Characters module file
import { assignObject } from 'nkb-vuex-helpers'

const mutations = {
  resetChars: assignObject(defaultCharacters),
}

// Use
commit('resetChars')
```

## chunk

`chunk` splits an array into groups whose max length is defined by the number set by the user at commit()

```javascript
// Characters module file
import { chunk } from 'nkb-vuex-helpers'

const mutations = {
  chunkWeapons: chunk('weapons'),
}

// Use
commit('chunkWeapons', 2) // weapons: [['dagger', 'crossbow'], ['quarter staff']]
```

## increment

`increment` increments a number in a state value by a set iterator. Defaults to 1 if nothing is set.

```javascript
// Store/module file
import { increment } from 'nkb-vuex-helpers'

const mutations = {
  incLevel: increment('userLevel'),
}

// Use
commit('incLevel') // { userLevel: 2 }
commit('incLevel', 5) // { userLevel: 6 }
```

## decrement

`decrement` decrements a number in a state value by a set iterator. Defaults to 1 if nothing is set.

```javascript
// Store/module file
import { decrement } from 'nkb-vuex-helpers'

const mutations = {
  decLevel: decrement('userLevel'),
}

// Use
commit('decLevel') // { userLevel: 0 }
commit('decLevel', 5) // { userLevel: -4 }
```

## pushTo

`pushTo` pushes a value or values to an existing array.

```javascript
// Store/module file
import { pushTo } from 'nkb-vuex-helpers'

const mutations = {
  pushWeapon: pushTo('weapons'),
}

// Use
commit('pushWeapon', 'short sword') // weapons: ['dagger', 'crossbow', 'quarter staff', 'short sword']
commit('pushWeapon', ['dart', 'sling']) // weapons: ['dagger', 'crossbow', 'quarter staff', 'dart', 'sling']
```

## extendRecordInList

`extendRecordInList` adds records to a list, and will merge new values into an existing record.

```javascript
// Store/module file
import { extendRecordInList } from 'nkb-vuex-helpers'

const mutations = {
  addCharacter: extendRecordInList('characters', 'id'),
}

// Use
// New Record
commit('addCharacter', { id: 6 })
// Extend Record
commit('addCharacter', { id: 6, class: 'ranger' })
// Record is now { id: 6, class: 'ranger' }
```

## replaceRecordInList

`replaceRecordInList` adds records to a list, and will replace the record if it already exists.

```javascript
// Store/module file
import { replaceRecordInList } from 'nkb-vuex-helpers'

const mutations = {
  addCharacter: extendRecordInList('characters', 'id'),
}

// Use
// New Record
commit('addCharacter', { id: 6, class: 'ranger' })
// Replace Record
commit('addCharacter', { id: 6, class: 'archer' })
// Record is now { id: 6, class: 'archer' }
```

## removeRecordInList

`removeRecordInList` removes items or records from a list in state, depending on how it's configured. Adding a target key to the second argument will delete whole records.

```javascript
// Store/module file
import { removeRecordInList } from 'nkb-vuex-helpers'

const mutations = {
  removeWeapons: removeRecordInList('weapons')
  removeCharacters: removeRecordInList('characters', 'id')
}

// Use
commit('removeWeapons', ['dagger', 'crossbow']) // weapons: ['quarter staff'],
commit('removeCharacters', [2, 3]) // characters: [{ id: 1, class: 'sorcerer', level: 5}, { id: 4, class: 'cleric', level: 0 }, { id: 5, class: 'thief'  level: 4 }]
```

## toCase

`toCase` mutates a string value into the user set case. Runs non-strings through the String() object.

```javascript
// Store/module file
import { toCase } from 'nkb-vuex-helpers'

const mutations = {
  setUpperName: toCase('name', 'upper'), 
  setLowerName: toCase('name', 'lower'), 
}

// Use
commit('setUpperName') // name: NOAH
commit('setLowerName') // name: noah
```

## toggle

`toggle` toggles a boolean value.

```javascript
// Store/module file
import { toggle } from 'nkb-vuex-helpers'

const mutations = {
  togglePrestige: toggle('prestige'),
}

// Use
commit('togglePrestige') // prestige: true
commit('togglePrestige') // prestige: false
```
