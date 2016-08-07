import { IndexedDoublyLinkedList } from '../build/index.js'
import { Map } from 'immutable'

const value1 = Map({id: 1, name: 'one'})
const value2 = Map({id: 2, name: 'two'})
const value3 = Map({id: 3, name: 'three'})
const value4 = Map({id: 4, name: 'four'})
const value5 = Map({id: 5, name: 'five'})

const addToList = (val, list) => list.push(val, val.get('id'))
let dlList = IndexedDoublyLinkedList()
dlList = addToList(value1, dlList)
dlList = addToList(value2, dlList)
dlList = addToList(value3, dlList)
dlList = addToList(value4, dlList)

console.log('dlList', dlList)
console.log('dlList', dlList.toString())
console.log('dlList', dlList.map((val) => console.log(val.toJS())))
console.log('dlList', dlList.forEach((val) => console.log(val.toJS())))