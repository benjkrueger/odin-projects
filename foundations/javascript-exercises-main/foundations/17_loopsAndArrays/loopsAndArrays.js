function camelize(str) {
    return str
        .split('-')
        .map((word, index) => index == 0 ? 
            word : word[0].toUpperCase() + word.slice(1))
        .join('')
    return ret
}

function filterRange(arr, a, b) {
    return arr.filter((elem) => elem >= a && elem <= b)
}

function filterRangeInPlace(arr, a, b) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < a || arr[i] > b) {
            arr.splice(i, 1)
            i--
        }
    }
    alert(arr)
  }