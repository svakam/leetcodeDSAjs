// https://leetcode.com/problems/contains-duplicate-iii/


// find pair of indices i, j in nums array such that:
// i != j
// the diff between i and j is less than or the same as the input index diff (abs(i - j) <= indexDiff)
// the diff between nums[i] and nums[j] is less than or the same as value diff (abs(nums[i] - nums[j] <= valueDiff))
function containsDuplicateBF(nums, indexDiffK, valueDiff) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = Math.max(i - indexDiffK, 0); j < i; j++) {
            if (Math.abs(nums[i] - nums[j]) <= valueDiff) return true
        }
    }
    return false
}

console.log(containsDuplicate([1,2,3,1], 3, 0), true)
console.log(containsDuplicate([1,5,9,1,5,9], 2, 3), false)

// Approach 1: sliding window holds the newest k elements
// k = 3, t = 0
// [1,2,3,1]
// i = 1 -> 3
// j = max(1 - 3, 0) = 0 -> 1
// Math.abs(2- 2) <= 0


// sorting: 
// time: O(nlog(k)), for k elements, space: 
// [1,1,2,3]
// [1,1,5,5,9,9]