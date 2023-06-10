class TNode {
    constructor(val, left = null, right = null) {
        this.val = val,
        this.left = left,
        this.right = right
    }
}

var maxPathSum = function(root) {
    var max = -Number.MAX_VALUE
    getMaxSum(root)
    return max

    function getMaxSum(node) {
        if (!node) return 0

        var leftSum = getMaxSum(node.left)
        var rightSum = getMaxSum(node.right)

        let currLeftSum = node.val + leftSum
        let currRightSum = node.val + rightSum
        let fullSum = node.val + leftSum + rightSum

        max = Math.max(max, fullSum)
        return Math.max(0, currLeftSum, currRightSum) // removes negative values from a path to maximize sum of valid path
    }
};

let t1 = new TNode(1, new TNode(2), new TNode(3))
console.log(maxPathSum(t1), 6)
let t2 = new TNode(-10, new TNode(9), new TNode(20, new TNode(15), new TNode(7)))
console.log(maxPathSum(t2), 42)
let t3 = new TNode(-3)
console.log(maxPathSum(t3), -3)

//                  -10
//            9           20
//                    15      7  

//      -3
//    1