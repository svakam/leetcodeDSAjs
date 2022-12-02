function findClosestValueBST(tree, target) {
    helper(tree, target, tree.value)
}

function helper(node, target, closest) {
    if (!node) return closest

    // find diff of curr value and set closest to value if closer than closest
    if (Math.abs(target - closest) > Math.abs(node.value - closest)) {
        closest = node.value
    } 

    // traverse only down necessary path; if target is smaller than curr value, going down left will get closer to closest, going right will go farther, so no point
    if (target < node.value) {
        helper(node.left, target, closest)
    } else if (target > node.value) {
        helper(node.right, target, closest)
    } else { // if equal, just return this
        return closest
    }
}

class BST {
    constructor(value, left=null, right=null) {
        this.value = value
        this.left = left
        this.right = right
    }
}