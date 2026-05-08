const findTheOldest = function(array) {
    let max = 0
    let oldest = undefined
    for (const person of array) {
        let end = person["yearOfDeath"] || new Date().getFullYear()
        let start = person["yearOfBirth"]
        if (end - start > max) {
            max = end-start
            oldest = person
        }
    }
    return oldest

};

// Do not edit below this line
module.exports = findTheOldest;
