

export module LinkedMap {

  /**
  * True if the provided value is a List
  */
  function isLinkedMap(maybeLinkedMap: any): boolean;

  /**
  * Creates a new List containing `values`.
  */
  function of<T>(...values: T[]): LinkedMap<any, any>;
}

  export module Iterable {
    export interface Keyed<K, V>{}
  }

  export module Collection {
    export interface Keyed<K, V>{}
  }
  /**
   * Create a new immutable List containing the values of the provided
   * iterable-like.
   */
  export function LinkedMap<K, V>(): LinkedMap<K, V>;
  export function LinkedMap<K, V>(iter: Iterable.Indexed<V>): LinkedMap<number, V>;
  export function LinkedMap<K, V>(iter: Iterable.Set<V>): LinkedMap<K, V>;
  export function LinkedMap<K, V>(iter: Iterable.Keyed<K, V>): LinkedMap<K, V>;
  export function LinkedMap<K, V>(array: Array<any>): LinkedMap<K, V>;
  export function LinkedMap<K, V>(iterator: Iterator<V>): LinkedMap<number, V>;
  export function LinkedMap<K, V>(iterable: /*Iterable<T>*/Object): LinkedMap<K, V>;


export interface LinkedMap<K, V> extends Collection.Keyed<K, V> {
  delete(key: K): LinkedMap<K, V>;
  remove(key: K): LinkedMap<K, V>;
  toString(key: K): string;
  get(key: K, notSetValue?:V): V;
  set(key: K, value:V): LinkedMap<K, V>;
  push(value: V, key: K): LinkedMap<K, V>;
  pushMany(value: V): LinkedMap<K, V>;
  pop(): LinkedMap<K, V>;
  popMany(num: number): LinkedMap<K, V>;
  prepend(value: V, key: K): LinkedMap<K, V>;
  unshift(value: V): LinkedMap<K, V>;
  shift(): LinkedMap<K, V>;
  concat(value: LinkedMap<K, V>): LinkedMap<K, V>;
  swap(key1: K, key2: K): LinkedMap<K, V>;
  insertAfter(key: K, value: V, key2: K): LinkedMap<K, V>;
  insertManyAfter(afterKey: K, value: Array<V>): LinkedMap<K, V>;
  insertBefore(beforeKey: K, value: V, key: K): LinkedMap<K, V>;
  getAfter(key: K): LinkedMap<K, V>;
  getBetween(startKey: K, endKey: K, includeStart?: boolean, includeEnd?: boolean): LinkedMap<K, V>;
  getBefore(key: K): LinkedMap<K, V>;
  reverse(): LinkedMap<K, V>;
  first(): V;
  last(): V;
  deleteBetween(startKey: K, endKey: K, includeStart?: boolean, includeEnd?: boolean): LinkedMap<K, V>;
  next(): LinkedMap<K, V>;
  prev(): LinkedMap<K, V>;
  moveTo(key: K): LinkedMap<K, V>;
  moveToStart(): LinkedMap<K, V>;
  moveToEnd(): LinkedMap<K, V>;
  equals(linkedMap: LinkedMap<K, V>): boolean;
  clear(): LinkedMap<K, V>;
  toJS(): [];
  copy(): LinkedMap<K, V>;
}

/**
   * The `Iterable` is a set of (key, value) entries which can be iterated, and
   * is the base class for all collections in `immutable`, allowing them to
   * make use of all the Iterable methods (such as `map` and `filter`).
   *
   * Note: An iterable is always iterated in the same order, however that order
   * may not always be well defined, as is the case for the `Map` and `Set`.
   */
    module Iterable {
    /**
     * True if `maybeIterable` is an Iterable, or any of its subclasses.
     */
    function isIterable(maybeIterable: any): boolean;

    /**
     * True if `maybeKeyed` is an Iterable.Keyed, or any of its subclasses.
     */
    function isKeyed(maybeKeyed: any): boolean;

    /**
     * True if `maybeIndexed` is a Iterable.Indexed, or any of its subclasses.
     */
    function isIndexed(maybeIndexed: any): boolean;

    /**
     * True if `maybeAssociative` is either a keyed or indexed Iterable.
     */
    function isAssociative(maybeAssociative: any): boolean;

    /**
     * True if `maybeOrdered` is an Iterable where iteration order is well
     * defined. True for Iterable.Indexed as well as OrderedMap and OrderedSet.
     */
    function isOrdered(maybeOrdered: any): boolean;


    /**
     * Keyed Iterables have discrete keys tied to each value.
     *
     * When iterating `Iterable.Keyed`, each iteration will yield a `[K, V]`
     * tuple, in other words, `Iterable#entries` is the default iterator for
     * Keyed Iterables.
     */
    export module Keyed {}

    /**
     * Creates an Iterable.Keyed
     *
     * Similar to `Iterable()`, however it expects iterable-likes of [K, V]
     * tuples if not constructed from a Iterable.Keyed or JS Object.
     */
    export function Keyed<K, V>(iter: Iterable.Keyed<K, V>): Iterable.Keyed<K, V>;
    export function Keyed<K, V>(iter: Iterable<any, /*[K,V]*/any>): Iterable.Keyed<K, V>;
    export function Keyed<K, V>(array: Array</*[K,V]*/any>): Iterable.Keyed<K, V>;
    export function Keyed<V>(obj: {[key: string]: V}): Iterable.Keyed<string, V>;
    export function Keyed<K, V>(iterator: Iterator</*[K,V]*/any>): Iterable.Keyed<K, V>;
    export function Keyed<K, V>(iterable: /*Iterable<[K,V]>*/Object): Iterable.Keyed<K, V>;

    export interface Keyed<K, V> extends Iterable<K, V> {

      /**
       * Returns Seq.Keyed.
       * @override
       */
      toSeq(): Seq.Keyed<K, V>;


      // Sequence functions

      /**
       * Returns a new Iterable.Keyed of the same type where the keys and values
       * have been flipped.
       *
       *     Seq({ a: 'z', b: 'y' }).flip() // { z: 'a', y: 'b' }
       *
       */
      flip(): /*this*/Iterable.Keyed<V, K>;

      /**
       * Returns a new Iterable.Keyed of the same type with keys passed through
       * a `mapper` function.
       *
       *     Seq({ a: 1, b: 2 })
       *       .mapKeys(x => x.toUpperCase())
       *     // Seq { A: 1, B: 2 }
       *
       */
      mapKeys<M>(
        mapper: (key: K, value: V, iter?: /*this*/Iterable.Keyed<K, V>) => M,
        context?: any
      ): /*this*/Iterable.Keyed<M, V>;

      /**
       * Returns a new Iterable.Keyed of the same type with entries
       * ([key, value] tuples) passed through a `mapper` function.
       *
       *     Seq({ a: 1, b: 2 })
       *       .mapEntries(([k, v]) => [k.toUpperCase(), v * 2])
       *     // Seq { A: 2, B: 4 }
       *
       */
      mapEntries<KM, VM>(
        mapper: (
          entry: /*(K, V)*/Array<any>,
          index: number,
          iter?: /*this*/Iterable.Keyed<K, V>
        ) => /*[KM, VM]*/Array<any>,
        context?: any
      ): /*this*/Iterable.Keyed<KM, VM>;
    }


    /**
     * Indexed Iterables have incrementing numeric keys. They exhibit
     * slightly different behavior than `Iterable.Keyed` for some methods in order
     * to better mirror the behavior of JavaScript's `Array`, and add methods
     * which do not make sense on non-indexed Iterables such as `indexOf`.
     *
     * Unlike JavaScript arrays, `Iterable.Indexed`s are always dense. "Unset"
     * indices and `undefined` indices are indistinguishable, and all indices from
     * 0 to `size` are visited when iterated.
     *
     * All Iterable.Indexed methods return re-indexed Iterables. In other words,
     * indices always start at 0 and increment until size. If you wish to
     * preserve indices, using them as keys, convert to a Iterable.Keyed by
     * calling `toKeyedSeq`.
     */
    export module Indexed {}

    /**
     * Creates a new Iterable.Indexed.
     */
    export function Indexed<T>(iter: Iterable.Indexed<T>): Iterable.Indexed<T>;
    export function Indexed<T>(iter: Iterable.Set<T>): Iterable.Indexed<T>;
    export function Indexed<K, V>(iter: Iterable.Keyed<K, V>): Iterable.Indexed</*[K,V]*/any>;
    export function Indexed<T>(array: Array<T>): Iterable.Indexed<T>;
    export function Indexed<T>(iterator: Iterator<T>): Iterable.Indexed<T>;
    export function Indexed<T>(iterable: /*Iterable<T>*/Object): Iterable.Indexed<T>;

    export interface Indexed<T> extends Iterable<number, T> {

      // Reading values

      /**
       * Returns the value associated with the provided index, or notSetValue if
       * the index is beyond the bounds of the Iterable.
       *
       * `index` may be a negative number, which indexes back from the end of the
       * Iterable. `s.get(-1)` gets the last item in the Iterable.
       */
      get(index: number, notSetValue?: T): T;


      // Conversion to Seq

      /**
       * Returns Seq.Indexed.
       * @override
       */
      toSeq(): Seq.Indexed<T>;

      /**
       * If this is an iterable of [key, value] entry tuples, it will return a
       * Seq.Keyed of those entries.
       */
      fromEntrySeq(): Seq.Keyed<any, any>;


      // Combination

      /**
       * Returns an Iterable of the same type with `separator` between each item
       * in this Iterable.
       */
      interpose(separator: T): /*this*/Iterable.Indexed<T>;

      /**
       * Returns an Iterable of the same type with the provided `iterables`
       * interleaved into this iterable.
       *
       * The resulting Iterable includes the first item from each, then the
       * second from each, etc.
       *
       *     I.Seq.of(1,2,3).interleave(I.Seq.of('A','B','C'))
       *     // Seq [ 1, 'A', 2, 'B', 3, 'C' ]
       *
       * The shortest Iterable stops interleave.
       *
       *     I.Seq.of(1,2,3).interleave(
       *       I.Seq.of('A','B'),
       *       I.Seq.of('X','Y','Z')
       *     )
       *     // Seq [ 1, 'A', 'X', 2, 'B', 'Y' ]
       */
      interleave(...iterables: Array<Iterable<any, T>>): /*this*/Iterable.Indexed<T>;

      /**
       * Splice returns a new indexed Iterable by replacing a region of this
       * Iterable with new values. If values are not provided, it only skips the
       * region to be removed.
       *
       * `index` may be a negative number, which indexes back from the end of the
       * Iterable. `s.splice(-2)` splices after the second to last item.
       *
       *     Seq(['a','b','c','d']).splice(1, 2, 'q', 'r', 's')
       *     // Seq ['a', 'q', 'r', 's', 'd']
       *
       */
      splice(
        index: number,
        removeNum: number,
        ...values: /*Array<Iterable.Indexed<T> | T>*/any[]
      ): /*this*/Iterable.Indexed<T>;

      /**
       * Returns an Iterable of the same type "zipped" with the provided
       * iterables.
       *
       * Like `zipWith`, but using the default `zipper`: creating an `Array`.
       *
       *     var a = Seq.of(1, 2, 3);
       *     var b = Seq.of(4, 5, 6);
       *     var c = a.zip(b); // Seq [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
       *
       */
      zip(...iterables: Array<Iterable<any, any>>): /*this*/Iterable.Indexed<any>;

      /**
       * Returns an Iterable of the same type "zipped" with the provided
       * iterables by using a custom `zipper` function.
       *
       *     var a = Seq.of(1, 2, 3);
       *     var b = Seq.of(4, 5, 6);
       *     var c = a.zipWith((a, b) => a + b, b); // Seq [ 5, 7, 9 ]
       *
       */
      zipWith<U, Z>(
        zipper: (value: T, otherValue: U) => Z,
        otherIterable: Iterable<any, U>
      ): Iterable.Indexed<Z>;
      zipWith<U, V, Z>(
        zipper: (value: T, otherValue: U, thirdValue: V) => Z,
        otherIterable: Iterable<any, U>,
        thirdIterable: Iterable<any, V>
      ): Iterable.Indexed<Z>;
      zipWith<Z>(
        zipper: (...any: Array<any>) => Z,
        ...iterables: Array<Iterable<any, any>>
      ): Iterable.Indexed<Z>;


      // Search for value

      /**
       * Returns the first index at which a given value can be found in the
       * Iterable, or -1 if it is not present.
       */
      indexOf(searchValue: T): number;

      /**
       * Returns the last index at which a given value can be found in the
       * Iterable, or -1 if it is not present.
       */
      lastIndexOf(searchValue: T): number;

      /**
       * Returns the first index in the Iterable where a value satisfies the
       * provided predicate function. Otherwise -1 is returned.
       */
      findIndex(
        predicate: (value: T, index: number, iter?: /*this*/Iterable.Indexed<T>) => boolean,
        context?: any
      ): number;

      /**
       * Returns the last index in the Iterable where a value satisfies the
       * provided predicate function. Otherwise -1 is returned.
       */
      findLastIndex(
        predicate: (value: T, index: number, iter?: /*this*/Iterable.Indexed<T>) => boolean,
        context?: any
      ): number;
    }


    /**
     * Set Iterables only represent values. They have no associated keys or
     * indices. Duplicate values are possible in Seq.Sets, however the
     * concrete `Set` does not allow duplicate values.
     *
     * Iterable methods on Iterable.Set such as `map` and `forEach` will provide
     * the value as both the first and second arguments to the provided function.
     *
     *     var seq = Seq.Set.of('A', 'B', 'C');
     *     assert.equal(seq.every((v, k) => v === k), true);
     *
     */
    export module Set {}

    /**
     * Similar to `Iterable()`, but always returns a Iterable.Set.
     */
    export function Set<T>(iter: Iterable.Set<T>): Iterable.Set<T>;
    export function Set<T>(iter: Iterable.Indexed<T>): Iterable.Set<T>;
    export function Set<K, V>(iter: Iterable.Keyed<K, V>): Iterable.Set</*[K,V]*/any>;
    export function Set<T>(array: Array<T>): Iterable.Set<T>;
    export function Set<T>(iterator: Iterator<T>): Iterable.Set<T>;
    export function Set<T>(iterable: /*Iterable<T>*/Object): Iterable.Set<T>;

    export interface Set<T> extends Iterable<T, T> {

      /**
       * Returns Seq.Set.
       * @override
       */
      toSeq(): Seq.Set<T>;
    }

  }

  /**
   * Creates an Iterable.
   *
   * The type of Iterable created is based on the input.
   *
   *   * If an `Iterable`, that same `Iterable`.
   *   * If an Array-like, an `Iterable.Indexed`.
   *   * If an Object with an Iterator, an `Iterable.Indexed`.
   *   * If an Iterator, an `Iterable.Indexed`.
   *   * If an Object, an `Iterable.Keyed`.
   *
   * This methods forces the conversion of Objects and Strings to Iterables.
   * If you want to ensure that a Iterable of one item is returned, use
   * `Seq.of`.
   */
  export function Iterable<K, V>(iterable: Iterable<K, V>): Iterable<K, V>;
  export function Iterable<T>(array: Array<T>): Iterable.Indexed<T>;
  export function Iterable<V>(obj: {[key: string]: V}): Iterable.Keyed<string, V>;
  export function Iterable<T>(iterator: Iterator<T>): Iterable.Indexed<T>;
  export function Iterable<T>(iterable: /*ES6Iterable<T>*/Object): Iterable.Indexed<T>;
  export function Iterable<V>(value: V): Iterable.Indexed<V>;

  export interface Iterable<K, V> {

    // Value equality

    /**
     * True if this and the other Iterable have value equality, as defined
     * by `Immutable.is()`.
     *
     * Note: This is equivalent to `Immutable.is(this, other)`, but provided to
     * allow for chained expressions.
     */
    equals(other: Iterable<K, V>): boolean;

    /**
     * Computes and returns the hashed identity for this Iterable.
     *
     * The `hashCode` of an Iterable is used to determine potential equality,
     * and is used when adding this to a `Set` or as a key in a `Map`, enabling
     * lookup via a different instance.
     *
     *     var a = List.of(1, 2, 3);
     *     var b = List.of(1, 2, 3);
     *     assert(a !== b); // different instances
     *     var set = Set.of(a);
     *     assert(set.has(b) === true);
     *
     * If two values have the same `hashCode`, they are [not guaranteed
     * to be equal][Hash Collision]. If two values have different `hashCode`s,
     * they must not be equal.
     *
     * [Hash Collision]: http://en.wikipedia.org/wiki/Collision_(computer_science)
     */
    hashCode(): number;


    // Reading values

    /**
     * Returns the value associated with the provided key, or notSetValue if
     * the Iterable does not contain this key.
     *
     * Note: it is possible a key may be associated with an `undefined` value,
     * so if `notSetValue` is not provided and this method returns `undefined`,
     * that does not guarantee the key was not found.
     */
    get(key: K, notSetValue?: V): V;

    /**
     * True if a key exists within this `Iterable`, using `Immutable.is` to determine equality
     */
    has(key: K): boolean;

    /**
     * True if a value exists within this `Iterable`, using `Immutable.is` to determine equality
     * @alias contains
     */
    includes(value: V): boolean;
    contains(value: V): boolean;

    /**
     * The first value in the Iterable.
     */
    first(): V;

    /**
     * The last value in the Iterable.
     */
    last(): V;


    // Reading deep values

    /**
     * Returns the value found by following a path of keys or indices through
     * nested Iterables.
     */
    getIn(searchKeyPath: Array<any>, notSetValue?: any): any;
    getIn(searchKeyPath: Iterable<any, any>, notSetValue?: any): any;

    /**
     * True if the result of following a path of keys or indices through nested
     * Iterables results in a set value.
     */
    hasIn(searchKeyPath: Array<any>): boolean;
    hasIn(searchKeyPath: Iterable<any, any>): boolean;


    // Conversion to JavaScript types

    /**
     * Deeply converts this Iterable to equivalent JS.
     *
     * `Iterable.Indexeds`, and `Iterable.Sets` become Arrays, while
     * `Iterable.Keyeds` become Objects.
     *
     * @alias toJSON
     */
    toJS(): any;

    /**
     * Shallowly converts this iterable to an Array, discarding keys.
     */
    toArray(): Array<V>;

    /**
     * Shallowly converts this Iterable to an Object.
     *
     * Throws if keys are not strings.
     */
    toObject(): { [key: string]: V };


    // Conversion to Collections

    /**
     * Converts this Iterable to a Map, Throws if keys are not hashable.
     *
     * Note: This is equivalent to `Map(this.toKeyedSeq())`, but provided
     * for convenience and to allow for chained expressions.
     */
    toMap(): Map<K, V>;

    /**
     * Converts this Iterable to a Map, maintaining the order of iteration.
     *
     * Note: This is equivalent to `OrderedMap(this.toKeyedSeq())`, but
     * provided for convenience and to allow for chained expressions.
     */
    toOrderedMap(): OrderedMap<K, V>;

    /**
     * Converts this Iterable to a Set, discarding keys. Throws if values
     * are not hashable.
     *
     * Note: This is equivalent to `Set(this)`, but provided to allow for
     * chained expressions.
     */
    toSet(): Set<V>;

    /**
     * Converts this Iterable to a Set, maintaining the order of iteration and
     * discarding keys.
     *
     * Note: This is equivalent to `OrderedSet(this.valueSeq())`, but provided
     * for convenience and to allow for chained expressions.
     */
    toOrderedSet(): OrderedSet<V>;

    /**
     * Converts this Iterable to a List, discarding keys.
     *
     * Note: This is equivalent to `List(this)`, but provided to allow
     * for chained expressions.
     */
    toList(): List<V>;

    /**
     * Converts this Iterable to a Stack, discarding keys. Throws if values
     * are not hashable.
     *
     * Note: This is equivalent to `Stack(this)`, but provided to allow for
     * chained expressions.
     */
    toStack(): Stack<V>;


    // Conversion to Seq

    /**
     * Converts this Iterable to a Seq of the same kind (indexed,
     * keyed, or set).
     */
    toSeq(): Seq<K, V>;

    /**
     * Returns a Seq.Keyed from this Iterable where indices are treated as keys.
     *
     * This is useful if you want to operate on an
     * Iterable.Indexed and preserve the [index, value] pairs.
     *
     * The returned Seq will have identical iteration order as
     * this Iterable.
     *
     * Example:
     *
     *     var indexedSeq = Immutable.Seq.of('A', 'B', 'C');
     *     indexedSeq.filter(v => v === 'B').toString() // Seq [ 'B' ]
     *     var keyedSeq = indexedSeq.toKeyedSeq();
     *     keyedSeq.filter(v => v === 'B').toString() // Seq { 1: 'B' }
     *
     */
    toKeyedSeq(): Seq.Keyed<K, V>;

    /**
     * Returns an Seq.Indexed of the values of this Iterable, discarding keys.
     */
    toIndexedSeq(): Seq.Indexed<V>;

    /**
     * Returns a Seq.Set of the values of this Iterable, discarding keys.
     */
    toSetSeq(): Seq.Set<V>;


    // Iterators

    /**
     * An iterator of this `Iterable`'s keys.
     *
     * Note: this will return an ES6 iterator which does not support Immutable JS sequence algorithms. Use `keySeq` instead, if this is what you want.
     */
    keys(): Iterator<K>;

    /**
     * An iterator of this `Iterable`'s values.
     *
     * Note: this will return an ES6 iterator which does not support Immutable JS sequence algorithms. Use `valueSeq` instead, if this is what you want.
     */
    values(): Iterator<V>;

    /**
     * An iterator of this `Iterable`'s entries as `[key, value]` tuples.
     *
     * Note: this will return an ES6 iterator which does not support Immutable JS sequence algorithms. Use `entrySeq` instead, if this is what you want.
     */
    entries(): Iterator</*[K, V]*/Array<any>>;


    // Iterables (Seq)

    /**
     * Returns a new Seq.Indexed of the keys of this Iterable,
     * discarding values.
     */
    keySeq(): Seq.Indexed<K>;

    /**
     * Returns an Seq.Indexed of the values of this Iterable, discarding keys.
     */
    valueSeq(): Seq.Indexed<V>;

    /**
     * Returns a new Seq.Indexed of [key, value] tuples.
     */
    entrySeq(): Seq.Indexed</*(K, V)*/Array<any>>;


    // Sequence algorithms

    /**
     * Returns a new Iterable of the same type with values passed through a
     * `mapper` function.
     *
     *     Seq({ a: 1, b: 2 }).map(x => 10 * x)
     *     // Seq { a: 10, b: 20 }
     *
     */
    map<M>(
      mapper: (value: V, key: K, iter?: /*this*/Iterable<K, V>) => M,
      context?: any
    ): /*this*/Iterable<K, M>;

    /**
     * Returns a new Iterable of the same type with only the entries for which
     * the `predicate` function returns true.
     *
     *     Seq({a:1,b:2,c:3,d:4}).filter(x => x % 2 === 0)
     *     // Seq { b: 2, d: 4 }
     *
     */
    filter(
      predicate: (value: V, key: K, iter?: /*this*/Iterable<K, V>) => boolean,
      context?: any
    ): /*this*/Iterable<K, V>;

    /**
     * Returns a new Iterable of the same type with only the entries for which
     * the `predicate` function returns false.
     *
     *     Seq({a:1,b:2,c:3,d:4}).filterNot(x => x % 2 === 0)
     *     // Seq { a: 1, c: 3 }
     *
     */
    filterNot(
      predicate: (value: V, key: K, iter?: /*this*/Iterable<K, V>) => boolean,
      context?: any
    ): /*this*/Iterable<K, V>;

    /**
     * Returns a new Iterable of the same type in reverse order.
     */
    reverse(): /*this*/Iterable<K, V>;

    /**
     * Returns a new Iterable of the same type which includes the same entries,
     * stably sorted by using a `comparator`.
     *
     * If a `comparator` is not provided, a default comparator uses `<` and `>`.
     *
     * `comparator(valueA, valueB)`:
     *
     *   * Returns `0` if the elements should not be swapped.
     *   * Returns `-1` (or any negative number) if `valueA` comes before `valueB`
     *   * Returns `1` (or any positive number) if `valueA` comes after `valueB`
     *   * Is pure, i.e. it must always return the same value for the same pair
     *     of values.
     *
     * When sorting collections which have no defined order, their ordered
     * equivalents will be returned. e.g. `map.sort()` returns OrderedMap.
     */
    sort(comparator?: (valueA: V, valueB: V) => number): /*this*/Iterable<K, V>;

    /**
     * Like `sort`, but also accepts a `comparatorValueMapper` which allows for
     * sorting by more sophisticated means:
     *
     *     hitters.sortBy(hitter => hitter.avgHits);
     *
     */
    sortBy<C>(
      comparatorValueMapper: (value: V, key: K, iter?: /*this*/Iterable<K, V>) => C,
      comparator?: (valueA: C, valueB: C) => number
    ): /*this*/Iterable<K, V>;

    /**
     * Returns a `Iterable.Keyed` of `Iterable.Keyeds`, grouped by the return
     * value of the `grouper` function.
     *
     * Note: This is always an eager operation.
     */
    groupBy<G>(
      grouper: (value: V, key: K, iter?: /*this*/Iterable<K, V>) => G,
      context?: any
    ): /*Map*/Seq.Keyed<G, /*this*/Iterable<K, V>>;


    // Side effects

    /**
     * The `sideEffect` is executed for every entry in the Iterable.
     *
     * Unlike `Array#forEach`, if any call of `sideEffect` returns
     * `false`, the iteration will stop. Returns the number of entries iterated
     * (including the last iteration which returned false).
     */
    forEach(
      sideEffect: (value: V, key: K, iter?: /*this*/Iterable<K, V>) => any,
      context?: any
    ): number;


    // Creating subsets

    /**
     * Returns a new Iterable of the same type representing a portion of this
     * Iterable from start up to but not including end.
     *
     * If begin is negative, it is offset from the end of the Iterable. e.g.
     * `slice(-2)` returns a Iterable of the last two entries. If it is not
     * provided the new Iterable will begin at the beginning of this Iterable.
     *
     * If end is negative, it is offset from the end of the Iterable. e.g.
     * `slice(0, -1)` returns an Iterable of everything but the last entry. If
     * it is not provided, the new Iterable will continue through the end of
     * this Iterable.
     *
     * If the requested slice is equivalent to the current Iterable, then it
     * will return itself.
     */
    slice(begin?: number, end?: number): /*this*/Iterable<K, V>;

    /**
     * Returns a new Iterable of the same type containing all entries except
     * the first.
     */
    rest(): /*this*/Iterable<K, V>;

    /**
     * Returns a new Iterable of the same type containing all entries except
     * the last.
     */
    butLast(): /*this*/Iterable<K, V>;

    /**
     * Returns a new Iterable of the same type which excludes the first `amount`
     * entries from this Iterable.
     */
    skip(amount: number): /*this*/Iterable<K, V>;

    /**
     * Returns a new Iterable of the same type which excludes the last `amount`
     * entries from this Iterable.
     */
    skipLast(amount: number): /*this*/Iterable<K, V>;

    /**
     * Returns a new Iterable of the same type which includes entries starting
     * from when `predicate` first returns false.
     *
     *     Seq.of('dog','frog','cat','hat','god')
     *       .skipWhile(x => x.match(/g/))
     *     // Seq [ 'cat', 'hat', 'god' ]
     *
     */
    skipWhile(
      predicate: (value: V, key: K, iter?: /*this*/Iterable<K, V>) => boolean,
      context?: any
    ): /*this*/Iterable<K, V>;

    /**
     * Returns a new Iterable of the same type which includes entries starting
     * from when `predicate` first returns true.
     *
     *     Seq.of('dog','frog','cat','hat','god')
     *       .skipUntil(x => x.match(/hat/))
     *     // Seq [ 'hat', 'god' ]
     *
     */
    skipUntil(
      predicate: (value: V, key: K, iter?: /*this*/Iterable<K, V>) => boolean,
      context?: any
    ): /*this*/Iterable<K, V>;

    /**
     * Returns a new Iterable of the same type which includes the first `amount`
     * entries from this Iterable.
     */
    take(amount: number): /*this*/Iterable<K, V>;

    /**
     * Returns a new Iterable of the same type which includes the last `amount`
     * entries from this Iterable.
     */
    takeLast(amount: number): /*this*/Iterable<K, V>;

    /**
     * Returns a new Iterable of the same type which includes entries from this
     * Iterable as long as the `predicate` returns true.
     *
     *     Seq.of('dog','frog','cat','hat','god')
     *       .takeWhile(x => x.match(/o/))
     *     // Seq [ 'dog', 'frog' ]
     *
     */
    takeWhile(
      predicate: (value: V, key: K, iter?: /*this*/Iterable<K, V>) => boolean,
      context?: any
    ): /*this*/Iterable<K, V>;

    /**
     * Returns a new Iterable of the same type which includes entries from this
     * Iterable as long as the `predicate` returns false.
     *
     *     Seq.of('dog','frog','cat','hat','god').takeUntil(x => x.match(/at/))
     *     // ['dog', 'frog']
     *
     */
    takeUntil(
      predicate: (value: V, key: K, iter?: /*this*/Iterable<K, V>) => boolean,
      context?: any
    ): /*this*/Iterable<K, V>;


    // Combination

    /**
     * Returns a new Iterable of the same type with other values and
     * iterable-like concatenated to this one.
     *
     * For Seqs, all entries will be present in
     * the resulting iterable, even if they have the same key.
     */
    concat(...valuesOrIterables: /*Array<Iterable<K, V>|V*/any[]): /*this*/Iterable<K, V>;

    /**
     * Flattens nested Iterables.
     *
     * Will deeply flatten the Iterable by default, returning an Iterable of the
     * same type, but a `depth` can be provided in the form of a number or
     * boolean (where true means to shallowly flatten one level). A depth of 0
     * (or shallow: false) will deeply flatten.
     *
     * Flattens only others Iterable, not Arrays or Objects.
     *
     * Note: `flatten(true)` operates on Iterable<any, Iterable<K, V>> and
     * returns Iterable<K, V>
     */
    flatten(depth?: number): /*this*/Iterable<any, any>;
    flatten(shallow?: boolean): /*this*/Iterable<any, any>;

    /**
     * Flat-maps the Iterable, returning an Iterable of the same type.
     *
     * Similar to `iter.map(...).flatten(true)`.
     */
    flatMap<MK, MV>(
      mapper: (value: V, key: K, iter?: /*this*/Iterable<K, V>) => Iterable<MK, MV>,
      context?: any
    ): /*this*/Iterable<MK, MV>;
    flatMap<MK, MV>(
      mapper: (value: V, key: K, iter?: /*this*/Iterable<K, V>) => /*iterable-like*/any,
      context?: any
    ): /*this*/Iterable<MK, MV>;


    // Reducing a value

    /**
     * Reduces the Iterable to a value by calling the `reducer` for every entry
     * in the Iterable and passing along the reduced value.
     *
     * If `initialReduction` is not provided, or is null, the first item in the
     * Iterable will be used.
     *
     * @see `Array#reduce`.
     */
    reduce<R>(
      reducer: (reduction?: R, value: V, key: K, iter?: /*this*/Iterable<K, V>) => R,
      initialReduction?: R,
      context?: any
    ): R;

    /**
     * Reduces the Iterable in reverse (from the right side).
     *
     * Note: Similar to this.reverse().reduce(), and provided for parity
     * with `Array#reduceRight`.
     */
    reduceRight<R>(
      reducer: (reduction?: R, value: V, key: K, iter?: /*this*/Iterable<K, V>) => R,
      initialReduction?: R,
      context?: any
    ): R;

    /**
     * True if `predicate` returns true for all entries in the Iterable.
     */
    every(
      predicate: (value: V, key: K, iter?: /*this*/Iterable<K, V>) => boolean,
      context?: any
    ): boolean;

    /**
     * True if `predicate` returns true for any entry in the Iterable.
     */
    some(
      predicate: (value: V, key: K, iter?: /*this*/Iterable<K, V>) => boolean,
      context?: any
    ): boolean;

    /**
     * Joins values together as a string, inserting a separator between each.
     * The default separator is `","`.
     */
    join(separator?: string): string;

    /**
     * Returns true if this Iterable includes no values.
     *
     * For some lazy `Seq`, `isEmpty` might need to iterate to determine
     * emptiness. At most one iteration will occur.
     */
    isEmpty(): boolean;

    /**
     * Returns the size of this Iterable.
     *
     * Regardless of if this Iterable can describe its size lazily (some Seqs
     * cannot), this method will always return the correct size. E.g. it
     * evaluates a lazy `Seq` if necessary.
     *
     * If `predicate` is provided, then this returns the count of entries in the
     * Iterable for which the `predicate` returns true.
     */
    count(): number;
    count(
      predicate: (value: V, key: K, iter?: /*this*/Iterable<K, V>) => boolean,
      context?: any
    ): number;

    /**
     * Returns a `Seq.Keyed` of counts, grouped by the return value of
     * the `grouper` function.
     *
     * Note: This is not a lazy operation.
     */
    countBy<G>(
      grouper: (value: V, key: K, iter?: /*this*/Iterable<K, V>) => G,
      context?: any
    ): Map<G, number>;


    // Search for value

    /**
     * Returns the first value for which the `predicate` returns true.
     */
    find(
      predicate: (value: V, key: K, iter?: /*this*/Iterable<K, V>) => boolean,
      context?: any,
      notSetValue?: V
    ): V;

    /**
     * Returns the last value for which the `predicate` returns true.
     *
     * Note: `predicate` will be called for each entry in reverse.
     */
    findLast(
      predicate: (value: V, key: K, iter?: /*this*/Iterable<K, V>) => boolean,
      context?: any,
      notSetValue?: V
    ): V;

    /**
     * Returns the first [key, value] entry for which the `predicate` returns true.
     */
    findEntry(
      predicate: (value: V, key: K, iter?: /*this*/Iterable<K, V>) => boolean,
      context?: any,
      notSetValue?: V
    ): /*[K, V]*/Array<any>;

    /**
     * Returns the last [key, value] entry for which the `predicate`
     * returns true.
     *
     * Note: `predicate` will be called for each entry in reverse.
     */
    findLastEntry(
      predicate: (value: V, key: K, iter?: /*this*/Iterable<K, V>) => boolean,
      context?: any,
      notSetValue?: V
    ): /*[K, V]*/Array<any>;

    /**
     * Returns the key for which the `predicate` returns true.
     */
    findKey(
      predicate: (value: V, key: K, iter?: /*this*/Iterable.Keyed<K, V>) => boolean,
      context?: any
    ): K;

    /**
     * Returns the last key for which the `predicate` returns true.
     *
     * Note: `predicate` will be called for each entry in reverse.
     */
    findLastKey(
      predicate: (value: V, key: K, iter?: /*this*/Iterable.Keyed<K, V>) => boolean,
      context?: any
    ): K;

    /**
     * Returns the key associated with the search value, or undefined.
     */
    keyOf(searchValue: V): K;

    /**
     * Returns the last key associated with the search value, or undefined.
     */
    lastKeyOf(searchValue: V): K;

    /**
     * Returns the maximum value in this collection. If any values are
     * comparatively equivalent, the first one found will be returned.
     *
     * The `comparator` is used in the same way as `Iterable#sort`. If it is not
     * provided, the default comparator is `>`.
     *
     * When two values are considered equivalent, the first encountered will be
     * returned. Otherwise, `max` will operate independent of the order of input
     * as long as the comparator is commutative. The default comparator `>` is
     * commutative *only* when types do not differ.
     *
     * If `comparator` returns 0 and either value is NaN, undefined, or null,
     * that value will be returned.
     */
    max(comparator?: (valueA: V, valueB: V) => number): V;

    /**
     * Like `max`, but also accepts a `comparatorValueMapper` which allows for
     * comparing by more sophisticated means:
     *
     *     hitters.maxBy(hitter => hitter.avgHits);
     *
     */
    maxBy<C>(
      comparatorValueMapper: (value: V, key: K, iter?: /*this*/Iterable<K, V>) => C,
      comparator?: (valueA: C, valueB: C) => number
    ): V;

    /**
     * Returns the minimum value in this collection. If any values are
     * comparatively equivalent, the first one found will be returned.
     *
     * The `comparator` is used in the same way as `Iterable#sort`. If it is not
     * provided, the default comparator is `<`.
     *
     * When two values are considered equivalent, the first encountered will be
     * returned. Otherwise, `min` will operate independent of the order of input
     * as long as the comparator is commutative. The default comparator `<` is
     * commutative *only* when types do not differ.
     *
     * If `comparator` returns 0 and either value is NaN, undefined, or null,
     * that value will be returned.
     */
    min(comparator?: (valueA: V, valueB: V) => number): V;

    /**
     * Like `min`, but also accepts a `comparatorValueMapper` which allows for
     * comparing by more sophisticated means:
     *
     *     hitters.minBy(hitter => hitter.avgHits);
     *
     */
    minBy<C>(
      comparatorValueMapper: (value: V, key: K, iter?: /*this*/Iterable<K, V>) => C,
      comparator?: (valueA: C, valueB: C) => number
    ): V;


    // Comparison

    /**
     * True if `iter` includes every value in this Iterable.
     */
    isSubset(iter: Iterable<any, V>): boolean;
    isSubset(iter: Array<V>): boolean;

    /**
     * True if this Iterable includes every value in `iter`.
     */
    isSuperset(iter: Iterable<any, V>): boolean;
    isSuperset(iter: Array<V>): boolean;


    /**
     * Note: this is here as a convenience to work around an issue with
     * TypeScript https://github.com/Microsoft/TypeScript/issues/285, but
     * Iterable does not define `size`, instead `Seq` defines `size` as
     * nullable number, and `Collection` defines `size` as always a number.
     *
     * @ignore
     */
    size: number;
  }


  /**
   * Collection is the abstract base class for concrete data structures. It
   * cannot be constructed directly.
   *
   * Implementations should extend one of the subclasses, `Collection.Keyed`,
   * `Collection.Indexed`, or `Collection.Set`.
   */
  export module Collection {


    /**
     * `Collection` which represents key-value pairs.
     */
    export module Keyed {}

    export interface Keyed<K, V> extends Collection<K, V>, Iterable.Keyed<K, V> {

      /**
       * Returns Seq.Keyed.
       * @override
       */
      toSeq(): Seq.Keyed<K, V>;
    }


    /**
     * `Collection` which represents ordered indexed values.
     */
    export module Indexed {}

    export interface Indexed<T> extends Collection<number, T>, Iterable.Indexed<T> {

      /**
       * Returns Seq.Indexed.
       * @override
       */
      toSeq(): Seq.Indexed<T>;
    }


    /**
     * `Collection` which represents values, unassociated with keys or indices.
     *
     * `Collection.Set` implementations should guarantee value uniqueness.
     */
    export module Set {}

    export interface Set<T> extends Collection<T, T>, Iterable.Set<T> {

      /**
       * Returns Seq.Set.
       * @override
       */
      toSeq(): Seq.Set<T>;
    }

  }

  export interface Collection<K, V> extends Iterable<K, V> {

    /**
     * All collections maintain their current `size` as an integer.
     */
    size: number;
  }


  /**
   * ES6 Iterator.
   *
   * This is not part of the Immutable library, but a common interface used by
   * many types in ES6 JavaScript.
   *
   * @ignore
   */
  export interface Iterator<T> {
    next(): { value: T; done: boolean; }
  }
}