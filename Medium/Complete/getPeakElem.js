// return the index of the peak element of a 0-indexed array
// peak = an element strictly greater than its neighbors (1 or more peaks possible)
// e.g. [1,2,3,1] -> 2 (3 is peak)
// e.g. [6,5,4,3,2,1] -> 0
// e.g. [1,2,1,3,5,6,4] -> 1 or 5 (2 and 6 are peaks)

// design such that always checking around mid
var getPeak = function(nums) {
    function search(nums, l, r) {
        if (l === r) return l // assumes eventually meets at a peak even if a previous mid was ever a peak

        let mid = Math.floor((l + r) / 2)

        // if mid > next, search on left half
        if (nums[mid] > nums[mid + 1]) {
            return search(nums, l, mid)
        }

        // search on right half
        return search(nums, mid + 1, r)
    }

    return search(nums, 0, nums.length - 1)
}

console.log(getPeak([1,2,3,1,1,0]), 2)
console.log(getPeak([1,2,1,3,5,6,4]), "1 or 5")
console.log(getPeak([1,2,3,1]), 2)
console.log(getPeak([6,5,4,3,2,1]), 0)
console.log(getPeak([6,5,2,3,6]), "0 or 4")
console.log(getPeak([0,2,4,2,5,1,0]), "2 or 4")