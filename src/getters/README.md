# Getters

## Example State

```javascript
const state = {
  name: 'Noah',
  characters: [
    { id: 1, class: 'sorcerer', level: 5},
    { id: 2, class: 'fighter', level: 2 },
    { id: 3, class: 'fighter', level: 9 },
    { id: 4, class: undefined, level: 0 },
    { id: 5, class: 'thief', level: 4 },
  ],
  weapons: ['dagger', 'crossbow', 'quarter staff'],
  level: 1,
  last_session_time: 79600
  prestige: false,
}
```

## getter

The most basic possible getter, when you just want to get top-level state.

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
    level: this.getLevel(), // 1
  },
}
```

## getByKey

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
    character: this.getCharByID(1) // { id: 1, class: 'sorcerer' }
    characters: this.getCharByID([1, 2, 3]) // [{ id: 1, class: 'sorcerer' }, { id: 2, class: 'fighter' }, { id: 3, class: 'fighter' }]
  }
}
```

## filterByKey

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
    fighters: this.filterByClass('fighter'), // [{ id: 2, class: 'fighter' }, { id: 3, class: 'fighter' }]
  },
}
```

## filterNil

`filterNil` filters object lists of all null and undefined key-value pairs (Pairs with a value of false are unaffected). Now works as intended, using a recursive function to go through nested objects and arrays of objects.

```javascript
// Store/module file
import { filterNil } from 'nkb-vuex-helpers'

const getters = {
  filterEmptyCharData: filterNil('characters'),
}

// Use with mapGetters
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['filterEmptyCharData']),
    charData: this.filterEmptyCharData(), // [{ id: 1, class: 'sorcerer', level: 5}, { id: 2, class: 'fighter', level: 2 }, { id: 3, class: 'fighter', level: 9 }, { id: 4, level: 0 }, { id: 5, class: 'thief'  level: 4 }]
  },
}
```

## getCase

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
    getUpperName: this.getUpperName(), // NOAH
    getLowerName: this.getLowerName(), // noah
  },
}
```

## getChunk

`getChunk` takes a string value of a state's property and groups it into multiple arrays whose max length is decided by the user at commit(). Does not change the original state.

```javascript
// Characters module file
import { getChunk } from 'nkb-vuex-helpers'

const getters = {
  getChunkedWeapons: chunk('weapons'),
}

// Use with mapGetters
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getChunkedWeapons']),
    chunkedWeaponList: this.getChunkedWeapons(), // weapons: [['dagger', 'crossbow'], ['quarter staff']]
  }
}
```

## getMax

`getMax` compares values within properties and gives you the state with the maximum numeric value.

```javascript
// Store/module file
import { getMax } from 'nkb-vuex-helpers'

const getters = {
  getMaxChar: getMax('characters', 'level'), 
}

// Use with mapGetters
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getMaxChar']),
    maxLevelChar: this.getMaxChar(), // { id: 3, class: 'fighter', level: 9 }
  },
}
```

## getMin

`getMin` compares values within properties and gives you the state with the minimum numeric value.

```javascript
// Store/module file
import { getMin } from 'nkb-vuex-helpers'

const getters = {
  getMinChar: getMin('characters', 'level'), 
}

// Use with mapGetters
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getMinChar']),
    minLevelChar: this.getMinChar(), // { id: 4, class: undefined, level: 0 }
  },
}
```

## dayTimeFormatter

`dayTimeFormatter` takes a state value in seconds (up to a max of 24 hours/86400s) and formats it into a readable timestamp. Parameters include a choice in 12 or 24 hour clock types (default is 24), and a boolean option to show or hide the seconds part of the timestamp (default is true). 12 or 24 clock types can be set as integers (12, 24) or strings ('12', '24'), but the state put through the function MUST be an integer.

```javascript
// Store/module file
import { dayTimeFormatter } from 'nkb-vuex-helpers'

const getters = {
  showLastSessionTime: dayTimeFormatter('last_session_time'),
}

// Use with mapGetters
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['showLastSessionTime']),
    blogPostTime: this.showLastSessionTime(12, false), // Formats to '10:06 PM'
    blogPost24Time: this.showLastSessionTime(), // Formats to '22:06:40'
  },
}
```