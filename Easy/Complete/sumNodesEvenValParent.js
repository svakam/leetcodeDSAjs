class Node {
    constructor(val, left = null, right = null) {
        this.val = val
        this.left = left
        this.right = right
    }
}

function getSum(root) {
    if (!root) return 0

    let val = root.val % 2 === 0 ? root.val : 0
    return val + getSum(root.left) + getSum(root.right)
}

let tree1 = new Node(1)
let tree2 = new Node(1, new Node(2))
let tree3 = new Node(1, null, new Node(2))
let tree4 = new Node(1, new Node(2, new Node(3)))
let tree5 = new Node(1, null, new Node(2, new Node(3, null, new Node(4))))
console.log(getSum(tree1), 0)
console.log(getSum(tree2), 2)
console.log(getSum(tree3), 2)
console.log(getSum(tree4), 2)
console.log(getSum(tree5), 6)