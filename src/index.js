import { Map, Collection } from 'immutable'



const notImplementedError = (name) => {throw new Error(name + ': Method Not Implemented')}
export class IndexedDoublyLinkedList extends Collection.Keyed {
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

  get() {
    notImplementedError('get')
  }

  set() {
    notImplementedError('set')
  }

  setIn() {
    notImplementedError('setIn')
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

  deleteBetween() {
    notImplementedError('deleteBetween')
  }

  moveToStart() {
    notImplementedError('moveToStart')
  }

  moveToEnd() {
    notImplementedError('moveToEnd')
  }

  moveToNext() {
    notImplementedError('moveToNext')
  }

  moveToPrev() {
    notImplementedError('moveToPrev')
  }

  moveTo() {
    notImplementedError('moveTo')
  }

  clear() {
    notImplementedError('clear')
  }

  __iterator() {
    notImplementedError('__iterator')
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
    // notImplementedError('__iterate')
  }

  __ensureOwner() {
    notImplementedError('__ensureOwner')
  }

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
IndexedDoublyLinkedList.prototype['DELETE'] = IndexedDoublyLinkedList.prototype.remove;


const IS_DOUBLY_LINKED_LIST_SENTINEL = '@@__IMMUTABLE_DOUBLY_LINKED_LIST__@@';
IndexedDoublyLinkedList.prototype[IS_DOUBLY_LINKED_LIST_SENTINEL] = true;

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

const pushItemOnList = (item, dlList) => {
  const {_firstItemId, _lastItemId, _itemsById} = dlList
  const itemId = item.get('id')
  // handle empty list
  if (!_firstItemId && !_lastItemId) {
    const newItemsById = _itemsById.set(itemId, item)
    return makeIndexedDoublyLinkedList(newItemsById, itemId, itemId, 
      dlList._currentItemId, dlList._idFn, dlList.__ownerID, dlList.__hash)
  }

  return dlList
}

const setNextItemIdOnItem = (nextItemId, item) => {
  return item.set('nextItemId', nextItemId)
}

const setPrevItemIdOnItem = (prevItemId, item) => {
  return item.set('prevItemId', prevItemId)
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

/*
constructor
static of
toString
get
set
setIn
remove

swap
insertAfter
insertBefore
getBetween
deleteBetween

moveToStart
moveToEnd
moveToNext
moveToPrev
moveTo

push
pop
unshift
shift
clear

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

__iterator
__iterate
__ensureOwner
*/