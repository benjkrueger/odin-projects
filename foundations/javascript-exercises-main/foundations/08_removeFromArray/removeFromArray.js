const removeFromArray = function(array, n) {
    return array.filter((elem) => elem !== n)
    /*ret = []
    for (const elem of array) {
        if (elem !== n) {ret.push(elem)}
    }
    return ret*/
};

// Do not edit below this line
module.exports = removeFromArray;
