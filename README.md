# Easy-compare [![Build Status](https://travis-ci.org/torto/easy-compare.svg?branch=master)](https://travis-ci.org/torto/easy-compare) [![Coverage Status](https://coveralls.io/repos/github/torto/easy-compare/badge.svg?branch=master)](https://coveralls.io/github/torto/easy-compare?branch=master) [![install size](https://packagephobia.now.sh/badge?p=easy-compare)](https://packagephobia.now.sh/result?p=easy-compare) #

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
| `$gt` | Verify if the value is Greater Than|
| `$gte` | Verify if the value is Greater Than or Equal|
| `$lt` | Verify if the value is Less Than |
| `$lte` | Verify if the value is Less Than or Equal|
| `$in` | Verify if the value is include in array or string|
| `$nin` | Verify if the value is **not** include in array or string|
| `$size` | Verify if the value is the same size|
| `$nsize` | Verify if the value is **not** the same size|
| `$regex` | Verify if the regex find a match|
| `$nregex` | Verify if the regex **not** find a match|

* **Logical Operators**

| Value | Description |
| -- | -- |
| `$and` | Operator to check more than one value with the **AND** logic|
| `$or` | Operator to check more than one value with the **OR** logic|
| `$all` | Operator execute the same the all (just a alias)|
| `$not` | Operator to check if all operator is false|

## Examples ##

```js
const easy = require('easy-compare');

//Comparison Operators

// $eq
console.log('$eq -', 'Have to be true:', easy.compare(1, { $eq: 1 }));
console.log('$eq -', 'Have to be false:', easy.compare(1, { $eq: 2 }));

//$ne
console.log('$ne -', 'Have to be true:', easy.compare(1, { $ne: 2 }));
console.log('$ne -', 'Have to be false:', easy.compare(1, { $ne: 1 }));

//$gt
console.log('$gt -', 'Have to be true:', easy.compare(10, { $gt: 5 }));
console.log('$gt -', 'Have to be false:', easy.compare(1, { $gt: 5 }));

//$gte
console.log('$gte -', 'Have to be true:', easy.compare(1, { $gte: 1 }));
console.log('$gte -', 'Have to be false:', easy.compare(1, { $gte: 2 }));

//$lt
console.log('$lt -', 'Have to be true:', easy.compare(1, { $lt: 10 }));
console.log('$lt -', 'Have to be false:', easy.compare(10, { $lt: 5 }));

//$lte
console.log('$lte -', 'Have to be true:', easy.compare(10, { $lte: 10 }));
console.log('$lte -', 'Have to be false:', easy.compare(10, { $lte: 5 }));

//$in
console.log('$in -', 'Have to be true:', easy.compare([10, 2, 3], { $in: 10 }));
console.log('$in -', 'Have to be false:', easy.compare([10, 2, 3], { $in: 5 }));

//$nin
console.log('$nin -', 'Have to be true:', easy.compare([10, 2, 3], { $nin: 5 }));
console.log('$nin -', 'Have to be false:', easy.compare([10, 2, 3], { $nin: 10 }));

//$size
console.log('$size -', 'Have to be true:', easy.compare([10, 2, 3], { $size: 3 }));
console.log('$size -', 'Have to be false:', easy.compare([10, 2, 3], { $size: 5 }));

//$nsize
console.log('$nsize -', 'Have to be true:', easy.compare([10, 2, 3], { $nsize: 5 }));
console.log('$nsize -', 'Have to be false:', easy.compare([10, 2, 3], { $nsize: 3 }));

//$regex
console.log('$regex -', 'Have to be true:', easy.compare('123', { $regex: '^[0-9]+' }));
console.log('$regex -', 'Have to be false:', easy.compare('asd', { $regex: '^[0-9]+' }));

//Logical operators

//$and - ps: $all and $and are the same
console.log('$and -', 'Have to be true:', easy.compare('123', {
    $and: {
        $regex: '^[0-9]+',
        $gt: 100
    }
}));
console.log('$and -', 'Have to be false:', easy.compare('13a', {
    $and: {
        $regex: '^[0-9]+',
        $gt: 100
    }
}));

//$all
console.log('$all -', 'Have to be true:', easy.compare('123', {
    $all: {
        $regex: '^[0-9]+',
        $gt: 100
    }
}));
console.log('$all -', 'Have to be false:', easy.compare('13a', {
    $all: {
        $regex: '^[0-9]+',
        $gt: 100
    }
}));

//$or
console.log('$or -', 'Have to be true:', easy.compare('123', {
    $or: {
        $regex: '^[0-9]+',
        $gt: 100
    }
}));
console.log('$or -', 'Have to be true:', easy.compare('13', {
    $or: {
        $regex: '^[0-9]+',
        $gt: 100
    }
}));
console.log('$or -', 'Have to be false:', easy.compare('13', {
    $or: {
        $regex: '^[a-z]+',
        $gt: 100
    }
}));

//$not
console.log('$not -', 'Have to be true:', compare.compare([35, 40, 50], { $not: { $in: 45 } }));
console.log('$not -', 'Have to be false:', compare.compare([35, 40, 50], {
  $not: {
    $in: 35,
    $and: {
      $in: 40
    }
  }
}));
```
