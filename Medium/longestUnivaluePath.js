class TNode {
    constructor(val, left = null, right = null) {
        this.val = val,
        this.left = left,
        this.right = right
    }
}

function longestUniValuePath(root) {

    let longestLen = -Infinity
    
    function helper(node, parentVal) {
        // at any node:
        // check for null
        if (!node) return 0

        let leftLen = helper(node.left, node.val)
        let rightLen = helper(node.right, node.val)

        let currLongest = leftLen + rightLen
        if (currLongest > longestLen) longestLen = currLongest

        return node.val === parentVal ? Math.max(leftLen, rightLen) + 1 : 0 
        // always returning valid path: leftCurrSum, rightCurrSum; adding 1 to return value of the max of these if curr val = parent val
    }

    helper(root, root.val)
    return longestLen
}

let t1 = new TNode(5, new TNode(4, new TNode(1), new TNode(1)), new TNode(5, null, new TNode(5)))
console.log(longestUniValuePath(t1), 2)
let t2 = new TNode(1, new TNode(4, new TNode(4), new TNode(4)), new TNode(5, null, new TNode(5)))
console.log(longestUniValuePath(t2), 2)

//          5
//      4      5
//   1    1       5