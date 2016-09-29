import { LinkedMap } from '../build/index.js'
import { Map } from 'immutable'
import chai, { expect }  from 'chai'
import chaiImmutable from 'chai-immutable'
chai.use(chaiImmutable)

const value1 = Map({id: 1, name: 'one'})
const value2 = Map({id: 2, name: 'two'})
const value3 = Map({id: 3, name: 'three'})
const value4 = Map({id: 4, name: 'four'})
const value5 = Map({id: 5, name: 'five'})

const addToList = (val, list) => list.push(val, val.get('id'))
let emptyLinkedMap = LinkedMap()
let oneLinked = addToList(value1, emptyLinkedMap)
let twoLinked = addToList(value2, oneLinked)
let threeLinked = addToList(value3, twoLinked)
let fourLinked = addToList(value4, threeLinked)

let oneJs = [[1,{id:1, name:'one'}]]
let twoJs = [[1,{id:1, name:'one'}], [2,{id:2, name:'two'}]]
let threeJs = [[1,{id:1, name:'one'}], [2,{id:2, name:'two'}], [3,{id:3, name:'three'}]]

let oneMap = [[1, value1]]
let twoMap = [[1, value1], [2, value2]]
let threeMap = [[1, value1], [2, value2], [3, value3]]

describe('LinkedMap', () => {
  describe('constructor', () => {
    it('should return same linked map if passed in a linked map', () => {
      expect(LinkedMap(emptyLinkedMap) === emptyLinkedMap).to.equal(true)
    })
    it('should accept a array of tuple arrays', () => {
      let arrayLinked = LinkedMap([[value1.get('id'), value1]])
      expect(arrayLinked.size).to.equal(1)
      expect(arrayLinked.get(1)).to.equal(value1)
    })
    // it('should accept a array', () => {
    //   let arrayLinked = LinkedMap([{1: 'one'}, {2: 'three'}])
    //   // let arrayLinked = LinkedMap([1, 2])
    //   expect(arrayLinked.size).to.equal(2)
    //   expect(arrayLinked.get(0)).to.equal(1)
    //   expect(arrayLinked.get(1)).to.equal(2)
    // })
    // it('should accept an object')
  })

  describe('of', () => {
    it('should accept a sequence of tuples', () => {
      const ofLinked = LinkedMap.of(1, 'a', 2, 'b', 3, '4')
      expect(ofLinked.size).to.equal(3)
      expect(ofLinked.get(1)).to.equal('a')
      expect(ofLinked.get(2)).to.equal('b')
      expect(ofLinked.get(3)).to.equal('4')
    })
  })

  describe('toString', () => {
    it('should be a string', () => {
      expect(emptyLinkedMap.toString()).to.be.a('string')
    })

    it('should have the right value', () => {
      expect(emptyLinkedMap.toString()).to.equal('LinkedMap []')
    })
  })

  describe('push', () => {
    it('should add a value', () => {
      let oneElem = emptyLinkedMap.push(value1, value1.get('id'))
      expect(oneElem.size).to.equal(1)
      expect(oneElem.get(1)).to.equal(value1)
    })

    it('should add multiple values', () => {
      let oneElem = emptyLinkedMap.push(value1, value1.get('id'))
      let twoElems = oneElem.push(value2, value2.get('id'))
      expect(twoElems.size).to.equal(2)
      expect(twoElems.get(1)).to.equal(value1)
      expect(twoElems.get(2)).to.equal(value2)
    })
  })

  describe('map', () => {
    let mapped = threeLinked.map(val => 'malcom')
    it('should have the right size', () => {
      expect(mapped.size).to.equal(3)
    })
    it('should have the right values', () => {
      expect(mapped.get(1)).to.equal('malcom')
      expect(mapped.get(2)).to.equal('malcom')
      expect(mapped.get(3)).to.equal('malcom')
    })
  })

  describe('get', () => {
    it('should get the correct value', () => { 
      expect(threeLinked.get(1)).to.equal(value1)
      expect(threeLinked.get(2)).to.equal(value2)
      expect(threeLinked.get(3)).to.equal(value3)
    })
    it('should get the current value by default', () => { 
      expect(threeLinked.get()).to.equal(value1)
      expect(threeLinked.next().get()).to.equal(value2)
      expect(threeLinked.next().next().get()).to.equal(value3)
    })
    it('should respect notSetValue', () => {
      expect(emptyLinkedMap.get('fsfs', 'malcom')).to.equal('malcom')
      expect(emptyLinkedMap.get('dddd', 'fggsdg')).to.equal('fggsdg')
    })
  })

  describe('set', () => {
    it('should set values correctly', () => {
      expect(threeLinked.set(1, 'malcom').get(1)).to.equal('malcom')
      expect(threeLinked.set(2, 'malcom').get(2)).to.equal('malcom')
      expect(threeLinked.set(3, 'malcom').get(3)).to.equal('malcom')
    })
  })

  describe('setIn', () => {
    it('should set nested values correctly', () => {
      expect(threeLinked.setIn([1], 'malcom').get(1)).to.equal('malcom')
      expect(threeLinked.setIn([1,'name'], 'malcom').get()).to.equal(value1.set('name', 'malcom'))
    })
  })

  describe('update', () => {
    it('should update the value', () => {
      expect(threeLinked.update(2, val => val.get('name')).get(2)).to.equal('two')
    })
  })

  describe('updateIn', () => {
    it('should update nested values', () => {
      expect(threeLinked.updateIn([2, 'name'], val => val + val).get(2)).to.equal(value2.set('name', 'twotwo'))
    })
  })

  describe('next', () => {
    it('should move to the next value', () => {
      expect(threeLinked.get()).to.equal(value1)
      expect(threeLinked.next().get()).to.equal(value2)
      expect(threeLinked.next().next().get()).to.equal(value3)
    })
  })

  describe('prev', () => {
    it('should move to the previous value', () => {
      expect(threeLinked.moveToEnd().get()).to.equal(value3)
      expect(threeLinked.moveToEnd().prev().get()).to.equal(value2)
      expect(threeLinked.moveToEnd().prev().prev().get()).to.equal(value1)
    })
  })

  describe('moveTo', () => {
    it('should move to an id', () => {
      expect(threeLinked.moveTo(1).get()).to.equal(value1)
      expect(threeLinked.moveTo(2).get()).to.equal(value2)
      expect(threeLinked.moveTo(3).get()).to.equal(value3)
    })
  })

  describe('moveToEnd', () => {
    it('should move to end', () => {
      expect(oneLinked.moveToEnd().get()).to.equal(value1)
      expect(twoLinked.moveToEnd().get()).to.equal(value2)
      expect(threeLinked.moveToEnd().get()).to.equal(value3)
    })
  })

  describe('moveToStart', () => {
    it('should move to start', () => {
      expect(oneLinked.moveToEnd().moveToStart().get()).to.equal(value1)
      expect(twoLinked.moveToEnd().moveToStart().get()).to.equal(value1)
      expect(threeLinked.moveToEnd().moveToStart().get()).to.equal(value1)
    })
  })

  describe('clear', () => {
    it('should return the same if its empty', () => {
      expect(emptyLinkedMap.clear() === emptyLinkedMap).to.equal(true)
    })
    it('should return an empty if it has stuff', () => {
      expect(threeLinked.clear() === emptyLinkedMap).to.equal(true)
    })
  })

  describe('valueOf', () => {

  })

  describe('equals', () => {
    it('should be equal for same values inputted', () => {
      expect(emptyLinkedMap.equals(LinkedMap())).to.equal(true)
      expect(oneLinked.equals(LinkedMap(oneMap))).to.equal(true)
      expect(twoLinked.equals(LinkedMap(twoMap))).to.equal(true)
      expect(threeLinked.equals(LinkedMap(threeMap))).to.equal(true)
    })
  })

  describe('toJS', () => {
    it('should output a list of tuples by default', () => {
      expect(emptyLinkedMap.toJS()).to.deep.equal([])
      expect(oneLinked.toJS()).to.deep.equal(oneJs)
      expect(twoLinked.toJS()).to.deep.equal(twoJs)
      expect(threeLinked.toJS()).to.deep.equal(threeJs)
    })
  })

  describe('copy', () => {
    it('should have the same string representation', () => {
      expect(threeLinked.copy().toString()).to.equal(threeLinked.toString())
    })
    it('should be the same in regards to immutable', () => {
      expect(threeLinked.copy() === threeLinked).to.equal(false)
      expect(threeLinked.copy()).to.equal(threeLinked)
    })
  })

})
