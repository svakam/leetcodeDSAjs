class Node {
    constructor(val, left = null, right = null) {
      this.val = val
      this.left = left
      this.right = right
    }
  }

function treeFold(root) {
    function reverse(root) {
      if (!root) return
      [root.left, root.right] = [root.right, root.left]
      reverse(root.left)
      reverse(root.right)
    }
  
    function combine(left, right) {
      if (left) {
        left.val += right ? right.val :  0
  
        combine(left.left, right ? right.right : null)
        combine(left.right, right ? right.left : null)
        return left
      }
      if (right) {
        // no left! Need to reverse the right and return that as the left.
        reverse(right)
        return right
      }
    }
  
    if (root) {
      root.left = combine(root.left, root.right)
      root.right = null
    }
  
    return root
  }

const complete = new TreeNode(1, 
        new TreeNode(2, 
            new TreeNode(4), new TreeNode(5)), 
        new TreeNode(3,
            new TreeNode(6), new TreeNode(7)))

//         1            
//     /       \
//              3       
//             /  \
//            7    6    
// 

//   LHS,    RHS
//        1
//     2     3 [2,3]