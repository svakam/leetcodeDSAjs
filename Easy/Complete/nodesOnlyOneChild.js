class Node {
    constructor(val, left = null, right = null) {
        this.val = val
        this.left = left
        this.right = right
    }
}

function fetchNodes(root) {
    let values = []
    
    let recurse = function(node) {
        if (!node) return

        if ((node.left && !node.right) || (!node.left && node.right)) {
            values.push(node.val)
        }
        
        recurse(node.left)
        recurse(node.right)

    }

    recurse(root)
    return values
}

let tree1 = new Node(1)
let tree2 = new Node(1, new Node(2))
let tree3 = new Node(1, null, new Node(2))
let tree4 = new Node(1, new Node(2, new Node(3)))
let tree5 = new Node(1, null, new Node(2, new Node(3, null, new Node(4))))
console.log(fetchNodes(tree1), [])
console.log(fetchNodes(tree2), [1])
console.log(fetchNodes(tree3), [1])
console.log(fetchNodes(tree4), [1,2])
console.log(fetchNodes(tree5), [1,2,3])