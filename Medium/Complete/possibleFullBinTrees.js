// return a list of all possible full binary trees with n nodes
// https://leetcode.com/problems/all-possible-full-binary-trees/

class TNode {
    constructor(val, left = null, right = null) {
        this.val = val,
        this.left = left,
        this.right = right
    }
}

function getListAllFullBinaryTrees(n) {
    if (n === 0) return null

    if ((n - 1) % 2 !== 0) return null

    let root = new TNode(0)
    const output = []

    let helper = function(root, node, n) {


        // at any node, add either 0 or 2 nodes
        /*   5     4      2
                   x      x                  x             x
                        0   0              0   0         0    0
                                              0 0       0 0
                                         
                                        
        */

        // if added, go left and right to add remaining
        node.left = new TNode(0)
        node.right = new TNode(0)

        // if out of nodes, push this copy and return, else traverse
        if (n - 2 === 0) {
            output.push(root)
            return
        }
        else {
            helper(root, node.left, n - 2)
            helper(root, node.right, n - 2)
        }
    }

    helper(root, root, n - 1)
    return output
}

console.log(getListAllFullBinaryTrees(2), null)
const test = new TNode(0, new TNode(0), new TNode(0))
console.log(getListAllFullBinaryTrees(3))
console.log(getListAllFullBinaryTrees(5))