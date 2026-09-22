const {capitalize, reverseString, calculator, caesarCipher, analyzeArray} = require('./functions');

test('capitalize apple', () => {
  expect(capitalize('apple')).toBe('Apple');
});

test('empty string', () => {
  expect(capitalize('')).toBe('');
});

test('empty string', () => {
  expect(reverseString('')).toBe('');
});
test('apple -> elppa', () => {
  expect(reverseString('apple')).toBe('elppa');
});

test('calculator add 1+2', () => {
  expect(calculator.add(1,2)).toBe(3);
});
test('calculator subtract 1+2', () => {
  expect(calculator.subtract(1,2)).toBe(-1);
});
test('calculator multiply 1+2', () => {
  expect(calculator.multiply(1,2)).toBe(2);
});
test('calculator divide 1+2', () => {
  expect(calculator.divide(1,2)).toBeCloseTo(.5);
});

test('caesarCipher', () => {
  expect(caesarCipher('xyz', 3)).toBe('abc');
});
test('caesarCipher', () => {
  expect(caesarCipher('HeLLo', 3)).toBe('KhOOr');
});
test('caesarCipher', () => {
  expect(caesarCipher('Hello, World!', 3)).toBe('Khoor, Zruog!');
});

test('analyzeArray', () => {
  expect(analyzeArray([1,8,3,4,2,6])).toEqual({
   average: 4,
   min: 1,
   max: 8,
   length: 6
  })
});