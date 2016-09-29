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

  var itemNotFoundError = function(id)  {throw new Error('Item with id: ' + id + ' was not found')}

  createClass(LinkedMap, immutable.Collection.Keyed);
    // @pragma Construction

    // this is a custom constructor that is compiled to a function
    // with the declassify.js file in /resources/declassify.js
    // taken from: https://github.com/facebook/immutable-js/blob/0f88549e3ceeb6a8834709b095105aa5e2922b63/resources/declassify.js
    // look at build to see final output after this and es6-transpilation
    // WARNING: This does not compile with babel
    function LinkedMap(value) {
      var valueIsNull = value === null || value === undefined
      var emptyList = emptyLinkedMap()
      if (valueIsNull) return emptyList
      if (isLinkedMap(value)) return value

      // TODO: use with mutations
      var newList = emptyList
      var iter = immutable.Iterable.Keyed(value)
      assertNotInfinite(iter.size)
      iter.forEach(function(v, k)  {return newList = newList.push(v, k)})

      return newList
    }

    // like Immutable.Map
    LinkedMap.of = function() {var SLICE$0 = Array.prototype.slice;var keyValues = SLICE$0.call(arguments, 0);
      // 1, 'a', 2, 'b', 3, '4'
      var newList = emptyLinkedMap()
      for (var i = 0; i < keyValues.length; i += 2) {
        if (i + 1 >= keyValues.length) {
          throw new Error('Missing value for key: ' + keyValues[i]);
        }
        newList = newList.push(keyValues[i + 1], keyValues[i]);
      }
      return newList
    };

    LinkedMap.prototype.toString = function() {
      return this.__toString('LinkedMap [', ']')
    };

    LinkedMap.prototype.get = function(valueId, notSetValue) {
      // notImplementedError('get')
      var itemId = typeof valueId === 'undefined' ? this._currentItemId : valueId
      var item = getItemById(this._itemsById, itemId)
      if (item) {
        return item.get('value')
      }
      return notSetValue
    };

    LinkedMap.prototype.set = function(valueId, value) {
      return updateValueInItemsById(this, valueId, value)
    };

    LinkedMap.prototype.remove = function(valueId) {
      var item = this._itemsById.get(valueId)
      if (item) {
        return deleteItemFromList(this, item)
      }
      return this
    };

    // List Methods

    // adds to end
    LinkedMap.prototype.push = function(value, key) {
      var item = makeListItem(value, key)
      return pushItemOnList(item, this)
    };

    // adds to end
    LinkedMap.prototype.pushMany = function(value) {
      return this.concat(value)
    };

    // remove to back
    LinkedMap.prototype.pop = function() {
      return this.remove(this._lastItemId)
    };

    LinkedMap.prototype.popMany = function(num) {
      if (num <= 0) return this
      var newList = this
      while (num--) newList = newList.pop()
      return newList
    };

    LinkedMap.prototype.prepend = function(value, key) {
      var item = makeListItem(value, key)
      return prependItemToList(item, this)
    };

    // TODO: use with mutations
    LinkedMap.prototype.unshift = function(value) {
      var newList = this
      var iter = immutable.Iterable.Keyed(value)
      assertNotInfinite(iter.size)
      iter.reverse().forEach(function(v, k)  {return newList = newList.prepend(v, k)})

      return newList
    };

    LinkedMap.prototype.shift = function() {
      return this.remove(this._firstItemId)
    };

    LinkedMap.prototype.concat = function(dlList) {
      // only works when they have unique keys
      var newList = this
      dlList.forEach(function(val, key)  {
        if (newList.get(key)) throw new Error('Cannot concat lists with the same keys')
        newList = newList.push(val, key)
      })
      return newList
    };

    LinkedMap.prototype.swap = function(valueId1, valueId2) {
      var item1 = this._itemsById.get(valueId1)
      var item2 = this._itemsById.get(valueId2)

      if (!item1) itemNotFoundError(valueId1)
      if (!item2) itemNotFoundError(valueId2)

      var item1Next = item1.get('nextItemId')
      var item1Prev = item1.get('prevItemId')
      var item1Value = item1.get('value')
      var item2Next = item2.get('nextItemId')
      var item2Prev = item2.get('prevItemId')
      var item2Value = item2.get('value')
      

      if (valueId1 === this._firstItemId) {
        var newList = this.remove(valueId2)
        newList = newList.prepend(item2.get('value'), valueId2)
        newList = newList.remove(valueId1)
        if (item2Next) return newList.insertBefore(item2Next, item1Value, valueId1)
        return newList.push(item1Value, valueId1)
      }
      else if (valueId2 === this._firstItemId) {
        var newList$0 = this.remove(valueId1)
        newList$0 = newList$0.prepend(item1Value, valueId1)
        newList$0 = newList$0.remove(valueId2)
        if (item1Next) return newList$0.insertBefore(item1Next, item2Value, valueId2)
        return newList$0.push(item2Value, valueId2)
      }
      else if (valueId1 === this._lastItemId) {
        var newList$1 = this.remove(valueId2)
        newList$1 = newList$1.push(item2.get('value'), valueId2)
        newList$1 = newList$1.remove(valueId1)
        if (item2Prev) return newList$1.insertAfter(item2Prev, item1Value, valueId1)
        return newList$1.prepend(item1Value, valueId1)
      }
      else if (valueId2 === this._lastItemId) {
        var newList$2 = this.remove(valueId1)
        newList$2 = newList$2.push(item1Value, valueId1)
        newList$2 = newList$2.remove(valueId2)
        if (item1Prev) return newList$2.insertAfter(item1Prev, item2Value, valueId2)
        return newList$2.prepend(item2Value, valueId2)
      }
      else if (item1.get('nextItemId') !== valueId2) {
        var newList$3 = this.remove(valueId2)
        newList$3 = newList$3.insertBefore(item1.get('nextItemId'), item2.get('value'), valueId2)
        newList$3 = newList$3.remove(valueId1)
        return newList$3.insertAfter(item2.get('prevItemId'), item1Value, valueId1)
      }
      else if (item2.get('nextItemId') !== valueId1) {
        var newList$4 = this.remove(valueId1)
        newList$4 = newList$4.insertBefore(item2.get('nextItemId'), item1Value, valueId1)
        newList$4 = newList$4.remove(valueId2)
        return newList$4.insertAfter(item1.get('prevItemId'), item2.get('value'), valueId2)
      }

      throw new Error('Swap case not handled -- ' + valueId1 + ' ' + valueId2)
    };

    LinkedMap.prototype.insertAfter = function(afterId, value, key) {
      var afterItem = this._itemsById.get(afterId)
      if (!afterItem) itemNotFoundError(afterId)
      if (afterId === this._lastItemId) return this.push(value, key)
      var newItem = makeListItem(value, key)
      return insertItemAfterItem(this, afterItem, newItem)
    };

    LinkedMap.prototype.insertManyAfter = function(afterId, value) {
      var newList = this
      var lastId = afterId
      value.forEach(function(val, key)  {
        if (newList.get(key)) throw new Error('Error with .insertManyAfer, cannot insert item with the same key: ' + key)
        newList = newList.insertAfter(lastId, val, key)
        lastId = key
      })
      return newList
    };

    LinkedMap.prototype.insertBefore = function(beforeId, value, key) {
      var beforeItem = this._itemsById.get(beforeId)
      if (!beforeItem) itemNotFoundError(beforeId)
      if (beforeId === this._firstItemId) return this.prepend(value, key)
      var newItem = makeListItem(value, key)
      return insertItemBeforeItem(this, beforeItem, newItem)
    };


    LinkedMap.prototype.getBetween = function(valueId1, valueId2, includeStart, includeEnd) {
      var item1 = this._itemsById.get(valueId1)
      var item2 = this._itemsById.get(valueId2)

      if (!item1) itemNotFoundError(valueId1)
      if (!item2) itemNotFoundError(valueId2)

      var newList = emptyLinkedMap()
      var iter = iterateList(this)
      var obj = iter.next()

      var aggregationStarted = false
      while (!obj.done) {
        var item = obj.value
        var id = obj.key
      
        if (id === valueId1 || id === valueId2) {
          if (!aggregationStarted) {
            if (includeStart) newList = newList.push(item.get('value'), id)          
            aggregationStarted = true
          }
          else {
            if (includeEnd) newList = newList.push(item.get('value'), id)
            break
          }
        }
        else {
          if (aggregationStarted) {
            newList = newList.push(item.get('value'), id)
          }
        }
        obj = iter.next()
      }
      return newList;
    };

    LinkedMap.prototype.getAfter = function(valueId) {
      var item = this._itemsById.get(valueId)
      var nextItemId = item.get('nextItemId')
      return this.get(nextItemId)
    };

    LinkedMap.prototype.getBefore = function(valueId) {
      var item = this._itemsById.get(valueId)
      var prevItemId = item.get('prevItemId')
      return this.get(prevItemId)
    };

    LinkedMap.prototype.reverse = function() {
      var newItemsById = immutable.Map()
      this._itemsById.forEach(function(item)  {
        var itemNext = item.get('nextItemId')
        var itemPrev = item.get('prevItemId')

        var newItem = item
        newItem = newItem.set('nextItemId', itemPrev)
        newItem = newItem.set('prevItemId', itemNext)

        newItemsById = newItemsById.set(item.get('id'), newItem)
      })

      return makeLinkedMap(newItemsById, this._lastItemId, this._firstItemId, 
        this._currentItemId, this._idFn, this.__ownerID, this.__hash)
    };

    LinkedMap.prototype.first = function() {
      return this.get(this._firstItemId)
    };

    LinkedMap.prototype.last = function() {
      return this.get(this._lastItemId)
    };

    LinkedMap.prototype.deleteBetween = function(valueId1, valueId2, deleteStart, deleteEnd) {
      var item1 = this._itemsById.get(valueId1)
      var item2 = this._itemsById.get(valueId2)

      if (!item1) itemNotFoundError(valueId1)
      if (!item2) itemNotFoundError(valueId2)

      var newList = emptyLinkedMap()
      var iter = iterateList(this)
      var obj = iter.next()

      var aggregationStopped = false
      while (!obj.done) {
        var item = obj.value
        var id = obj.key
      
        if (id === valueId1 || id === valueId2) {
          if (!aggregationStopped) {
            aggregationStopped = true
            if (deleteStart) {
              obj = iter.next()
              continue
            }
            newList = newList.push(item.get('value'), id)
          }
          else {
            aggregationStopped = false
            if (deleteEnd) {
              obj = iter.next()
              continue
            }
            newList = newList.push(item.get('value'), id)
          }
        }
        else {
          if (!aggregationStopped) {
            newList = newList.push(item.get('value'), id)
          }
        }
        obj = iter.next()
      }
      return newList
    };

    // moves to next
    LinkedMap.prototype.next = function() {
      if (!this._currentItemId) return this
      var item = this._itemsById.get(this._currentItemId)
      if (item) {
        var nextItemId = item.get('nextItemId')
        return updateCurrentItemId(this, nextItemId)
      }
      else {
        throw new Error('._currentItemId points to id that does not exist: ' + this._currentItemId)
      }
    };

    // moves to prev
    LinkedMap.prototype.prev = function() {
      if (!this._currentItemId) return this
      var item = this._itemsById.get(this._currentItemId)
      if (item) {
        var prevItemId = item.get('prevItemId')
        return updateCurrentItemId(this, prevItemId)
      }
      else {
        throw new Error('._currentItemId points to id that does not exist: ' + this._currentItemId)
      }
    };

    LinkedMap.prototype.moveTo = function(valueId) {
      var item = this._itemsById.get(valueId)
      if (item) return updateCurrentItemId(this, valueId)
      return this
    };

    LinkedMap.prototype.moveToStart = function() {
      if (!this._firstItemId) return this
      return updateCurrentItemId(this, this._firstItemId)
    };

    LinkedMap.prototype.moveToEnd = function() {
      if (!this._lastItemId) return this
      return updateCurrentItemId(this, this._lastItemId)
    };

    LinkedMap.prototype.equals = function(linked2) {
      if (!isLinkedMap(linked2)) return false
      return this._itemsById.equals(linked2._itemsById)
    };

    LinkedMap.prototype.clear = function() {
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
      return emptyLinkedMap();
    };

    LinkedMap.prototype.toJS = function() {
      return this.reduce(function(arr, val, key)  {
        arr.push([key, (typeof val.toJS === 'function' ? val.toJS() : val)])
        return arr
      }, [])
    };

    LinkedMap.prototype.copy = function() {
      return makeCopy(this)
    };

    LinkedMap.prototype.__iterator = function(type, reverse) {
      var iter = iterateList(this, reverse);
      return new Iterator(function()  {
        var obj = iter.next();
        return obj.done ?
          iteratorDone() :
          iteratorValue(type, obj.key, obj.value.get('value'));
      });
    };

    LinkedMap.prototype.__iterate = function(fn, reverse) {
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

    LinkedMap.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeLinkedMap(this._itemsById, this._firstItemId, this._lastItemId, 
        this._currentItemId, this._idFn, ownerID, this.__hash)
    };



  var getItemById = function(itemsById, itemId)  {
    return itemsById.get(itemId)
  }

  var insertItemBeforeItem = function(dlList, beforeItem, newItem)  {
    var newItemId = newItem.get('id')
    var beforeItemId = beforeItem.get('id')

    var beforeItemPrevId = beforeItem.get('prevItemId')

    var newBeforeItem = setFieldOnItem(beforeItem, 'prevItemId', newItemId)
    var newPrevItem = dlList._itemsById.get(beforeItemPrevId)
    newPrevItem = setFieldOnItem(newPrevItem, 'nextItemId', newItemId)

    newItem = setFieldOnItem(newItem, 'prevItemId', beforeItemPrevId)
    newItem = setFieldOnItem(newItem, 'nextItemId', beforeItemId)

    var newItemsById = dlList._itemsById.set(newItemId, newItem)
    newItemsById = newItemsById.set(beforeItemPrevId, newPrevItem)
    newItemsById = newItemsById.set(beforeItemId, newBeforeItem)
    return updateItemsById(dlList, newItemsById)
  }

  var insertItemAfterItem = function(dlList, afterItem, newItem)  {
    var newItemId = newItem.get('id')
    var afterItemId = afterItem.get('id')

    var afterItemNextId = afterItem.get('nextItemId')

    var newAfterItem = setFieldOnItem(afterItem, 'nextItemId', newItemId)
    var newNextItem = dlList._itemsById.get(afterItemNextId)
    newNextItem = setFieldOnItem(newNextItem, 'prevItemId', newItemId)

    newItem = setFieldOnItem(newItem, 'nextItemId', afterItemNextId)
    newItem = setFieldOnItem(newItem, 'prevItemId', afterItemId)

    var newItemsById = dlList._itemsById.set(newItemId, newItem)
    newItemsById = newItemsById.set(afterItemNextId, newNextItem)
    newItemsById = newItemsById.set(afterItemId, newAfterItem)
    return updateItemsById(dlList, newItemsById)
  }

  var updateValueInItemsById = function(dlList, itemId, value)  {
    var item = dlList._itemsById.get(itemId)
    var newItem = setFieldOnItem(item, 'value', value)
    var newItemsById = dlList._itemsById.set(itemId, newItem)
    return updateItemsById(dlList, newItemsById)
  }

  var updateItemsById = function(dlList, newItemsById)  {
    return makeLinkedMap(newItemsById, dlList._firstItemId, dlList._lastItemId, 
      dlList._currentItemId, dlList._idFn, dlList.__ownerID, dlList.__hash)
  }

  var updateCurrentItemId = function(dlList, currentItemId)  {
    return makeLinkedMap(dlList._itemsById, dlList._firstItemId, dlList._lastItemId, 
      currentItemId, dlList._idFn, dlList.__ownerID, dlList.__hash)
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

  var LinkedMapPrototype = LinkedMap.prototype
  LinkedMapPrototype[DELETE] = LinkedMapPrototype.remove;
  LinkedMapPrototype[IS_DOUBLY_LINKED_LIST_SENTINEL] = true;


  // adding to Prototype so that subclassing works
  var MapPrototype = immutable.Map.prototype
  LinkedMapPrototype.setIn = MapPrototype.setIn;
  LinkedMapPrototype.deleteIn =
  LinkedMapPrototype.removeIn = MapPrototype.removeIn;
  LinkedMapPrototype.update = MapPrototype.update;
  LinkedMapPrototype.updateIn = MapPrototype.updateIn;
  LinkedMapPrototype.mergeIn = MapPrototype.mergeIn;
  LinkedMapPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  LinkedMapPrototype.withMutations = MapPrototype.withMutations;
  LinkedMapPrototype.asMutable = MapPrototype.asMutable;
  LinkedMapPrototype.asImmutable = MapPrototype.asImmutable;
  LinkedMapPrototype.wasAltered = MapPrototype.wasAltered;

  var isLinkedMap = function(maybeLinkedMap)  {
    return !!(maybeLinkedMap && maybeLinkedMap[IS_DOUBLY_LINKED_LIST_SENTINEL]);
  }
  LinkedMap.isLinkedMap = isLinkedMap;

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
    
    return makeLinkedMap(newItemsById, newFirstItemId, newLastItemId, 
      newCurrentItemId, dlList._idFn, dlList.__ownerID, dlList.__hash)
  }

  var addNewItemAtEndOfList = function(itemsById, lastItemId, item)  {
    var itemId = item.get('id')
    var newItemsById = itemsById.setIn([lastItemId, 'nextItemId'], itemId)
    
    var newItem = setFieldOnItem(item, 'prevItemId', lastItemId)
    newItemsById = newItemsById.set(itemId, newItem)
    
    return newItemsById
  }

  var addNewItemAtFrontOfList = function(itemsById, firstItemId, item)  {
    var itemId = item.get('id')
    var newItemsById = itemsById.setIn([firstItemId, 'prevItemId'], itemId)
    
    var newItem = setFieldOnItem(item, 'nextItemId', firstItemId)
    newItemsById = newItemsById.set(itemId, newItem)
    
    return newItemsById
  }

  var pushItemOnList = function(item, dlList)  {
    var _firstItemId = dlList._firstItemId, _lastItemId = dlList._lastItemId, _itemsById = dlList._itemsById
    var itemId = item.get('id')
    // handle empty list
    if (!_firstItemId && !_lastItemId) {
      var newItemsById = _itemsById.set(itemId, item)
      return makeLinkedMap(newItemsById, itemId, itemId, 
        itemId, dlList._idFn, dlList.__ownerID, dlList.__hash)
    }
    else if (_lastItemId) {
      var newItemsById$0 = addNewItemAtEndOfList(_itemsById, _lastItemId, item)
      return makeLinkedMap(newItemsById$0, _firstItemId, itemId, 
        dlList._currentItemId, dlList._idFn, dlList.__ownerID, dlList.__hash)
    }
    else {
      throw new Error('End of List Not Found')
    }

    return dlList
  }

  var prependItemToList = function(item, dlList)  {
    var _firstItemId = dlList._firstItemId, _lastItemId = dlList._lastItemId, _itemsById = dlList._itemsById
    var itemId = item.get('id')
    // handle empty list
    if (!_firstItemId && !_lastItemId) {
      var newItemsById = _itemsById.set(itemId, item)
      return makeLinkedMap(newItemsById, itemId, itemId, 
        itemId, dlList._idFn, dlList.__ownerID, dlList.__hash)
    }
    else if (_firstItemId) {
      var newItemsById$1 = addNewItemAtFrontOfList(_itemsById, _firstItemId, item)
      return makeLinkedMap(newItemsById$1, itemId, _lastItemId, 
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

  // item methods
  var setFieldOnItem = function(item, fieldName, fieldValue)  {
    return item.set(fieldName, fieldValue)
  }

  // factory pattern
  var makeLinkedMap = function(itemsById, firstItemId, lastItemId, currentItemId, idFn, ownerID, hash)  {
    var dlList = Object.create(LinkedMap.prototype);
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

  var makeCopy = function(dlList)  {
    return makeLinkedMap(dlList._itemsById, dlList._firstItemId, dlList._lastItemId, 
        dlList._currentItemId, dlList._idFn, dlList._ownerID, dlList.__hash)
  }

  // singleton pattern
  var EMPTY_LINKED_MAP;
  var emptyLinkedMap = function()  {
    return EMPTY_LINKED_MAP || (EMPTY_LINKED_MAP = makeLinkedMap(immutable.Map()));
  }

  exports.LinkedMap = LinkedMap;
  exports.LinkedMapPrototype = LinkedMapPrototype;
  exports.emptyLinkedMap = emptyLinkedMap;

}));