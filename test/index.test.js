'user strict'

const expect = require('chai').expect

const easy = require('..')

describe('Index test case', () => {
  it('Should call the compare function', () => {
    expect(easy.compare(10, { $eq: 10 })).to.be.true
    expect(easy.compare(10, { $eq: 11 })).to.be.false
  })
})
