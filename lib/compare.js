'use strict'

const {
  isEqual,
  isNotEqual,
  isGreaterThan,
  isGreaterThanOrEqual,
  isLessThan,
  isLessThanOrEqual,
  isInclude,
  isNotInclude,
  isSameSize,
  isNotSameSize,
  isRegexMatch,
  isNotRegexMatch
} = require('./comparison')

const {
  andLogical,
  orLogical,
  notLogical
} = require('./logical')

const cmpMap = {
  $eq: isEqual,
  $ne: isNotEqual,
  $gt: isGreaterThan,
  $gte: isGreaterThanOrEqual,
  $lt: isLessThan,
  $lte: isLessThanOrEqual,
  $in: isInclude,
  $nin: isNotInclude,
  $size: isSameSize,
  $nsize: isNotSameSize,
  $regex: isRegexMatch,
  $nregex: isNotRegexMatch,
  $and: executeLogicalOperator(andLogical),
  $or: executeLogicalOperator(orLogical),
  $all: executeLogicalOperator(andLogical),
  $not: executeLogicalOperator(notLogical)
}

const allOperators = Object.keys(cmpMap)

function interatorValues (value, operator, item) {
  if (!allOperators.includes(item)) {
    throw new Error(`The operator ${item} is incorrect. Valid operator: ${allOperators.join(', ')}`)
  }
  return cmpMap[item](value, operator[item], item)
}

function executeLogicalOperator (funcLogical) {
  return (value, operator, key) => {
    const keys = Object.keys(operator)
    return funcLogical(keys, interatorValues, value, operator)
  }
}

function compare (value, operator) {
  if (!operator) { throw new Error('You need to insert an operator') }
  const keys = Object.keys(operator)
  return interatorValues(value, operator, keys[0])
}

module.exports = {
  compare
}
