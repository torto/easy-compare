'use strict'

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

function isInclude (value, comparation) {
  return value.includes(comparation)
}

function isNotInclude (value, comparation) {
  return !value.includes(comparation)
}

function isSameSize (value, comparation) {
  return value.length === comparation
}

function isNotSameSize (value, comparation) {
  return value.length !== comparation
}

function isRegexMatch (value, comparation) {
  return new RegExp(comparation).test(value)
}
function isNotRegexMatch (value, comparation) {
  return !new RegExp(comparation).test(value)
}

module.exports = {
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
}
