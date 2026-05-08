const add = function(a, b) {
	return a+b
};

const subtract = function(a,b) {
	return a-b
};

const sum = function(array) {
  let ret = 0
	for (const elem in array) {
    ret += elem
  }
  return ret
};

const multiply = function(array) {
  let ret = 1
  for (const elem in array) {
    ret *= elem
  }
  return ret
};

const power = function(a,b) {
	return a ** b
};

const factorial = function(n) {
	if (n === 1) {return n}
  return (n * factorial(n-1))
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
