import { Map, Collection } from 'immutable'



const notImplementedError = () => {throw new Error('Method Not Implemented')}
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




const makeIndexedDoublyLinkedList = (map, root, tail, current, ownerID, hash) => {
  var dlList = Object.create(IndexedDoublyLinkedList.prototype);
  dlList.size = map ? map.size : 0;
  dlList._map = map;
  dlList._root = root;
  dlList._tail = tail;
  dlList._current = current;
  dlList.__ownerID = ownerID;
  dlList.__hash = hash;
  dlList.__altered = false;
  return dlList;
}

let EMPTY_INDEXED_DOUBLY_LINKED_LIST;
export const emptyIndexedDoublyLinkedList = () => {
  return EMPTY_INDEXED_DOUBLY_LINKED_LIST || (EMPTY_INDEXED_DOUBLY_LINKED_LIST = makeIndexedDoublyLinkedList(Map()));
}

const updateIndexedDoublyLinkedList = (dlList, k, v) => {

}