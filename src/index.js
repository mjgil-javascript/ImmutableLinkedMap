import { Map, Collection, Iterable } from 'immutable'
import { Iterator, iteratorDone, iteratorValue } from './Iterator'
import assertNotInfinite from './utils/assertNotInfinite'

console.log('Iterable', Iterable)

const notImplementedError = (name) => {throw new Error(name + ': Method Not Implemented')}

// subclassing Collection.Keyed to get iterable methods to work
// methods: https://github.com/facebook/immutable-js/blob/0f88549e3ceeb6a8834709b095105aa5e2922b63/src/IterableImpl.js
// inspiration: https://github.com/facebook/immutable-js/blob/0f88549e3ceeb6a8834709b095105aa5e2922b63/src/Map.js
export class IndexedDoublyLinkedList extends Collection.Keyed {
  // @pragma Construction

  // this is a custom constructor that is compiled to a function
  // with the declassify.js file in /resources/declassify.js
  // taken from: https://github.com/facebook/immutable-js/blob/0f88549e3ceeb6a8834709b095105aa5e2922b63/resources/declassify.js
  // look at build to see final output after this and es6-transpilation
  // WARNING: This does not compile with babel
  constructor(value) {
    const valueIsNull = value === null || value === undefined
    const emptyList = emptyIndexedDoublyLinkedList()
    if (valueIsNull) return emptyList
    if (isIndexedDoublyLinkedList(value)) return value

    let newList = emptyList
    const iter = Iterable.Keyed(value)
    assertNotInfinite(iter.size)
    iter.forEach((v, k) => newList = newList.push(v, k))

    return newList
  }

  // like Immutable.Map
  static of(...keyValues) {
    // 1, 'a', 2, 'b', 3, '4'
    let newList = emptyIndexedDoublyLinkedList()
    for (var i = 0; i < keyValues.length; i += 2) {
      if (i + 1 >= keyValues.length) {
        throw new Error('Missing value for key: ' + keyValues[i]);
      }
      newList = newList.push(keyValues[i + 1], keyValues[i]);
    }
    return newList
  }

  toString() {
    return this.__toString('Doubly Linked List [', ']')
  }

  get(valueId, notSetValue) {
    // notImplementedError('get')
    const item = getItemById(this._itemsById, valueId)
    if (item) {
      return item.get('value')
    }
    return notSetValue
  }

  set(valueId, value) {
    return updateValueInItemsById(this, valueId, value)
  }

  remove() {
    notImplementedError('remove')
  }

  // List Methods

  // adds to end
  push(value, key) {
    const item = makeListItem(value, key)
    return pushItemOnList(item, this)
  }

  // adds to back
  pop() {
    notImplementedError('pop')
  }

  unshift() {
    notImplementedError('unshift')
  }

  shift() {
    notImplementedError('shift')
  }

  swap() {
    notImplementedError('swap')
  }

  insertAfter() {
    notImplementedError('insertAfter')
  }

  insertBefore() {
    notImplementedError('insertBefore')
  }

  getBetween() {
    notImplementedError('getBetween')
  }

  getNext() {
    notImplementedError('getBetween')
  }

  getPrev() {
    notImplementedError('getBetween')
  }

  deleteBetween() {
    notImplementedError('deleteBetween')
  }

  // moves to next
  next() {
    notImplementedError('moveToNext')
  }

  // moves to prev
  prev() {
    notImplementedError('moveToPrev')
  }

  moveTo(valueId) {
    notImplementedError('moveTo')
  }

  moveToStart() {
    notImplementedError('moveToStart')
  }

  moveToEnd() {
    notImplementedError('moveToEnd')
  }

  clear() {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._itemsById = Map();
      this._firstItemId = undefined
      this._lastItemId = undefined
      this._currentItemId = undefined
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return emptyIndexedDoublyLinkedList();
  }

  __iterator(type, reverse) {
    let iter = iterateList(this, reverse);
    return new Iterator(() => {
      let obj = iter.next();
      return obj.done ?
        iteratorDone() :
        iteratorValue(type, obj.key, obj.value.get('value'));
    });
  }

  __iterate(fn, reverse) {
    let iter = iterateList(this, reverse);
    let obj = iter.next();
    while (!obj.done) {
      if (fn(obj.value.get('value'), obj.key, this) === false) {
        break;
      }
      obj = iter.next()
    }
    return null;
  }

  __ensureOwner(ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      this.__ownerID = ownerID;
      this.__altered = false;
      return this;
    }
    return makeIndexedDoublyLinkedList(this._itemsById, this._firstItemId, this._lastItemId, 
      this._currentItemId, this._idFn, ownerID, this.__hash)
  }

}

const getItemById = (itemsById, itemId) => {
  return itemsById.get(itemId)
}

const updateValueInItemsById = (dlList, itemId, value) => {
  const item = dlList._itemsById.get(itemId)
  const newItem = setValueOnItem(value, item)
  const newItemsById = dlList._itemsById.set(itemId, newItem)
  return makeIndexedDoublyLinkedList(newItemsById, dlList._firstItemId, dlList._lastItemId, 
    dlList._currentItemId, dlList._idFn, dlList.__ownerID, dlList.__hash)
}

const iterateList = (dlList, reverse) => {
  const itemsById = dlList._itemsById
  let nextItemId;
  if (!reverse) {
    nextItemId = dlList._firstItemId

    return {
      next: () => {
        const item = itemsById.get(nextItemId)
        const iterObj = { value: item, key: nextItemId, done: !item }
        nextItemId = item ? item.get('nextItemId') : null
        return iterObj
      }
    }
  }
  else {
    nextItemId = dlList._lastItemId

    return {
      next: () => {
        const item = itemsById.get(nextItemId)
        const iterObj = { value: item, key: nextItemId, done: !item }
        nextItemId = item ? item.get('prevItemId') : null
        return iterObj
      }
    }
  }

}

// Used for setting prototype methods that IE8 chokes on.
const DELETE = 'delete';
const IS_DOUBLY_LINKED_LIST_SENTINEL = '@@__IMMUTABLE_DOUBLY_LINKED_LIST__@@';

export var IndexedDoublyLinkedListPrototype = IndexedDoublyLinkedList.prototype
IndexedDoublyLinkedListPrototype['DELETE'] = IndexedDoublyLinkedListPrototype.remove;
IndexedDoublyLinkedListPrototype[IS_DOUBLY_LINKED_LIST_SENTINEL] = true;


// adding to Prototype so that subclassing works
const MapPrototype = Map.prototype
IndexedDoublyLinkedListPrototype.setIn = MapPrototype.setIn;
IndexedDoublyLinkedListPrototype.deleteIn =
IndexedDoublyLinkedListPrototype.removeIn = MapPrototype.removeIn;
IndexedDoublyLinkedListPrototype.update = MapPrototype.update;
IndexedDoublyLinkedListPrototype.updateIn = MapPrototype.updateIn;
IndexedDoublyLinkedListPrototype.mergeIn = MapPrototype.mergeIn;
IndexedDoublyLinkedListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
IndexedDoublyLinkedListPrototype.withMutations = MapPrototype.withMutations;
IndexedDoublyLinkedListPrototype.asMutable = MapPrototype.asMutable;
IndexedDoublyLinkedListPrototype.asImmutable = MapPrototype.asImmutable;
IndexedDoublyLinkedListPrototype.wasAltered = MapPrototype.wasAltered;

const isIndexedDoublyLinkedList = (maybeIndexedDoublyLinkedList) => {
  return !!(maybeIndexedDoublyLinkedList && maybeIndexedDoublyLinkedList[IS_DOUBLY_LINKED_LIST_SENTINEL]);
}
IndexedDoublyLinkedList.isIndexedDoublyLinkedList = isIndexedDoublyLinkedList;

const makeListItem = (value, key) => {
  const item = Map({
    id: key,
    prevItemId: null,
    nextItemId: null,
    value: value
  })

  return item
}

const addNewItemAtEndOfList = (itemsById, prevItemId, item) => {
  const itemId = item.get('id')
  let newItemsById = itemsById.setIn([prevItemId, 'nextItemId'], itemId)
  
  const newItem = setPrevItemIdOnItem(prevItemId, item)
  newItemsById = newItemsById.set(itemId, newItem)
  
  return newItemsById
}

const pushItemOnList = (item, dlList) => {
  const {_firstItemId, _lastItemId, _itemsById} = dlList
  const itemId = item.get('id')
  // handle empty list
  if (!_firstItemId && !_lastItemId) {
    const newItemsById = _itemsById.set(itemId, item)
    return makeIndexedDoublyLinkedList(newItemsById, itemId, itemId, 
      dlList._currentItemId, dlList._idFn, dlList.__ownerID, dlList.__hash)
  }
  else if (_lastItemId) {
    let newItemsById = addNewItemAtEndOfList(_itemsById, _lastItemId, item)
    return makeIndexedDoublyLinkedList(newItemsById, _firstItemId, itemId, 
      dlList._currentItemId, dlList._idFn, dlList.__ownerID, dlList.__hash)
  }
  else {
    throw new Error('End of List Not Found')
  }

  return dlList
}

const setNextItemIdOnItem = (nextItemId, item) => {
  return item.set('nextItemId', nextItemId)
}

const setPrevItemIdOnItem = (prevItemId, item) => {
  return item.set('prevItemId', prevItemId)
}

const setValueOnItem = (value, item) => {
  return item.set('value', value)
}

// factory pattern
const makeIndexedDoublyLinkedList = (itemsById, firstItemId, lastItemId, currentItemId, idFn, ownerID, hash) => {
  var dlList = Object.create(IndexedDoublyLinkedList.prototype);
  dlList.size = itemsById ? itemsById.size : 0;
  dlList._itemsById = itemsById;
  dlList._firstItemId = firstItemId;
  dlList._lastItemId = lastItemId;
  dlList._currentItemId = currentItemId;
  dlList._idFn = idFn
  dlList.__ownerID = ownerID;
  dlList.__hash = hash;
  dlList.__altered = false;
  return dlList;
}

// singleton pattern
let EMPTY_INDEXED_DOUBLY_LINKED_LIST;
export const emptyIndexedDoublyLinkedList = () => {
  return EMPTY_INDEXED_DOUBLY_LINKED_LIST || (EMPTY_INDEXED_DOUBLY_LINKED_LIST = makeIndexedDoublyLinkedList(Map()));
}

const updateIndexedDoublyLinkedList = (dlList, k, v) => {

}

/* Unimplemented Methods
mergeIn?
mergeDeepIn?

merge
mergeWith
mergeDeep
mergeDeepWith

sort
sortBy

slice

withMutations
asMutable
asImmutable
wasAltered
*/