const R = require('ramda');

module.exports.containsAll = R.curry((values, subject) =>
   R.equals(values, R.intersection(values, subject)));
