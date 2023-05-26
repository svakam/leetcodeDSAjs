/*
'''
Given the root of a binary tree, collect a tree's nodes by level from the leaves up. Return an array of arrays 
representing the values of the leaves at each iteration.

The result will have the leaves of the tree (no matter the depth from the root) in the first array (index zero), 
and then the root will be in the last by itself. See the examples below.
 
  
EXAMPLE(S)
Input:
    1
   / \
  2   3
 / \   
4   5    

Output:
[[4, 5, 3], [2], [1]]
*/ 

class TNode {
    constructor(val, left = null, right = null) {
        this.val = val,
        this.left = left,
        this.right = right
    }
}

function getLeafNodes(root) {
    if (!root) return null
    const output = []

    function helper(node) {
        if (!node) return -1

        let left = helper(node.left), right = helper(node.right), level
        
        if (left < 0 && right < 0) {
            // if both children are null, we have reached leaf: push value at output[0]
            level = 0
        } else {
            // at any node, we want its correct level; the only way to know this is after its left and right are traversed to find
            // which level this node is at and should be pushed to; it will be the max of left and right's level + 1
            level = Math.max(left, right) + 1 
        }
        output[level] ? output[level].push(node.val) : output.push([node.val])
        return level
    }

    helper(root)
    return output
}

let tree = new TNode(1) // [[1]]
console.log(getLeafNodes(tree), [[1]])
tree = new TNode(1, new TNode(2)) // [[2], [1]]
console.log(getLeafNodes(tree), [[2], [1]])
tree = new TNode(1, new TNode(2), new TNode(3)) // [[2,3], [1]] 
console.log(getLeafNodes(tree), [[2,3], [1]])
tree = new TNode(1, new TNode(2, new TNode(4), new TNode(5)), new TNode(3))
console.log(getLeafNodes(tree), [[4,5,3], [2], [1]])
tree = new TNode(1, new TNode(2, new TNode(4), new TNode(5, null, new TNode(6, null, new TNode(7)))), new TNode(3))
console.log(getLeafNodes(tree), [[4,7,3], [6], [5], [2], [1]])

// EXAMPLE(S)
// Input:
//     1
//    / \
// 3 2   3
//  / \   
// 4   5  2  
//  0   \
//       6    1
//        \
//         7    0

// output = [[4]]
// output = [[4, 7]]
// output = [[4, 7], [6]]
// output = [[4, 7], [6], [5]]
// output = [[4, 7], [6], [5], [2]]
// output = [[4, 7, 3], [6], [5], [2], [1]]
