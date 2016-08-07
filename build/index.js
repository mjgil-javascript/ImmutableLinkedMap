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

  /**
   *  Copyright (c) 2014-2015, Facebook, Inc.
   *  All rights reserved.
   *
   *  This source code is licensed under the BSD-style license found in the
   *  LICENSE file in the root directory of this source tree. An additional grant
   *  of patent rights can be found in the PATENTS file in the same directory.
   */

  function createClass(ctor, superClass) {
    if (superClass) {
      ctor.prototype = Object.create(superClass.prototype);
    }
    ctor.prototype.constructor = ctor;
  }

  createClass(IndexedDoublyLinkedList, immutable.Collection.Keyed);
    // @pragma Construction

    function IndexedDoublyLinkedList(value, idFn) {
      var valueIsNull = value === null || value === undefined
      var emptyList = emptyIndexedDoublyLinkedList()
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

    IndexedDoublyLinkedList.prototype.toString = function() {
      return this.__toString('Doubly Linked List [', ']')
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