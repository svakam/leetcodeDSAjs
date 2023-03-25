function solution(root) {
    let max = -Infinity // global max tracker
    
    function helper(node) {
        // if null, no sum here; return 0
        if (!node) return 0
        
        // get sums from left and right sides
        let leftSum = helper(node.left)
        let rightSum = helper(node.right)
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