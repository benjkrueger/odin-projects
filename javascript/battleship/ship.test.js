const Ship = require("./ship.js")

describe('Ship Class', () => {
    // 1. Declare the variable at the describe level
    let ship;

    // 2. Re-initialize a fresh Ship before EVERY test runs
    beforeEach(() => {
        ship = new Ship(3);
    });

    test('should not be sunk after only two hits', () => {
        ship.hit()
        ship.hit()
        expect(ship.isSunk()).toBe(false)
        ship.hit()
        expect(ship.isSunk()).toBe(true)
    })
})