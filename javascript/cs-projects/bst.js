const div = document.querySelector("#div")
const cons = document.querySelector('#console')
div.textContent=""
div.setAttribute('style', 'white-space: pre;');
cons.setAttribute('style', 'white-space: pre;');


const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  div.textContent += `${prefix}${isLeft ? '└── ' : '┌── '}(${node.value}, ${node.height()})\r\n`
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

const print = (s) => {
    cons.textContent += s?.toString() + `\r\n`
}
const printVal = (s) => {
    cons.textContent += s?.value.toString() + `\r\n`
}

class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }

    inspect(depth, opts) {
        return this.value
    }

    height() {
        if (this.left === null && this.right === null) {return 0}
        else if (this.left === null) {return this.right.height() + 1}
        else if (this.right === null) {return this.left.height() + 1}
        else {return Math.max(this.left.height(), this.right.height()) + 1}
    }

}

const height_recurse = (node) => {
    if (node === null) return -1
    const left_height = height_recurse(node.left)
    const right_height = height_recurse(node.right)
    return Math.max(left_height, right_height) + 1
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array)
    }

    buildTree(array) {
        function arrayToBSTrecur(arr, start, end) {
            if (start > end) return null
            let mid = start + Math.floor((end - start) / 2)
            let root = new Node(arr[mid])
            root.left = arrayToBSTrecur(arr, start, mid - 1);
            root.right = arrayToBSTrecur(arr, mid + 1, end);
            return root;
        }
        array = array.sort(function(a,b) {return a-b})
        return arrayToBSTrecur(array, 0, array.length - 1)
    }

    prettyPrint() {
        div.textContent = ""
        prettyPrint(this.root)
    }

    includes(value) {
        let node = this.root
        while (value !== node.value) {
            if (value < node.value) {
                if (node.left === null) {return false}
                node = node.left
            } else {
                if (node.right === null) {return false}
                node = node.right
            }
        }
        return true
    }

    insert(value) {
        let node = this.root
        while (true) {
            console.log(node)
            if (value < node.value) {
                if (node.left === null) {node.left = new Node(value); return}
                node = node.left
            } else {
                if (node.right === null) {node.right = new Node(value); return}
                node = node.right
            }
        }
    }

    deleteItem(value) {
        function getSuccessor(curr) {
            curr = curr.right
            while (curr !== null && curr.left !== null) curr = curr.left
            return curr
        }
        function del(root, x) {
            if (root === null) {return root}
            if (root.value > x) {root.left = del(root.left, x)}
            else if (root.value < x) {root.right = del(root.right, x)}
            else {
                if (root.left === null) {return root.right}
                if (root.right === null) {return root.left}
                const succ = getSuccessor(root)
                root.value = succ.value
                root.right = del(root.right, succ.value)
            }
            return root
        }
        this.root = del(this.root, value)
    }
    levelOrderForEach(callback) {
        const nodes = [this.root]
        while (nodes.length > 0) {
            console.log(nodes.map((x) => x.value))
            let node = nodes.shift()
            callback(node)
            if (node.left !== null) {nodes.push(node.left)}
            if (node.right !== null) {nodes.push(node.right)}
        }
    }
    inOrderForEach(callback) {
        function inOrderTraverse(node) {
            if (node === null) {return}
            inOrderTraverse(node.left)
            callback(node)
            inOrderTraverse(node.right)
        }
        inOrderTraverse(this.root)
    }
    preOrderForEach(callback) {
        function preOrderTraverse(node) {
            if (node === null) {return}
            callback(node)
            preOrderTraverse(node.left)
            preOrderTraverse(node.right)
        }
        preOrderTraverse(this.root)
    }
    postOrderForEach(callback) {
        function postOrderTraverse(node) {
            if (node === null) {return}
            postOrderTraverse(node.left)
            postOrderTraverse(node.right)
            callback(node)
        }
        postOrderTraverse(this.root)
    }
    depth(value) {
        let depth = 0
        let node = this.root
        while (node != null) {
            if (node.value === value) {return depth}
            else if (value < node.value) {node = node.left}
            else {node = node.right}
            depth += 1
        }
        return undefined
    }

    
    height(value, current = this.root) {
        const findHeight = (node) => {
            if (!node) return -1
            let count = Math.max(findHeight(node.left), findHeight(node.right))
            return count + 1
        }
        if (current.data > value) {return this.height(value, current.left);} 
        else if (current.data < value) {return this.height(value, current.right);} 
        else {return findHeight(current);}
    }
    isBalanced() {
        const recurse = (node) => {
            if (!node) {return true}
            const leftHeight = node.left ? node.left.height() : -1;
            const rightHeight = node.right ? node.right.height() : -1; 
            
            console.log(node, leftHeight, rightHeight, Math.abs(leftHeight - rightHeight) > 1)
            if (Math.abs(leftHeight - rightHeight) > 1) {return false}
            return recurse(node.left) && recurse(node.right)
        }
        let node = this.root
        return recurse(node)
        
    }
    rebalance() {
        let array = []
        t.preOrderForEach((node) => {
            array.push(node.value)
        })
        array.sort()
        this.root = this.buildTree(array)
    }
}


const array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
const t = new Tree(array)
print(t.isBalanced())
t.levelOrderForEach(printVal)
print("------------")
t.preOrderForEach(printVal)
print("------------")
t.postOrderForEach(printVal)
print("------------")
t.inOrderForEach(printVal)
for (let i = 100; i <= 105; i++) {
  t.insert(i)
}
print(t.isBalanced())
t.rebalance()
print(t.isBalanced())
t.levelOrderForEach(printVal)
print("------------")
t.preOrderForEach(printVal)
print("------------")
t.postOrderForEach(printVal)
print("------------")
t.inOrderForEach(printVal)