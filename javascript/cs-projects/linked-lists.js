

class Node {
    constructor(value=null, nextNode=null) {
        this._value = value
        this._nextNode = nextNode
    }
    set value(val) {this._value = val}
    set nextNode(nn) {this._nextNode = nn}
    get value() {return this._value}
    get nextNode() {return this._nextNode}
}

class LinkedList {
    constructor() {
        this._head = null
        this._size = 0
        this._tail = null
    }

    append(value) {
        this._size += 1
        if (this._head === null) {this._head = new Node(value, null); this._tail = this._head; return}
        this._tail.nextNode = new Node(value, null)
        this._tail = this._tail.nextNode
        /*let node = this._head
        let nextNode = node.nextNode
        while (nextNode !== null) {
            node = nextNode
            nextNode = node.nextNode
        }
        node.nextNode = new Node(value, null)
        this._tail = node.nextNode*/
    }

    prepend(value) {
        this._size += 1
        if (this._head === null) {this._head = new Node(value, null); return}
        let old_head = this._head
        this._head = new Node(value, old_head)
    }

    toString() {
        let s = ""
        if (this._head === null) {return "null"}
        let node = this._head
        while (node !== null) {
            s += `(${node.value}) -> `
            node = node.nextNode
        }
        return s + "null"
    }

    size() {return this._size}
    head() {return this._head}
    tail() {return this._tail}
    pop() {
        const ret = this._head
        if (ret !== null) {this._head = this._head.nextNode; return ret.value}
        return ret
    }
    at(index) {
        let i = 0
        let node = this._head
        while (node !== null) {
            if (i === index) {return node.value}
            i++
            node = node.nextNode
        }
        return undefined
    }
    contains(value) {
        let node = this._head
        while (node !== null) {
            if (node.value === value) {return true}
            node = node.nextNode
        }
        return false
    }
    findIndex(value) {
        let i = 0
        let node = this._head
        while (node !== null) {
            if (node.value === value) {return i}
            i++
            node = node.nextNode
        }
        return -1
    }
    insertAt(index, ...values) {
        if (index >= this._size || index < 0) {
            throw new RangeError(`${index} is out of bounds: ${this._size - 1}`)
        }
        let node = this._head
        if (index === 0) {
            const old_head = node
            this._head = new Node(values[0], null)
            node = this._head
            for (let i = 1; i < values.length; i++) {
                node.nextNode = new Node(values[i], null)
                node = node.nextNode
                this._size += 1
            }
            node.nextNode = old_head
            return
        }
        let i = 0
        while (node !== null) {
            console.log(node, i)
            if (i === index - 1) {
                const original_next_node = node.nextNode
                for (let val of values) {
                    node.nextNode = new Node(val, null)
                    node = node.nextNode
                    this._size += 1
                }
                node.nextNode = original_next_node
                return
            }
            i++
            node = node.nextNode
        }
    }
    removeAt(index) {
        if (index >= this._size || index < 0) {
            throw new RangeError(`${index} is out of bounds: ${this._size - 1}`)
        }
        let node = this._head
        let last_node = null
        let i = 0
        while (node !== null) {
            if (i === index) {
                console.log("FOUND IT", i, node.value, last_node.value, node.nextNode.value)
                if (last_node === null) {this._head = node.nextNode; this._size -= 1; return}
                last_node.nextNode = node.nextNode
                this._size -= 1
                return
            }
            i++
            last_node = node
            node = node.nextNode
        }
    }
}

const l = new LinkedList()
console.log(l)
l.append(1)
l.append(2)
l.append(3)
l.prepend(4)
console.log(l.toString(), l.size())
console.log(l.insertAt(2, 11, 12))
console.log(l.toString(), l.size())
console.log(l.insertAt(0, 13, 14))
console.log(l.toString(), l.size())
l.removeAt(3)
console.log(l.toString(), l.size())