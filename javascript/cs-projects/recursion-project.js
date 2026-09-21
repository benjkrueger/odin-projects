const fibs = (len) => {
    let ans = []
    let num1 = 0
    let num2 = 1
    let temp
    let i = 0
    while (i < len) {
        ans.push(num1)
        temp = num1 + num2
        num1 = num2
        num2 = temp
        i++
    }
    return ans
}

const fibsRec = (len) => {
    const recurse = (len, array) => {
        if (len === 0) {
            return array
        } else if (len === 1) {
            return [0]
        } else if (len === 2) {
            return [0,1]
        } else {
            const ret_array = recurse(len-1, array)
            ret_array.push(ret_array.at(-1) + ret_array.at(-2))
            return ret_array
        }
    }
    return recurse(len, [])
}

const merge = (arr, start, mid, end) => {
    const n1 = mid - start + 1
    const n2 = end - mid

    const L = new Array(n1)
    const R = new Array(n2)
    for (let i = 0; i < n1; i++) {L[i] = arr[start + i];}
    for (let j = 0; j < n2; j++) {R[j] = arr[mid + 1 + j];}

    let i = 0, j = 0, k = start
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {arr[k] = L[i]; i++;} 
        else {arr[k] = R[j]; j++;}
        k++
    }
    while (i < n1) {arr[k] = L[i]; i++; k++;}
    while (j < n2) {arr[k] = R[j]; j++; k++;}
}

const recurseMergeSort = (array, start, end) => {
    recursion_times += 1
    console.log("RECURSE", array, start, end, recursion_times)
    if (recursion_times > 20) return
    if (start >= end) return
    let mid = Math.floor(start + (end - start) / 2)
    recurseMergeSort(array, start, mid)
    recurseMergeSort(array, mid+1, end)
    merge(array, start, mid, end)
}

const mergeSort = (array) => {
    recurseMergeSort(array, 0, array.length-1)
}

var recursion_times = 0
let a = [248,260,203,123,804,43,186,620]
console.log(mergeSort(a))
console.log(a)