class TNode {
    constructor(val, left = null, right = null) {
        this.val = val,
        this.left = left,
        this.right = right
    }
}

function solution(root) {
    let max = -Infinity // global max tracker
    
    function helper(node) {
        // if null, no sum here; return 0
        if (!node) return 0
        console.log(node.val)
        // get sums from left and right sides
        let leftSum = helper(node.left)
        let rightSum = helper(node.right)
        console.log(leftSum, rightSum)
        // another possible sum is including curr node val
        let currLeftSum = leftSum + node.value
        let currRightSum = rightSum + node.value
        let fullSum = leftSum + node.value + rightSum
        
        // update global max
        max = Math.max(leftSum, rightSum, currLeftSum, currRightSum, fullSum)
        
        // can only return valid path; so exclude full sum
        return Math.max(currLeftSum, currRightSum, node.value)
    }
    
    helper(root)
    
    return max
}

let t1 = new TNode(1, new TNode(2), new TNode(3))
console.log(solution(t1), 6)
let t2 = new TNode(-10, new TNode(9), new TNode(20, new TNode(15), new TNode(7)))
// console.log(solution(t2), 42)