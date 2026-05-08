const getTheTitles = function(array) {
    let ret = []
    for (const entry of array) {
        ret.push(entry['title'])
    }
    return ret
};

// Do not edit below this line
module.exports = getTheTitles;
