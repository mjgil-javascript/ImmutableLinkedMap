import { LinkedMap } from '../build/index.js'
import { Map } from 'immutable'
import { expect } from 'chai'

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
  })


})
