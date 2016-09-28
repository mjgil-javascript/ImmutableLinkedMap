import { LinkedMap } from '../build/index.js'
import { Map } from 'immutable'
import { expect } from 'chai'

const value1 = Map({id: 1, name: 'one'})
const value2 = Map({id: 2, name: 'two'})
const value3 = Map({id: 3, name: 'three'})
const value4 = Map({id: 4, name: 'four'})
const value5 = Map({id: 5, name: 'five'})

let linkedMap = LinkedMap()

describe('LinkedMap', () => {


  describe('toString', () => {
    it('should be a string', () => {
      expect(linkedMap.toString()).to.be.a('string')
    })
  })

  
})