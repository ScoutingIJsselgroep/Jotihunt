const _ = require('lodash');

export default function (array) {
  const avg = _.sum(array) / array.length;
  return Math.sqrt(_.sum(_.map(array, (i) => Math.pow((i - avg), 2))) / array.length);
}
