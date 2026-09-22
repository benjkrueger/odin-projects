function capitalize(s) {
  if (typeof s !== "string" || s.length === 0) return s
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function reverseString(s) {
  return s.split("").reverse().join("")
}

const calculator = {
  add(a,b) {return a+b},
  subtract(a,b) {return a-b},
  multiply(a,b) {return a*b},
  divide(a,b) {return a/b},
}

function caesarCipher(str, shift) {
  const s = "abcdefghijklmnopqrstuvwxyz"
  const sU = s.toUpperCase()
  const shifted = (i) => (parseInt(i) + shift) % 26
  let dct = {}
  for (const i in s) {
    dct[s[i]] = s[shifted(i)]; 
    dct[sU[i]] = sU[shifted(i)]
  }
  ret = ""
  for (const c of str) {
    if (Object.hasOwn(dct, c)) {
      ret += dct[c]
    } else {
      ret += c
    }
  }
  return ret
}
function analyzeArray(arr) {
  const ave = arr.reduce((sum, val) => sum + val, 0) / arr.length
  const mn = Math.min(...arr)
  const mx = Math.max(...arr)
  const len = arr.length
  return {average:ave, min:mn, max:mx, length:len}
}



module.exports = {capitalize, reverseString, calculator, caesarCipher, analyzeArray};