function hash(key) {
    
} 



class HashMap {
    constructor() {
        this.load_factor = .75
        this.capacity = 16
        this.current_load = 0
        this._length = 0
        this._keys = new Array(this.capacity)
        this._values = new Array(this.capacity)
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode %= this.capacity
        }

        return hashCode;
    }
    double_array() {
        const entries = this.entries()

        this.capacity *= 2
        this._keys = new Array(this.capacity)
        this._values = new Array(this.capacity)
        for (const entry of entries) {
            this.set(entry[0], entry[1])
        }
    }
    set(key, value) {
        if (value === undefined) {throw Error(`Must use a non-undefined value ${key} ${value}`)}
        if (this.current_load === this.load_factor) {this.double_array()}

        const index = this.hash(key)
        if (this._values[index] === undefined) {
            this._length += 1
            this.current_load = this._length / this.capacity
        } 
        else {
            console.log(`OVERWRITE: ${key}, ${value} > ${this._keys[index]}, ${this._values[index]}`)
            this._keys[index] = key
        }
        this._values[index] = value
        this._keys[index] = key
    }
    print() {console.log(this._values, this._length)}
    get(key) {
        const index = this.hash(key)
        if (this._values[index] === undefined) return null
        return this._values[index]
    }
    has(key) {
        const index = this.hash(key)
        return  (this._values[index] !== undefined)
    }
    remove(key) {
        const index = this.hash(key)
        if (this._values[index] === undefined) return false
        this._values[index] = undefined
        this._length -= 1
        this.current_load = this._length / this.capacity
        return true
    }
    length() {return this._length}
    clear() {
        this._length = 0; this.current_load = 0
        this._values = this._values.map(num => undefined)
    }
    keys() {return this._keys}
    values() {return this._values}
    entries() {
        const only_keys = this._keys.filter((key) => key !== undefined)
        const only_vals = this._values.filter((val) => val !== undefined)
        let ret = []
        for (let i in only_keys) {
            ret.push([only_keys[i], only_vals[i]])
        }
        return ret
    }

}

class HashSet extends HashMap {
    constructor() {
        super()
    }
    set(key)  {
        super.set(key, key)
    }
    values() {throw Error("There are no values in a HashSet")}
    entries() {return this._keys}
    double_array() {
        const keys = [...this._keys]

        this.capacity *= 2
        this._keys = new Array(this.capacity)
        this._values = new Array(this.capacity)
        for (const entry of keys) {
            if (entry !== undefined) {this.set(entry, entry)}
        }}
}

const test = new HashSet() // or HashMap() if using a factory

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('moon', 'silver')
test.set('a', 'a')
test.set('b', 'b')
test.set('c', 'c')
test.set('d','d')
test.set('e', 'e')
test.set('f','f')
test.set('g','g')
test.set('h','h')
test.set('i','i')
console.log(test.entries(), test.current_load)