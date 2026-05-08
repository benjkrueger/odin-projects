const fibonacci = function(index) {
    if (index <= 2) {return 1}
    else {
        let last = 1
        let current = 2
        for (let i = 3; i < index; i++) {
            let temp = current + last
            last = current
            current = temp
        }
        return current
    }
};

// Do not edit below this line
module.exports = fibonacci;
