// given binary tree, modify each node value to be the sum of itself + its parent (before modification) - return the root

class TNode {
    constructor(val, left = null, right = null) {
        this.val = val,
        this.left = left,
        this.right = right
    }
}

function addParentNode(root) {

    function helper(node, parentVal = 0) {
        if (!node) return null

        helper(node.left, node.val)
        helper(node.right, node.val)

        node.val += parentVal
        return
    }

    helper(root)
    return root
}

let tree1 = new TNode(1, new TNode(2), new TNode(4)) // 1 3 5
let tree2 = new TNode(1, new TNode(3, new TNode(3)), new TNode(4)) // 1 4 6 5
console.log(addParentNode(tree1))
console.log(addParentNode(tree2))