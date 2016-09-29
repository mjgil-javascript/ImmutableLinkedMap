export module LinkedMap {

  /**
  * True if the provided value is a List
  */
  function isLinkedMap(maybeLinkedMap: any): boolean;

  /**
  * Creates a new List containing `values`.
  */
  function of<T>(...values: T[]): LinkedMap<T>;
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
//   export function LinkedMap<T>(): LinkedMap<T>;
//   export function LinkedMap<T>(iter: Iterable.Indexed<T>): LinkedMap<T>;
//   export function LinkedMap<T>(iter: Iterable.Set<T>): LinkedMap<T>;
  export function LinkedMap<K, V>(iter: Iterable.Keyed<K, V>): LinkedMap</*[K,V]*/any>;
//   export function LinkedMap<T>(array: Array<T>): LinkedMap<T>;
//   export function LinkedMap<T>(iterator: Iterator<T>): LinkedMap<T>;
//   export function LinkedMap<T>(iterable: /*Iterable<T>*/Object): LinkedMap<T>;


export interface LinkedMap<K, V> extends Collection.Keyed<K, V> {
  delete(index: string): LinkedMap<K, V>;
  remove(index: string): LinkedMap<K, V>;
}