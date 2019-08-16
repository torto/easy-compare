'use strict'

const expect = require('chai').expect

const compare = require('../../lib/comparison')

describe('Test case to comaprison operators', () => {
  describe('Individual methods', () => {
    describe('isInclude', () => {
      it('array correct', () => {
        expect(compare.isInclude([1, 2, 3], 2)).to.be.true
      })
      it('array wrong', () => {
        expect(compare.isInclude([1, 2, 3], 4)).to.be.false
      })
      it('string correct', () => {
        expect(compare.isInclude('compare', 'co')).to.be.true
      })
      it('string wrong', () => {
        expect(compare.isInclude('compare', 'te')).to.be.false
      })
      it('number wrong', () => {
        expect(() => compare.isInclude(10, 1)).to.throw(/value.includes is not a function/)
      })
    })
    describe('isNotInclude', () => {
      it('array correct', () => {
        expect(compare.isNotInclude([1, 2, 3], 4)).to.be.true
      })
      it('array wrong', () => {
        expect(compare.isNotInclude([1, 2, 3], 2)).to.be.false
      })
      it('string correct', () => {
        expect(compare.isNotInclude('compare', 'te')).to.be.true
      })
      it('string wrong', () => {
        expect(compare.isNotInclude('compare', 'co')).to.be.false
      })
      it('number wrong', () => {
        expect(() => compare.isNotInclude(10, 1)).to.throw(/value.includes is not a function/)
      })
    })
    describe('isEqual method', () => {
      it('number correct', () => {
        expect(compare.isEqual(20, 20)).to.be.true
      })
      it('number wrong', () => {
        expect(compare.isEqual(20, 10)).to.be.false
      })
      it('string correct', () => {
        expect(compare.isEqual('test', 'test')).to.be.true
      })
      it('string wrong', () => {
        expect(compare.isEqual('test', 'other')).to.be.false
      })
      it('different type', () => {
        expect(compare.isEqual(20, 'test')).to.be.false
      })
    })
    describe('isNotEqual method', () => {
      it('number correct', () => {
        expect(compare.isNotEqual(21, 20)).to.be.true
      })
      it('number wrong', () => {
        expect(compare.isNotEqual(20, 20)).to.be.false
      })
      it('string correct', () => {
        expect(compare.isNotEqual('test', 'other')).to.be.true
      })
      it('string wrong', () => {
        expect(compare.isNotEqual('test', 'test')).to.be.false
      })
      it('different type', () => {
        expect(compare.isNotEqual(20, 'a')).to.be.true
      })
    })
    describe('isGreaterThan method', () => {
      it('number correct', () => {
        expect(compare.isGreaterThan(21, 20)).to.be.true
      })
      it('number wrong', () => {
        expect(compare.isGreaterThan(20, 25)).to.be.false
      })
      it('string correct', () => {
        expect(compare.isGreaterThan('b', 'a')).to.be.true
      })
      it('string wrong', () => {
        expect(compare.isGreaterThan('a', 'b')).to.be.false
      })
      it('different type', () => {
        expect(compare.isGreaterThan(1, 'a')).to.be.false
      })
    })
    describe('isGreaterThanOrEqual method', () => {
      it('number greater than', () => {
        expect(compare.isGreaterThanOrEqual(21, 20)).to.be.true
      })
      it('number equal', () => {
        expect(compare.isGreaterThanOrEqual(20, 20)).to.be.true
      })
      it('number less than', () => {
        expect(compare.isGreaterThanOrEqual(20, 25)).to.be.false
      })
      it('string greater than correct', () => {
        expect(compare.isGreaterThanOrEqual('b', 'a')).to.be.true
      })
      it('string equal correct', () => {
        expect(compare.isGreaterThanOrEqual('b', 'b')).to.be.true
      })
      it('string wrong', () => {
        expect(compare.isGreaterThanOrEqual('a', 'b')).to.be.false
      })
      it('different type', () => {
        expect(compare.isGreaterThanOrEqual(1, 'a')).to.be.false
      })
    })
    describe('isLessThan method', () => {
      it('number correct', () => {
        expect(compare.isLessThan(20, 21)).to.be.true
      })
      it('number wrong', () => {
        expect(compare.isLessThan(25, 20)).to.be.false
      })
      it('string correct', () => {
        expect(compare.isLessThan('a', 'b')).to.be.true
      })
      it('string wrong', () => {
        expect(compare.isLessThan('b', 'a')).to.be.false
      })
      it('different type', () => {
        expect(compare.isLessThan(1, 'a')).to.be.false
      })
    })
    describe('isLessThanOrEqual method', () => {
      it('number less than', () => {
        expect(compare.isLessThanOrEqual(20, 21)).to.be.true
      })
      it('number equal', () => {
        expect(compare.isLessThanOrEqual(20, 20)).to.be.true
      })
      it('number greater than', () => {
        expect(compare.isLessThanOrEqual(25, 20)).to.be.false
      })
      it('string less than correct', () => {
        expect(compare.isLessThanOrEqual('a', 'b')).to.be.true
      })
      it('string equal correct', () => {
        expect(compare.isLessThanOrEqual('b', 'b')).to.be.true
      })
      it('string wrong', () => {
        expect(compare.isLessThanOrEqual('b', 'a')).to.be.false
      })
      it('different type', () => {
        expect(compare.isLessThanOrEqual(1, 'a')).to.be.false
      })
    })
    describe('isSameSize method', () => {
      it('array same size', () => {
        expect(compare.isSameSize([20, 2, 3], 3)).to.be.true
      })
      it('array different size', () => {
        expect(compare.isSameSize([20, 2, 3], 1)).to.be.false
      })
      it('string same size', () => {
        expect(compare.isSameSize('test', 4)).to.be.true
      })
      it('string different size', () => {
        expect(compare.isSameSize('test', 2)).to.be.false
      })
    })
    describe('isNotSameSize method', () => {
      it('array same size', () => {
        expect(compare.isNotSameSize([20, 2, 3], 1)).to.be.true
      })
      it('array different size', () => {
        expect(compare.isNotSameSize([20, 2, 3], 3)).to.be.false
      })
      it('string same size', () => {
        expect(compare.isNotSameSize('test', 2)).to.be.true
      })
      it('string different size', () => {
        expect(compare.isNotSameSize('test', 4)).to.be.false
      })
    })
    describe('isRegexMatch method', () => {
      it('correct', () => {
        expect(compare.isRegexMatch('123', '^[0-9]+')).to.be.true
      })
      it('wrong', () => {
        expect(compare.isRegexMatch('asd', '^[0-9]+')).to.be.false
      })
    })
    describe('isNotRegexMatch method', () => {
      it('correct', () => {
        expect(compare.isNotRegexMatch('asd', '^[0-9]+')).to.be.true
      })
      it('wrong', () => {
        expect(compare.isNotRegexMatch('123', '^[0-9]+')).to.be.false
      })
    })
  })
})
