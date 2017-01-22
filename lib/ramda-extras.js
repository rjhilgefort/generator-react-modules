const R = require('ramda');

module.exports.containsAll = R.curry((values, data) =>
  R.pipe(
    R.ifElse(
      R.isArrayLike,
      R.identity,
      R.append(R.identity, [])
    ),
    (values) =>
      R.equals(
        values,
        R.intersection(values, data)
      )
  )(values));

module.exports.uniqSortByArray = R.curry((specArray, data) =>
  R.filter(
    specElement => R.contains(specElement, data),
    specArray
  ));
