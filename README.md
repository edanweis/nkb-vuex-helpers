# nkb-vuex-helpers

This is a library adapted and expanded from Vuex Intern by Nick Baroni for personal use. Uses curried functions to assist in common types of mutations and getters, substantially reducing the amount of code in the store.

## Install

`npm install --save-dev nkb-vuex-helpers`

## Example State

```javascript
const state = {
  characters: [
    { id: 1, class: 'sorcerer' },
    { id: 2, class: 'fighter' },
    { id: 3, class: 'fighter' },
    { id: 4, class: 'cleric' },
    { id: 5, class: 'thief' },
  ],
  weapons: ['dagger', 'crossbow', 'quarter staff'],
  level: 1,
  prestige: false,
}
```

## Getters

### getter

The most basic possible getter:

```javascript
// Store/module file
import { getter } from 'nkb-vuex-helpers'

const getters = {
  getLevel: getter('level'),
}

// Use with mapGetters
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getLevel']),
    level: this.getLevel(),
  },
}
```

### getByKey

`getByKey` finds an object inside a list by searching for a key/value pair. With a single value, it returns a single object, if it finds it. With an array, it returns an array. One can use arrays in the first argument of the getter itself if the property is nested in state.

```javascript
// Store/module file
import { getByKey } from 'nkb-vuex-helpers'

const getters = {
  getCharByID: getByKey('characters', 'id')
}

// Use with mapGetters
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'getCharByID'
    ]),
    character: this.getCharByID(1)
    characters: this.getCharByID([1, 2, 3])
  }
}
```

### filterByKey

`filterByKey` filters a list against a key/value pair. It accepts a single value or an array of possible values. Like with the above, the first argument in the getter itself can be an array if the property is nested.

```javascript
// Store/module file
import { filterByKey } from 'nkb-vuex-helpers'

const getters = {
  filterByClass: filterByKey('characters', 'class'),
}

// Use with mapGetters
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['filterByClass']),
    fighters: this.filterByClass('fighter'),
  },
}
```

### filterNil

`filterNil` filters object lists of all null and undefined key-value pairs (Pairs with a value of false are unaffected). This function works on nested objects and array objects, maintaining their structure while removing undefined or null entries.

```javascript
// Store/module file
import { filterNil } from 'nkb-vuex-helpers'

const getters = {
  getValidUsers: filterNil('users'),
}

// Use with mapGetters
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getValidUsers']),
    validUsers: this.getValidUsers(),
  },
}
```

### getCase

`getCase` takes a string value of a state's property and forces it to either upper or lower case, depending on parameter chosen. It turns non-string values into strings, so bear that in mind. By default it transforms the string into uppercase.

```javascript
// Store/module file
import { getCase } from 'nkb-vuex-helpers'

const getters = {
  getUpperName: getCase('name', 'upper'),
  getLowerName: getCase('name', 'lower'),
}

// Use with mapGetters
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getUpperName']),
    getUpperName: this.getUpperName(),
    getLowerName: this.getLowerName(),
  },
}
```

### dayTimeFormatter

`dayTimeFormatter` takes a state value in seconds (up to a max of 24 hours/86400s) and formats it into a readable timestamp. Parameters include a choice in 12 or 24 hour clock types (default is 24), and a boolean option to show or hide the seconds part of the timestamp (default is true). 12 or 24 clock types can be set as integers (12, 24) or strings ('12', '24'), but the state put through the function MUST be an integer.

```javascript
// Store/module file
import { dayTimeFormatter } from 'nkb-vuex-helpers'

const getters = {
  showPostTime: dayTimeFormatter('postTime'),
}

// Use with mapGetters
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['showPostTime']),
    blogPostTime: this.showPostTime(12, false), // Formats to '00:00' with AM or PM appended if hour count > 12
    blogPost24Time: this.showPostTime(), // Formats to '00:00:00' with 24 hour clock type
  },
}
```

## Mutators

### set

`set` abstracts over two helper functions: `setState` and `setPath`, depending on if the arguments in `set` are an array or not. `setPath` creates objects and arrays along the path as needed if they don't already exist. Strings in the path cause objects to be created, integers cause arrays.

```javascript
// Store/module file
import { set } from 'nkb-vuex-helpers'

const mutations = {
  setClass: set(['character', 0, 'class']), // Uses setPath. If the paths did not exist in the state above, setPath would create them
  setLevel: set('level'), // uses setState to set the level
}

// Use for actions:
commit('setClass', 'mage') // Changes first entry/sorcerer character to mage
commit('setLevel', 5)
```

### assignObject

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

### increment

`increment` increments a number in a state value by a set iterator. Defaults to 1 if nothing is set.

```javascript
// Store/module file
import { increment } from 'nkb-vuex-helpers'

const mutations = {
  incLevel: increment('level'),
}

// Use
commit('incLevel') // Increments level by 1
commit('incLevel', 5) // Increments level by 5
```

### decrement

`decrement` decrements a number in a state value by a set iterator. Defaults to 1 if nothing is set.

```javascript
// Store/module file
import { decrement } from 'nkb-vuex-helpers'

const mutations = {
  decLevel: decrement('level'),
}

// Use
commit('decLevel') // Decrements level by 1
commit('decLevel', 5) // Decrements level by 5
```

### pushTo

`pushTo` pushes a value or values to an existing array.

```javascript
// Store/module file
import { pushTo } from 'nkb-vuex-helpers'

const mutations = {
  pushWeapon: pushTo('weapons'),
}

// Use
commit('pushWeapon', 'short sword')
commit('pushWeapon', ['dart', 'sling'])
```

### extendRecordInList

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

### replaceRecordInList

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

### removeRecordInList

`removeRecordInList` removes items or records from a list in state, depending on how it's configured. Adding a target key to the second argument will delete whole records.

```javascript
// Store/module file
import { removeRecordInList } from 'nkb-vuex-helpers'

const mutations = {
  removeWeapons: removeRecordInList('weapons')
  removeCharacters: removeRecordInList('characters', 'id')
}

// Use
commit('removeWeapons', ['dagger', 'crossbow'])
// weapons is now ['quarter staff']
commit('removeCharacters', [2, 3])
// characters left are now the sorcerer, the cleric, and thief.
```

### toggle

`toggle` toggles a boolean value.

```javascript
// Store/module file
import { toggle } from 'nkb-vuex-helpers'

const mutations = {
  togglePrestige: toggle('prestige'),
}

// Use
commit('togglePrestige')
```
