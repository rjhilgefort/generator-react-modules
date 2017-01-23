const R = require('ramda');

module.exports.containsAll = R.curry((values, data) =>
  R.pipe(
    R.ifElse(
      R.isArrayLike,
      R.identity,
      R.append(R.identity, [])
    ),
    R.difference(R.__, data),
    R.isEmpty
  )(values));

module.exports.uniqSortByArray = R.curry((specArray, data) =>
  R.filter(
    R.contains(R.__, data),
    specArray
  ));
