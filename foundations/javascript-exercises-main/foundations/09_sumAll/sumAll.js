const sumAll = function(a, b) {
    min = (a<b) ? a : b
    max = (a>b) ? a : b
    let ret = 0
    for (let i=min; i <= max; i++) {
        ret += i;
    }
    return ret
};

// Do not edit below this line
module.exports = sumAll;
