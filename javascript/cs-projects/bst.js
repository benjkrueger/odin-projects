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
  div.textContent += `${prefix}${isLeft ? '└── ' : '┌── '}${node.value}\r\n`
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
    height(value) {
        const nodes = [this.root]
        let depth = 0
        let level
        while (nodes.length > 0) {
            let levelSize = nodes.length
            for (let i = 0; i < levelSize; i++) {
                let node = nodes.shift()
                if (node.value === value) {level = depth}
                if (node.left !== null) {nodes.push(node.left)}
                if (node.right !== null) {nodes.push(node.right)}
            }
            depth++            
        }
        return depth - 1
    }
    depth(value) {
        let h = 0
        let node = this.root
        while (value !== node.value) {
            if (value < node.value) {
                if (node.left === null) {return undefined}
                node = node.left
            } else {
                if (node.right === null) {return undefined}
                node = node.right
            }
            h++
        }
        return h
    }
    isBalanced() {}
    rebalance() {}
}

const t = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
//const t = new Tree([100, 20,200,10,30,150,300])
//t.prettyPrint()
//t.prettyPrint()


t.prettyPrint()
print(t.height(6345))
print(t.depth(6345))
//print(t.height(7))
print(t.depth(7))
//t.postOrderForEach(printVal)

// Inorder Traversal: 10 20 30 100 150 200 300
// Preorder Traversal: 100 20 10 30 200 150 300
// Postorder Traversal: 10 30 20 150 300 200 100