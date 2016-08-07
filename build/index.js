/**
 *  Copyright (c) 2016, IdeaFlow, Inc.
 *  All rights reserved.
 *
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('immutable')) :
  typeof define === 'function' && define.amd ? define(['exports', 'immutable'], factory) :
  (factory((global.IndexedDoublyLinkedList = {}),global.immutable));
}(this, function (exports,immutable) { 'use strict';

  // @pragma Construction

    function IndexedDoublyLinkedList(value, idFn) {
      var valueIsNull = value === null || value === undefined
      var emptyList = emptyIndexedDoublyLinkedList()
      if (valueIsNull) return emptyList
      if (isIndexedDoublyLinkedList(value)) return value


      return emptyIndexedDoublyLinkedList()
      // return valueIsNull ? emptyList :
      //   isMap(value) && !isOrdered(value) ? value :
      //   emptyMap().withMutations(map => {
      //     var iter = KeyedIterable(value);
      //     assertNotInfinite(iter.size);
      //     iter.forEach((v, k) => map.set(k, v));
      //   });
    }

    IndexedDoublyLinkedList.of = function() {var S_ITER$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator';var S_MARK$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["__setObjectSetter__"];function ITER$0(v,f){if(v){if(Array.isArray(v))return f?v.slice():v;var i,r;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){i=f.call(v);r=[];}else if((v+'')==='[object Generator]'){i=v;r=[];};if(S_MARK$0)S_MARK$0(void 0);if(r) {while((f=i['next']()),f['done']!==true)r.push(f['value']);return r;}}throw new Error(v+' is not iterable')};
      var argArray = ITER$0(arguments)
      var lastArg = argArray[argArray.length]
      if (typeof lastArg === 'function') {
        argArray.pop()
        return this(argArray, idFn)
      }
      else {
        throw new Error('Last Argument should be id extraction function: ' + argArray.toString());
      }
    };





  IndexedDoublyLinkedList.prototype['DELETE'] = IndexedDoublyLinkedList.prototype.remove;


  var IS_DOUBLY_LINKED_LIST_SENTINEL = '@@__IMMUTABLE_DOUBLY_LINKED_LIST__@@';
  IndexedDoublyLinkedList.prototype[IS_DOUBLY_LINKED_LIST_SENTINEL] = true;

  var isIndexedDoublyLinkedList = function(maybeIndexedDoublyLinkedList)  {
    return !!(maybeIndexedDoublyLinkedList && maybeIndexedDoublyLinkedList[IS_DOUBLY_LINKED_LIST_SENTINEL]);
  }
  IndexedDoublyLinkedList.isIndexedDoublyLinkedList = isIndexedDoublyLinkedList;




  var makeIndexedDoublyLinkedList = function(map, root, tail, current, ownerID, hash)  {
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

  var EMPTY_INDEXED_DOUBLY_LINKED_LIST;
  var emptyIndexedDoublyLinkedList = function()  {
    return EMPTY_INDEXED_DOUBLY_LINKED_LIST || (EMPTY_INDEXED_DOUBLY_LINKED_LIST = makeIndexedDoublyLinkedList(immutable.Map()));
  }

  exports.IndexedDoublyLinkedList = IndexedDoublyLinkedList;
  exports.emptyIndexedDoublyLinkedList = emptyIndexedDoublyLinkedList;

}));