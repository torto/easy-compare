'use strict'

function orLogical (keys, interator, value, operator) {
  return keys.some(interator.bind(null, value, operator))
}

function andLogical (keys, interator, value, operator) {
  return keys.every(interator.bind(null, value, operator))
}

function notLogical (keys, interator, value, operator) {
  return !keys.every(interator.bind(null, value, operator))
}

module.exports = {
  andLogical,
  orLogical,
  notLogical
}
