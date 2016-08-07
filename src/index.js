import { Map, Collection } from 'immutable'
import { Iterator, iteratorDone, iteratorValue } from './Iterator'

console.log('Map', Map)

const notImplementedError = (name) => {throw new Error(name + ': Method Not Implemented')}
export class IndexedDoublyLinkedList extends Collection.Indexed {
  // @pragma Construction

  constructor(value, idFn) {
    const valueIsNull = value === null || value === undefined
    const emptyList = emptyIndexedDoublyLinkedList()
    // if (valueIsNull) return emptyList
    // if (isIndexedDoublyLinkedList(value)) return value


    return emptyList
    // return valueIsNull ? emptyList :
    //   isMap(value) && !isOrdered(value) ? value :
    //   emptyMap().withMutations(map => {
    //     var iter = KeyedIterable(value);
    //     assertNotInfinite(iter.size);
    //     iter.forEach((v, k) => map.set(k, v));
    //   });
  }

  // static of() {
  //   const argArray = [...arguments]
  //   const lastArg = argArray[argArray.length]
  //   if (typeof lastArg === 'function') {
  //     argArray.pop()
  //     return this(argArray, idFn)
  //   }
  //   else {
  //     throw new Error('Last Argument should be id extraction function: ' + argArray.toString());
  //   }
  // }

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

  __ensureOwner() {
    notImplementedError('__ensureOwner')
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
        const item = itemsById.get(itemId)
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
  newItemsById = newItemsById.set(itemId, item)
  
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
merge
mergeIn
mergeWith
mergeDeep
mergeDeepWith
mergeDeepIn

sort
sortBy

slice

withMutations
asMutable
asImmutable
wasAltered
*/