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

  /**
   *  Copyright (c) 2014-2015, Facebook, Inc.
   *  All rights reserved.
   *
   *  This source code is licensed under the BSD-style license found in the
   *  LICENSE file in the root directory of this source tree. An additional grant
   *  of patent rights can be found in the PATENTS file in the same directory.
   */

  /* global Symbol */

  var ITERATE_KEYS = 0;
  var ITERATE_VALUES = 1;
  var ITERATE_ENTRIES = 2;

  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';

  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;


  function Iterator(next) {
      this.next = next;
    }

    Iterator.prototype.toString = function() {
      return '[Iterator]';
    };


  Iterator.KEYS = ITERATE_KEYS;
  Iterator.VALUES = ITERATE_VALUES;
  Iterator.ENTRIES = ITERATE_ENTRIES;

  Iterator.prototype.inspect =
  Iterator.prototype.toSource = function () { return this.toString(); }
  Iterator.prototype[ITERATOR_SYMBOL] = function () {
    return this;
  };


  function iteratorValue(type, k, v, iteratorResult) {
    var value = type === 0 ? k : type === 1 ? v : [k, v];
    iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {
      value: value, done: false
    });
    return iteratorResult;
  }

  function iteratorDone() {
    return { value: undefined, done: true };
  }

  console.log('Map', immutable.Map)

  var notImplementedError = function(name)  {throw new Error(name + ': Method Not Implemented')}
  createClass(IndexedDoublyLinkedList, immutable.Collection.Indexed);
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

    IndexedDoublyLinkedList.prototype.get = function(valueId, notSetValue) {
      // notImplementedError('get')
      var item = getItemById(this._itemsById, valueId)
      if (item) {
        return item.get('value')
      }
      return notSetValue
    };

    IndexedDoublyLinkedList.prototype.set = function(valueId, value) {
      return updateValueInItemsById(this, valueId, value)
    };

    IndexedDoublyLinkedList.prototype.remove = function() {
      notImplementedError('remove')
    };

    // List Methods

    // adds to end
    IndexedDoublyLinkedList.prototype.push = function(value, key) {
      var item = makeListItem(value, key)
      return pushItemOnList(item, this)
    };

    // adds to back
    IndexedDoublyLinkedList.prototype.pop = function() {
      notImplementedError('pop')
    };

    IndexedDoublyLinkedList.prototype.unshift = function() {
      notImplementedError('unshift')
    };

    IndexedDoublyLinkedList.prototype.shift = function() {
      notImplementedError('shift')
    };

    IndexedDoublyLinkedList.prototype.swap = function() {
      notImplementedError('swap')
    };

    IndexedDoublyLinkedList.prototype.insertAfter = function() {
      notImplementedError('insertAfter')
    };

    IndexedDoublyLinkedList.prototype.insertBefore = function() {
      notImplementedError('insertBefore')
    };

    IndexedDoublyLinkedList.prototype.getBetween = function() {
      notImplementedError('getBetween')
    };

    IndexedDoublyLinkedList.prototype.deleteBetween = function() {
      notImplementedError('deleteBetween')
    };

    IndexedDoublyLinkedList.prototype.moveToStart = function() {
      notImplementedError('moveToStart')
    };

    IndexedDoublyLinkedList.prototype.moveToEnd = function() {
      notImplementedError('moveToEnd')
    };

    IndexedDoublyLinkedList.prototype.moveToNext = function() {
      notImplementedError('moveToNext')
    };

    IndexedDoublyLinkedList.prototype.moveToPrev = function() {
      notImplementedError('moveToPrev')
    };

    IndexedDoublyLinkedList.prototype.moveTo = function() {
      notImplementedError('moveTo')
    };

    IndexedDoublyLinkedList.prototype.clear = function() {
      notImplementedError('clear')
    };

    IndexedDoublyLinkedList.prototype.__iterator = function(type, reverse) {
      console.log('__iterator', type, reverse)
      var iter = iterateList(this, reverse);
      return new Iterator(function()  {
        var obj = iter.next();
        return obj.done ?
          iteratorDone() :
          iteratorValue(type, obj.key, obj.value.get('value'));
      });
    };

    IndexedDoublyLinkedList.prototype.__iterate = function(fn, reverse) {
      var iter = iterateList(this, reverse);
      var obj = iter.next();
      while (!obj.done) {
        if (fn(obj.value.get('value'), obj.key, this) === false) {
          break;
        }
        obj = iter.next()
      }
      return null;
    };

    IndexedDoublyLinkedList.prototype.__ensureOwner = function() {
      notImplementedError('__ensureOwner')
    };



  var getItemById = function(itemsById, itemId)  {
    return itemsById.get(itemId)
  }

  var updateValueInItemsById = function(dlList, itemId, value)  {
    var item = dlList._itemsById.get(itemId)
    var newItem = setValueOnItem(value, item)
    var newItemsById = dlList._itemsById.set(itemId, newItem)
    return makeIndexedDoublyLinkedList(newItemsById, dlList._firstItemId, dlList._lastItemId, 
      dlList._currentItemId, dlList._idFn, dlList.__ownerID, dlList.__hash)
  }

  var iterateList = function(dlList, reverse)  {
    var itemsById = dlList._itemsById
    var nextItemId;
    if (!reverse) {
      nextItemId = dlList._firstItemId

      return {
        next: function()  {
          var item = itemsById.get(nextItemId)
          var iterObj = { value: item, key: nextItemId, done: !item }
          nextItemId = item ? item.get('nextItemId') : null
          return iterObj
        }
      }
    }
    else {
      nextItemId = dlList._lastItemId

      return {
        next: function()  {
          var item = itemsById.get(itemId)
          var iterObj = { value: item, key: nextItemId, done: !item }
          nextItemId = item ? item.get('prevItemId') : null
          return iterObj
        }
      }
    }

  }

  var IS_DOUBLY_LINKED_LIST_SENTINEL = '@@__IMMUTABLE_DOUBLY_LINKED_LIST__@@';

  var IndexedDoublyLinkedListPrototype = IndexedDoublyLinkedList.prototype
  IndexedDoublyLinkedListPrototype['DELETE'] = IndexedDoublyLinkedListPrototype.remove;
  IndexedDoublyLinkedListPrototype[IS_DOUBLY_LINKED_LIST_SENTINEL] = true;

  var MapPrototype = immutable.Map.prototype
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

  var isIndexedDoublyLinkedList = function(maybeIndexedDoublyLinkedList)  {
    return !!(maybeIndexedDoublyLinkedList && maybeIndexedDoublyLinkedList[IS_DOUBLY_LINKED_LIST_SENTINEL]);
  }
  IndexedDoublyLinkedList.isIndexedDoublyLinkedList = isIndexedDoublyLinkedList;

  var makeListItem = function(value, key)  {
    var item = immutable.Map({
      id: key,
      prevItemId: null,
      nextItemId: null,
      value: value
    })

    return item
  }

  var addNewItemAtEndOfList = function(itemsById, prevItemId, item)  {
    var itemId = item.get('id')
    var newItemsById = itemsById.setIn([prevItemId, 'nextItemId'], itemId)
    
    var newItem = setPrevItemIdOnItem(prevItemId, item)
    newItemsById = newItemsById.set(itemId, item)
    
    return newItemsById
  }

  var pushItemOnList = function(item, dlList)  {
    var _firstItemId = dlList._firstItemId, _lastItemId = dlList._lastItemId, _itemsById = dlList._itemsById
    var itemId = item.get('id')
    // handle empty list
    if (!_firstItemId && !_lastItemId) {
      var newItemsById = _itemsById.set(itemId, item)
      return makeIndexedDoublyLinkedList(newItemsById, itemId, itemId, 
        dlList._currentItemId, dlList._idFn, dlList.__ownerID, dlList.__hash)
    }
    else if (_lastItemId) {
      var newItemsById$0 = addNewItemAtEndOfList(_itemsById, _lastItemId, item)
      return makeIndexedDoublyLinkedList(newItemsById$0, _firstItemId, itemId, 
        dlList._currentItemId, dlList._idFn, dlList.__ownerID, dlList.__hash)
    }
    else {
      throw new Error('End of List Not Found')
    }

    return dlList
  }

  var setPrevItemIdOnItem = function(prevItemId, item)  {
    return item.set('prevItemId', prevItemId)
  }

  var setValueOnItem = function(value, item)  {
    return item.set('value', value)
  }

  // factory pattern
  var makeIndexedDoublyLinkedList = function(itemsById, firstItemId, lastItemId, currentItemId, idFn, ownerID, hash)  {
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
  var EMPTY_INDEXED_DOUBLY_LINKED_LIST;
  var emptyIndexedDoublyLinkedList = function()  {
    return EMPTY_INDEXED_DOUBLY_LINKED_LIST || (EMPTY_INDEXED_DOUBLY_LINKED_LIST = makeIndexedDoublyLinkedList(immutable.Map()));
  }

  exports.IndexedDoublyLinkedList = IndexedDoublyLinkedList;
  exports.IndexedDoublyLinkedListPrototype = IndexedDoublyLinkedListPrototype;
  exports.emptyIndexedDoublyLinkedList = emptyIndexedDoublyLinkedList;

}));