class Node {
    constructor(val, left=null, right=null) {
        this.val = val,
        this.left = left,
        this.right = right
    }
}

function arrayToBST(arr) {
    function helper(start, count) {
      if (count === 0) {
        return null;
      }
  
      const middle = start + Math.floor(count / 2);
      const root = new Node(arr[middle])
      root.left = helper(start, middle - start);
      root.right = helper(middle + 1, count - (middle - start + 1));
  
      return root;
    } 
  
    return helper(0, arr.length);   
  }

// assume sorted arr
let arr = []
let arr2 = [1]
let arr3 = [1,2,3,4,5,6]
let arr4 = [-3,5,10,12,14]


console.log(arrayToBST(arr3))