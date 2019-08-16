'use strict'

const expect = require('chai').expect

const compare = require('../../lib/compare')

describe('Test case to Compare Fields', () => {
  describe('Compare METHOD', () => {
    describe('Check correct options', () => {
      it('No compare option', () => {
        expect(() => compare.compare(20)).to.throw(/You need to insert an operator/)
      })
      it('Compare with options not correct', () => {
        expect(() => compare.compare(20, { $eu: 10 })).to.throw(/The operator \$eu is incorrect. Valid operator: \$eq, \$ne, \$gt, \$gte, \$lt, \$lte, \$and, \$or/)
      })
      it('Compare with some options not correct and other correct', () => {
        expect(() => compare.compare(20, { $and: { $eq: 20, other: 10 } })).to.throw(/The operator other is incorrect. Valid operator: \$eq, \$ne, \$gt, \$gte, \$lt, \$lte, \$and, \$or/)
      })
    })

    describe('Should compare without $and or $or fields', () => {
      describe('$eq field', () => {
        it('correct', () => {
          expect(compare.compare(20, { $eq: 20 })).to.be.true
        })
        it('wrong', () => {
          expect(compare.compare(21, { $eq: 20 })).to.be.false
        })
      })
      describe('$ne field', () => {
        it('correct', () => {
          expect(compare.compare(21, { $ne: 20 })).to.be.true
        })
        it('wrong', () => {
          expect(compare.compare(20, { $ne: 20 })).to.be.false
        })
      })
      describe('$gt field', () => {
        it('correct', () => {
          expect(compare.compare(21, { $gt: 20 })).to.be.true
        })
        it('wrong', () => {
          expect(compare.compare(10, { $gt: 20 })).to.be.false
        })
      })
      describe('$gte field', () => {
        it('correct', () => {
          expect(compare.compare(21, { $gte: 20 })).to.be.true
        })
        it('correct equal', () => {
          expect(compare.compare(20, { $gte: 20 })).to.be.true
        })
        it('wrong', () => {
          expect(compare.compare(10, { $gte: 20 })).to.be.false
        })
      })
      describe('$lt field', () => {
        it('correct', () => {
          expect(compare.compare(20, { $lt: 21 })).to.be.true
        })
        it('wrong', () => {
          expect(compare.compare(20, { $lt: 10 })).to.be.false
        })
      })
      describe('$lte field', () => {
        it('correct', () => {
          expect(compare.compare(20, { $lte: 21 })).to.be.true
        })
        it('correct equal', () => {
          expect(compare.compare(20, { $lte: 20 })).to.be.true
        })
        it('wrong', () => {
          expect(compare.compare(20, { $lte: 10 })).to.be.false
        })
      })
    })

    describe('Should compare with $and or $or fields', () => {
      describe('$and field', () => {
        it('correct', () => {
          expect(compare.compare(35, { $and: { $lte: 50, $gt: 20 } })).to.be.true
        })
        it('wrong greater than', () => {
          expect(compare.compare(100, { $and: { $lte: 50, $gt: 20 } })).to.be.false
        })
        it('wrong less than', () => {
          expect(compare.compare(10, { $and: { $lte: 50, $gt: 20 } })).to.be.false
        })
      })
      describe('$or field', () => {
        it('correct', () => {
          expect(compare.compare(35, { $or: { $lte: 10, $gt: 20 } })).to.be.true
        })
        it('wrong', () => {
          expect(compare.compare(15, { $or: { $lte: 10, $gt: 20 } })).to.be.false
        })
      })

      describe('$and with $or field inside', () => {
        it('correct', () => {
          expect(compare.compare(35, {
            $and: {
              $lte: 50,
              $or: {
                $lt: 10,
                $gt: 15
              }
            }
          })).to.be.true
        })
        it('correct - position $or', () => {
          expect(compare.compare(35, {
            $and: {
              $or: {
                $lt: 10,
                $gt: 15
              },
              $lte: 50
            }
          })).to.be.true
        })
        it('wrong first value in $and', () => {
          expect(compare.compare(60, {
            $and: {
              $lte: 50,
              $or: {
                $lt: 10,
                $gt: 15
              }
            }
          })).to.be.false
        })
        it('wrong second value in $and - position $or', () => {
          expect(compare.compare(60, {
            $and: {
              $or: {
                $lt: 10,
                $gt: 15
              },
              $lte: 50
            }
          })).to.be.false
        })
        it('wrong second value in $and ($or)', () => {
          expect(compare.compare(11, {
            $and: {
              $lte: 50,
              $or: {
                $lt: 10,
                $gt: 15
              }
            }
          })).to.be.false
        })
        it('wrong first value in $and ($or) - change position of $or', () => {
          expect(compare.compare(11, {
            $and: {
              $or: {
                $lt: 10,
                $gt: 15
              },
              $lte: 50
            }
          })).to.be.false
        })
      })

      describe('$or with $and field inside', () => {
        it('correct', () => {
          expect(compare.compare(35, {
            $or: {
              $lte: 50,
              $and: {
                $lt: 40,
                $gt: 10
              }
            }
          })).to.be.true
        })
        it('correct - position $and', () => {
          expect(compare.compare(35, {
            $or: {
              $and: {
                $lt: 40,
                $gt: 10
              },
              $lte: 50
            }
          })).to.be.true
        })
        it('correct but $and is wrong', () => {
          expect(compare.compare(35, {
            $or: {
              $lte: 50,
              $and: {
                $lt: 20,
                $gt: 10
              }
            }
          })).to.be.true
        })
        it('correct but $and is wrong - position $and', () => {
          expect(compare.compare(35, {
            $or: {
              $and: {
                $lt: 20,
                $gt: 10
              },
              $lte: 50
            }
          })).to.be.true
        })
        it('correct but the first value is wrong', () => {
          expect(compare.compare(35, {
            $or: {
              $lte: 20,
              $and: {
                $lt: 50,
                $gt: 10
              }
            }
          })).to.be.true
        })
        it('correct but the first value is wrong - postion $and', () => {
          expect(compare.compare(35, {
            $or: {
              $and: {
                $lt: 50,
                $gt: 10
              },
              $lte: 20
            }
          })).to.be.true
        })
        it('wrong all values', () => {
          expect(compare.compare(35, {
            $or: {
              $lte: 20,
              $and: {
                $lt: 20,
                $gt: 10
              }
            }
          })).to.be.false
        })
        it('wrong all values - position $and', () => {
          expect(compare.compare(35, {
            $or: {
              $and: {
                $lt: 20,
                $gt: 10
              },
              $lte: 20
            }
          })).to.be.false
        })
      })
    })
  })

  describe('checkOperatorsAndExecute', () => {
    describe('$eq', () => {
      it('correct', () => {
        expect(compare.checkOperatorsAndExecute(20, 20, '$eq')).to.be.true
      })
      it('wrong', () => {
        expect(compare.checkOperatorsAndExecute(20, 21, '$eq')).to.be.false
      })
    })
    describe('$ne', () => {
      it('correct', () => {
        expect(compare.checkOperatorsAndExecute(20, 21, '$ne')).to.be.true
      })
      it('wrong', () => {
        expect(compare.checkOperatorsAndExecute(20, 20, '$ne')).to.be.false
      })
    })
    describe('$gt', () => {
      it('correct', () => {
        expect(compare.checkOperatorsAndExecute(21, 20, '$gt')).to.be.true
      })
      it('wrong', () => {
        expect(compare.checkOperatorsAndExecute(20, 21, '$gt')).to.be.false
      })
    })
    describe('$gte', () => {
      it('correct', () => {
        expect(compare.checkOperatorsAndExecute(21, 20, '$gte')).to.be.true
      })
      it('correct equal', () => {
        expect(compare.checkOperatorsAndExecute(20, 20, '$gte')).to.be.true
      })
      it('wrong', () => {
        expect(compare.checkOperatorsAndExecute(20, 21, '$gte')).to.be.false
      })
    })
    describe('$lt', () => {
      it('correct', () => {
        expect(compare.checkOperatorsAndExecute(20, 21, '$lt')).to.be.true
      })
      it('wrong', () => {
        expect(compare.checkOperatorsAndExecute(21, 20, '$lt')).to.be.false
      })
    })
    describe('$lte', () => {
      it('correct', () => {
        expect(compare.checkOperatorsAndExecute(20, 21, '$lte')).to.be.true
      })
      it('correct equal', () => {
        expect(compare.checkOperatorsAndExecute(20, 20, '$lte')).to.be.true
      })
      it('wrong', () => {
        expect(compare.checkOperatorsAndExecute(21, 20, '$lte')).to.be.false
      })
    })
    describe('Different value', () => {
      it('correct', () => {
        expect(compare.checkOperatorsAndExecute(20, 21, '$test')).to.be.false
      })
    })
  })

  describe('Individual methods', () => {
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
  })
})
