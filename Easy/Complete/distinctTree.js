class Node {
    constructor(val, left = null, right = null) {
        this.val = val
        this.left = left
        this.right = right
    }
}

function isDistinct(root) {
    if (!root) return true

    console.log(root.val)
    if (root.left && root.right) {
        // console.log(root.left.val)
        if (root.left.val === root.right.val) return false
    }
    return isDistinct(root.left) && isDistinct(root.right)
}

let tree1 = new Node(1)
let tree2 = new Node(1, new Node(2))
let tree3 = new Node(1, null, new Node(2))
let tree4 = new Node(1, new Node(2), new Node(2))
let tree5 = new Node(1, null, new Node(2, new Node(3, null, new Node(4))))
let tree6 = new Node(1, null, new Node(2, new Node(3, null, new Node(4)), new Node(3)))
console.log(isDistinct(tree1), true)
console.log(isDistinct(tree2), true)
console.log(isDistinct(tree3), true)
console.log(isDistinct(tree4), false)
console.log(isDistinct(tree5), true)
console.log(isDistinct(tree6), false)