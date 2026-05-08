const convertToCelsius = function(f) {
  let c = (f - 32) * (5/9)
  if (Number.isInteger(c)) {return c}
  return c.toFixed(1)
};

const convertToFahrenheit = function(c) {
  let f = (9/5)*c + 32
  if (Number.isInteger(f)) {return f}
  return f.toFixed(1)
};

/*Because we are human, we want the result temperature to be rounded to one decimal place: i.e., `convertToCelsius(100)` should return `37.8` and not `37.77777777777778`.
*/

// Do not edit below this line
module.exports = {
  convertToCelsius,
  convertToFahrenheit
};
