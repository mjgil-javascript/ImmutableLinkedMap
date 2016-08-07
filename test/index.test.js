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
console.log('toString', dlList.toString())
console.log('map', dlList.map((val) => {return 'malcom'}))
console.log('forEach', dlList.forEach((val) => console.log(val.toJS())))
for (var i of dlList) { console.log(i) }
console.log('get', dlList.get(1))
console.log('get', dlList.set(1, 'malcom'))
console.log('get', dlList.setIn([1], 'malcom2'))
console.log('get', dlList.update(2, (val) => val.get('name')))
console.log('get', dlList.updateIn([2, 'name'], (val) => val + val))
