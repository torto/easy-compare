# Easy-compare [![Build Status](https://travis-ci.org/torto/easy-compare.svg?branch=master)](https://travis-ci.org/torto/easy-compare) #

This library is a way to execute comparison with a JSON pre-defined. It is using the same pattern of Mongodb operators.

## Install ##

```bash
$ npm install --save easy-compare
```

## Usage ##

A simple example:


```js
const easy = require('easy-compare');

const operator = {
    $and: {
        $lt: 20,
        $gt: 10
    }
}

console.log(easy.compare(15, operator)); //true
console.log(easy.compare(9, operator)); //false
console.log(easy.compare(30, operator)); //false

```

## Methods ##

### compare(value, operator) ###

**value**

The dynamic value that needs to be compared

**operator**

A Object with information to check if the value is correct.

Ps: `operator` accept only one field in the object, if you need to use more than one operator you need to insert these operators inner the `$and` or `$or` field.

#### Operator properties ####

* **Comparison Operators**

| Value | Description |
| -- | -- |
| `$eq` | Verify if the value is Equal|
| `$ne` | Verify if the value is **not** Equal|
| `$gt` | Verify if the value is is Greater Than|
| `$gte` | Verify if the value is is Greater Than or Equal|
| `$lt` | Verify if the value is is Less Than |
| `$lte` | Verify if the value is is Less Than or Equal|

* **Logical Operators**

| Value | Description |
| -- | -- |
| `$and` | Operator to check more than one value with the **AND** logic|
| `$or` | Operator to check more than one value with the **OR** logic|
