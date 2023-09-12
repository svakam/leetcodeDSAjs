// https://leetcode.com/problems/count-of-smaller-numbers-after-self/
// https://leetcode.com/problems/count-of-smaller-numbers-after-self/solutions/445769/merge-sort-clear-simple-explanation-with-examples-o-n-lg-n/ 
// given int array nums, return int array "counts" where counts[i] is number of smaller elements to the right of nums[i]
// e.g. [5,2,6,1] -> [2,1,1,0]


// time: O(n^2), space: O(1)
function countSmallerBF(nums) {
    const output = new Array(nums.length).fill(0)

    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[j] < nums[i]) {
                output[i]++
            }
        }
    }

    return output
}

console.log(countSmallerBF([5,2,6,1]), [2,1,1,0])



// merge sort, except increment count when left side greater than right side
function mergeAndCount(arr, left, right, counts) {
    const merged = []
    let leftIdx = 0, rightIdx = 0

    // get counts of left > right
    for (let i = 0; i < left.length; i++) {
        for (let j = 0; j < right.length; j++) {
            if (left[i] > right[j]) {
                console.log(left[i], arr.indexOf())
                // console.log(left[i], right[j], arr.indexOf(left[i]))
                counts[arr.indexOf(left[i])]++ // only increment count of this element if current left greater than current right
            }
        }
    }

    // while merging arrays, increment counter
    while (leftIdx < left.length && rightIdx < right.length) {
        if (left[leftIdx] < right[rightIdx]) {
            merged.push(left[leftIdx])
            leftIdx++
        } else {
            merged.push(right[rightIdx])
            rightIdx++
        }
    }

    while (leftIdx < left.length) {
        merged.push(left[leftIdx])
        leftIdx++
    }

    while (rightIdx < right.length) {
        merged.push(right[rightIdx])
        rightIdx++
    }

    return merged
}

function countSmaller(arr, counts = new Array(arr.length).fill(0)) {

    function helper(arr, counts) {
        if (arr.length === 1) {
            return arr
        }
    
        let mid = Math.floor(arr.length / 2)
        
        // left and right arrays
        let left = helper(arr.slice(0, mid), counts)
        console.log(left)
        let right = helper(arr.slice(mid), counts)

        return mergeAndCount(arr, left, right, counts)
    }

    helper(arr, counts)

    return counts
}

// cs([5,2,6,1])
    // left = cs([5,2], [0,0,0,0])
        // left = cs([5]), [0,0,0,0]
        // right = cs([2], [0,0,0,0])
        // mergeAndCount([5], [2], [0,0,0,0])
            // output = [2,5]
            // counts[arr.indexOf(5)]++
            // return output
        // returned [2,5]
    // right = cs([6,1], [0,0,0,0])
        // left = cs([6], [0,0,0,0])
        // right = cs([1], [0,0,0,0])
        // mergeAndCount([6], [1], [1,0,0,0])
            // output = [1,6]
            // counts[arr.indexOf(6)]++
            // return output
        // returned [1,6]
    // mergeAndCount([2,5],[1,6],[2,1,1,0])
    //                  l     r
        // output = [1,2,5,6]
        

console.log(countSmaller([5,2,6,1]), [2,1,1,0])