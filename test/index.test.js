import { IndexedDoublyLinkedList } from '../build/index.js'
import { Map } from 'immutable'

const value1 = Map({id: 1, name: 'one'})
const value2 = Map({id: 2, name: 'two'})
const value3 = Map({id: 3, name: 'three'})
const value4 = Map({id: 4, name: 'four'})
const value5 = Map({id: 5, name: 'five'})

let dlList = IndexedDoublyLinkedList()

console.log('dlList', dlList)