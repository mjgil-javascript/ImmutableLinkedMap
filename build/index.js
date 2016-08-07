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

  /**
   *  Copyright (c) 2014-2015, Facebook, Inc.
   *  All rights reserved.
   *
   *  This source code is licensed under the BSD-style license found in the
   *  LICENSE file in the root directory of this source tree. An additional grant
   *  of patent rights can be found in the PATENTS file in the same directory.
   */

  function invariant(condition, error) {
    if (!condition) throw new Error(error);
  }

  function assertNotInfinite(size) {
    invariant(
      size !== Infinity,
      'Cannot perform this action with an infinite size.'
    );
  }

  var notImplementedError = function(name)  {throw new Error(name + ': Method Not Implemented')}

  createClass(IndexedDoublyLinkedList, immutable.Collection.Keyed);
    // @pragma Construction

    // this is a custom constructor that is compiled to a function
    // with the declassify.js file in /resources/declassify.js
    // taken from: https://github.com/facebook/immutable-js/blob/0f88549e3ceeb6a8834709b095105aa5e2922b63/resources/declassify.js
    // look at build to see final output after this and es6-transpilation
    // WARNING: This does not compile with babel
    function IndexedDoublyLinkedList(value) {
      var valueIsNull = value === null || value === undefined
      var emptyList = emptyIndexedDoublyLinkedList()
      if (valueIsNull) return emptyList
      if (isIndexedDoublyLinkedList(value)) return value

      var newList = emptyList
      var iter = immutable.Iterable.Keyed(value)
      assertNotInfinite(iter.size)
      iter.forEach(function(v, k)  {return newList = newList.push(v, k)})

      return newList
    }

    // like Immutable.Map
    IndexedDoublyLinkedList.of = function() {var SLICE$0 = Array.prototype.slice;var keyValues = SLICE$0.call(arguments, 0);
      // 1, 'a', 2, 'b', 3, '4'
      var newList = emptyIndexedDoublyLinkedList()
      for (var i = 0; i < keyValues.length; i += 2) {
        if (i + 1 >= keyValues.length) {
          throw new Error('Missing value for key: ' + keyValues[i]);
        }
        newList = newList.push(keyValues[i + 1], keyValues[i]);
      }
      return newList
    };

    IndexedDoublyLinkedList.prototype.toString = function() {
      return this.__toString('Doubly Linked List [', ']')
    };

    IndexedDoublyLinkedList.prototype.get = function(valueId, notSetValue) {
      // notImplementedError('get')
      var itemId = valueId || this._currentItemId
      var item = getItemById(this._itemsById, itemId)
      if (item) {
        return item.get('value')
      }
      return notSetValue
    };

    IndexedDoublyLinkedList.prototype.set = function(valueId, value) {
      return updateValueInItemsById(this, valueId, value)
    };

    IndexedDoublyLinkedList.prototype.remove = function(valueId) {
      var item = this._itemsById.get(valueId)
      if (item) {
        return deleteItemFromList(this, item)
      }
      return this
    };

    // List Methods

    // adds to end
    IndexedDoublyLinkedList.prototype.push = function(value, key) {
      var item = makeListItem(value, key)
      return pushItemOnList(item, this)
    };

    // adds to back
    IndexedDoublyLinkedList.prototype.pop = function() {
      return this.remove(this._lastItemId)
    };

    IndexedDoublyLinkedList.prototype.unshift = function() {
      notImplementedError('unshift')
    };

    IndexedDoublyLinkedList.prototype.shift = function() {
      return this.remove(this._firstItemId)
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

    IndexedDoublyLinkedList.prototype.getNext = function() {
      notImplementedError('getNext')
    };

    IndexedDoublyLinkedList.prototype.getPrev = function() {
      notImplementedError('getPrev')
    };

    IndexedDoublyLinkedList.prototype.deleteBetween = function() {
      notImplementedError('deleteBetween')
    };

    // moves to next
    IndexedDoublyLinkedList.prototype.next = function() {
      notImplementedError('moveToNext')
    };

    // moves to prev
    IndexedDoublyLinkedList.prototype.prev = function() {
      notImplementedError('moveToPrev')
    };

    IndexedDoublyLinkedList.prototype.moveTo = function(valueId) {
      notImplementedError('moveTo')
    };

    IndexedDoublyLinkedList.prototype.moveToStart = function() {
      notImplementedError('moveToStart')
    };

    IndexedDoublyLinkedList.prototype.moveToEnd = function() {
      notImplementedError('moveToEnd')
    };

    IndexedDoublyLinkedList.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._itemsById = immutable.Map();
        this._firstItemId = undefined
        this._lastItemId = undefined
        this._currentItemId = undefined
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyIndexedDoublyLinkedList();
    };

    IndexedDoublyLinkedList.prototype.__iterator = function(type, reverse) {
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

    IndexedDoublyLinkedList.prototype.__ensureOwner = function(ownerID) {
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
          var item = itemsById.get(nextItemId)
          var iterObj = { value: item, key: nextItemId, done: !item }
          nextItemId = item ? item.get('prevItemId') : null
          return iterObj
        }
      }
    }

  }

  // Used for setting prototype methods that IE8 chokes on.
  var DELETE = 'delete';
  var IS_DOUBLY_LINKED_LIST_SENTINEL = '@@__IMMUTABLE_DOUBLY_LINKED_LIST__@@';

  var IndexedDoublyLinkedListPrototype = IndexedDoublyLinkedList.prototype
  IndexedDoublyLinkedListPrototype[DELETE] = IndexedDoublyLinkedListPrototype.remove;
  IndexedDoublyLinkedListPrototype[IS_DOUBLY_LINKED_LIST_SENTINEL] = true;


  // adding to Prototype so that subclassing works
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

  var deleteItemFromList = function(dlList, item)  {
    var itemId = item.get('id')
    var newItemsById = dlList._itemsById.delete(itemId)

    var itemNext = item.get('nextItemId')
    var itemPrev = item.get('prevItemId')

    // update the previous item's 'next' field
    // to point to the deleted item's 'next' field
    if (itemPrev) newItemsById = setFieldOnItemInMap(newItemsById, itemPrev, 'nextItemId', itemNext)

    // update the next item's 'prev' field
    // to point to the deleted item's 'prev' field
    if (itemNext) newItemsById = setFieldOnItemInMap(newItemsById, itemNext, 'prevItemId', itemPrev)


    // handle deleted cursor

    // update _lastItemId pointer
    var newLastItemId = dlList._lastItemId === itemId ? itemPrev : dlList._lastItemId

    // update _firstItemId pointer
    var newFirstItemId = dlList._firstItemId === itemId ? itemNext : dlList._firstItemId
    
    // update _currentItemId pointer
    var newCurrentItemId = dlList._currentItemId === itemId ? undefined : dlList._currentItemId
    
    return makeIndexedDoublyLinkedList(newItemsById, newFirstItemId, newLastItemId, 
      newCurrentItemId, dlList._idFn, dlList.__ownerID, dlList.__hash)
  }

  var addNewItemAtEndOfList = function(itemsById, prevItemId, item)  {
    var itemId = item.get('id')
    var newItemsById = itemsById.setIn([prevItemId, 'nextItemId'], itemId)
    
    var newItem = setPrevItemIdOnItem(prevItemId, item)
    newItemsById = newItemsById.set(itemId, newItem)
    
    return newItemsById
  }

  var pushItemOnList = function(item, dlList)  {
    var _firstItemId = dlList._firstItemId, _lastItemId = dlList._lastItemId, _itemsById = dlList._itemsById
    var itemId = item.get('id')
    // handle empty list
    if (!_firstItemId && !_lastItemId) {
      var newItemsById = _itemsById.set(itemId, item)
      return makeIndexedDoublyLinkedList(newItemsById, itemId, itemId, 
        itemId, dlList._idFn, dlList.__ownerID, dlList.__hash)
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


  // itemsById methods
  var setFieldOnItemInMap = function(map, itemId, fieldName, fieldValue)  {
    return map.setIn([itemId, fieldName], fieldValue)
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