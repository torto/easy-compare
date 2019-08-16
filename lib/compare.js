'use strict'

const cmpMap = {
  $eq: isEqual,
  $ne: isNotEqual,
  $gt: isGreaterThan,
  $gte: isGreaterThanOrEqual,
  $lt: isLessThan,
  $lte: isLessThanOrEqual,
  $and: checkOperator,
  $or: checkOperator
}

const allOperators = Object.keys(cmpMap)

function isEqual (value, comparation) {
  return value === comparation
}

function isNotEqual (value, comparation) {
  return value !== comparation
}

function isGreaterThan (value, comparation) {
  return value > comparation
}

function isGreaterThanOrEqual (value, comparation) {
  return value >= comparation
}

function isLessThan (value, comparation) {
  return value < comparation
}

function isLessThanOrEqual (value, comparation) {
  return value <= comparation
}

function checkOperatorsAndExecute (value, comparation, operator) {
  try {
    return cmpMap[operator](value, comparation, operator)
  } catch (err) {
    if (err.message.match(/cmpMap\[operator\] is not a function/)) {
      return false
    }

    throw err
  }
}

function interatorValues (value, operator, item) {
  if (!allOperators.includes(item)) {
    throw new Error(`The operator ${item} is incorrect. Valid operator: ${allOperators.join(', ')}`)
  }
  return checkOperatorsAndExecute(value, operator[item], item)
}

function checkOperator (value, operator, key) {
  const keys = Object.keys(operator)
  if (isEqual(key, '$or')) {
    return keys.some(interatorValues.bind(null, value, operator))
  }
  return keys.every(interatorValues.bind(null, value, operator))
}

function compare (value, operator) {
  if (!operator) { throw new Error('You need to insert an operator') }
  const keys = Object.keys(operator)
  return interatorValues(value, operator, keys[0])
}

module.exports = {
  compare,
  isEqual,
  isNotEqual,
  isGreaterThan,
  isGreaterThanOrEqual,
  isLessThan,
  isLessThanOrEqual,
  checkOperatorsAndExecute
}
