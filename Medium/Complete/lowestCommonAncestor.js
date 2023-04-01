// lowest common ancestor of two nodes in tree
class Node {
    constructor(val, left = null, right = null) {
        this.val = val,
        this.left = left,
        this.right = right
    }
}

function getLowestCommonAncestor(root, val1, val2) {
    if (!root) return null

    function helper(node) {
        if (!node) return null

        // curr node can be either of the vals, or none of them
        // if one of the vals, return this value
        // if left and right are both the vals, return this value
        // if none of them, return null

        if (node.val === val1 || node.val === val2) return node.val
        let left = helper(node.left), right = helper(node.right)
        if (left && right) return node.val
        if (left && !right) return left
        if (!left && right) return right

        return null
    }

    return helper(root)
}

function bfsLevels(root) {
    if (!root) return null
    let output = []
    let q = [root]

    while (q.length > 0) {
        let level = []
        let levelLen = q.length
        while (levelLen > 0) {
            let temp = q.shift()
            level.push(temp.val)
            if (temp.left) q.push(temp.left)
            if (temp.right) q.push(temp.right)
            levelLen--
        }
        output.push(level)
    }
    return output
}

//         1
//       2   3
//     4  5 6  7
//       8       9
let tree1 = new Node(1, new Node(2, new Node(4), new Node(5, new Node(8))), new Node(3, new Node(6), new Node(7, null, new Node(9))))

// console.log(bfsLevels(tree1))
console.log(getLowestCommonAncestor(tree1, 1, 2), 1)
console.log(getLowestCommonAncestor(tree1, 2, 4), 2)
console.log(getLowestCommonAncestor(tree1, 2, 5), 2)
console.log(getLowestCommonAncestor(tree1, 2, 8), 2)
console.log(getLowestCommonAncestor(tree1, 2, 3), 1)
console.log(getLowestCommonAncestor(tree1, 4, 3), 1)
console.log(getLowestCommonAncestor(tree1, 4, 9), 1)
console.log(getLowestCommonAncestor(tree1, 6, 9), 3)
console.log(getLowestCommonAncestor(tree1, 3, 9), 3)
console.log(getLowestCommonAncestor(tree1, 8, 9), 1)
