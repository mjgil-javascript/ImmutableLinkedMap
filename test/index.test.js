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
console.log('map', dlList.map((val) => 'malcom')) 
console.log('forEach', dlList.forEach((val, k) => console.log(val.toJS(), k)))
for (var i of dlList) { console.log(i) }
console.log('get', dlList.get(1))
console.log('set', dlList.set(1, 'malcom'))
console.log('setIn', dlList.setIn([1], 'malcom2'))
console.log('update', dlList.update(2, (val) => val.get('name')))
console.log('updateIn', dlList.updateIn([2, 'name'], (val) => val + val))
console.log('clear', dlList.clear())
console.log('reduce', dlList.reduce((reduction, val) => reduction + val.get('name'), ''))
console.log('reduceRight', dlList.reduceRight((reduction, val) => reduction + val.get('name'), ''))
console.log('.of', IndexedDoublyLinkedList.of(1, 'a', 2, 'b', 3, 'c', 4, 'd'))
console.log('.toMap', dlList.toMap())
console.log('deleteFirst', dlList.delete(1).toJS())
console.log('deleteSecond', dlList.delete(2).toJS())
