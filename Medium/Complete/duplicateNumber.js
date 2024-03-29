// https://leetcode.com/problems/find-the-duplicate-number/editorial/
// find repeated number in n + 1 integers where each integer is in [1, n] inclusive
// [1,8] = [1,2,3,4,5,6,7,8]
// dup = [1,2,3,3,4,5,6,7,8]
// in constant extra space

// 7 approaches: SSNHBBF
// single secular nuns hold beliefs beyond foolishness
// sort, set, negative, hashmap, bit, binary, floyd

// approach 1: sort 
// ts: O(nlogn), O(logn)
function findDuplicateSort(nums) {
    nums.sort((a, b) => a - b)
    for (let i = 1; i < nums.length; i++) {
        if (nums[i - 1] === nums[i]) return nums[i]
    }

    return -1
}

// approach 2: set
// ts: O(n), O(n)
function findDuplicateSet(nums) {
    const set = new Set()
    for (let i = 0; i < nums.length; i++) {
        if (set.has(nums[i])) return nums[i]
        set.add(nums[i])
    }
    return -1
}

// approach 3: negative marking (mark the index represented by curr elem as negative)
// nums from [1,n] with +1 means there is no 0 for 0 index and a duplicate exists
// ts: O(n), O(1)
function findDuplicateNegativeMarking(nums) {
    for (let i = 0; i < nums.length; i++) {
        let curr = Math.abs(nums[i])
        if (nums[curr] < 0) return curr
        nums[curr] *= -1
    }

    // restore
    for (let i = 0; i < nums.length; i++) {
        nums[i] = Math.abs(nums[i])
    }

    return -1
}

// approach 4: hashmap iterative and recursive
// since elements are in [1,n], there is no 0 for index 0, thus use in swapping to swap elems to 
// correct index until duplicate found (nums[0] == nums[nums[0]])
// use the array as a hashmap
function findDuplicateHMI(nums) {
    while (nums[0] !== nums[nums[0]]) { // while loop runs as long as there are no duplicates between what's at nums[0] and nums[nums[0]]
        // swap
        let next = nums[nums[0]]
        nums[nums[0]] = nums[0]
        nums[0] = next
    }
    return nums[0]
}
// [1,5] = [1,2,3,4,5]
// [2,1,2,3,4]
// nums[0] = 3  nums[nums[0]] = 4 
// next = nums[nums[0]] = 4

function findDuplicateHMR(nums) {
    function store(curr) {
        if (curr === nums[curr]) {
            return curr
        }
        let next = nums[curr]
        nums[curr] = curr
        return store(next)
    }

    return store(nums[0])
}

// approach 5: binary search

// approach 6: bitwise

// approach 7: cycle detection
// f(x) = nums[x] -> x, nums[x], nums[nums[x]], nums[nums[nums[x]]], ...
// if x = nums[0] and a duplicate exists in the array, nums[a] = nums[b] = c, c is the value of the duplicate and it's contained at indices a and b
// [2,6,4,1,3,1,5]


console.log(findDuplicate([1,3,4,2,2]), 2)
console.log(findDuplicate([3,1,3,4,2]), 3)