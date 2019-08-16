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
        expect(() => compare.compare(20, { $eu: 10 })).to.throw(/The operator \$eu is incorrect. Valid operator: \$eq, \$ne, \$gt, \$gte, \$lt, \$lte, \$in, \$nin, \$size, \$nsize, \$regex, \$nregex, \$and, \$or, \$all/)
      })
      it('Compare with some options not correct and other correct', () => {
        expect(() => compare.compare(20, { $and: { $eq: 20, other: 10 } })).to.throw(/The operator other is incorrect. Valid operator: \$eq, \$ne, \$gt, \$gte, \$lt, \$lte, \$in, \$nin, \$size, \$nsize, \$regex, \$nregex, \$and, \$or, \$all/)
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
      describe('$in field', () => {
        it('correct', () => {
          expect(compare.compare([1, 2, 3], { $in: 2 })).to.be.true
        })
        it('wrong', () => {
          expect(compare.compare([1, 2, 3], { $in: 4 })).to.be.false
        })
      })
      describe('$in field', () => {
        it('correct', () => {
          expect(compare.compare([1, 2, 3], { $in: 2 })).to.be.true
        })
        it('wrong', () => {
          expect(compare.compare([1, 2, 3], { $in: 4 })).to.be.false
        })
      })
      describe('$nin field', () => {
        it('correct', () => {
          expect(compare.compare([1, 2, 3], { $nin: 4 })).to.be.true
        })
        it('wrong', () => {
          expect(compare.compare([1, 2, 3], { $nin: 2 })).to.be.false
        })
      })
      describe('$size field', () => {
        it('correct', () => {
          expect(compare.compare([1, 2, 3], { $size: 3 })).to.be.true
        })
        it('wrong', () => {
          expect(compare.compare([1, 2, 3], { $size: 2 })).to.be.false
        })
      })
      describe('$nsize field', () => {
        it('correct', () => {
          expect(compare.compare([1, 2, 3], { $nsize: 2 })).to.be.true
        })
        it('wrong', () => {
          expect(compare.compare([1, 2, 3], { $nsize: 3 })).to.be.false
        })
      })
      describe('$regex field', () => {
        it('correct', () => {
          expect(compare.compare('123', { $regex: '^[0-9]+' })).to.be.true
        })
        it('wrong', () => {
          expect(compare.compare('asd', { $regex: '^[0-9]+' })).to.be.false
        })
      })
      describe('$nregex field', () => {
        it('correct', () => {
          expect(compare.compare('asd', { $nregex: '^[0-9]+' })).to.be.true
        })
        it('wrong', () => {
          expect(compare.compare('123', { $nregex: '^[0-9]+' })).to.be.false
        })
      })
    })

    describe('Should compare with logical operators fields', () => {
      describe('$all field', () => {
        it('correct', () => {
          expect(compare.compare(35, { $all: { $lte: 50, $gt: 20 } })).to.be.true
        })
        it('wrong greater than', () => {
          expect(compare.compare(100, { $all: { $lte: 50, $gt: 20 } })).to.be.false
        })
        it('wrong less than', () => {
          expect(compare.compare(10, { $all: { $lte: 50, $gt: 20 } })).to.be.false
        })
      })
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
})
