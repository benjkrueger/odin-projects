const reverseString = function(s) {
    let ret = ""
    for (const c of s) {
        ret = c + ret
    }
    return ret
};

// Do not edit below this line
module.exports = reverseString;
