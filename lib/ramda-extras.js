const R = require('ramda');

module.exports.containsAll = R.curry((values, data) =>
  R.equals(
    values,
    R.intersection(values, data)
  ));

module.exports.uniqSortByArray = R.curry((specArray, data) =>
  R.filter(
    specElement => R.contains(specElement, data),
    specArray
  ));
