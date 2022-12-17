function leftPeaks(nums) {
    let biggest = -Infinity
    let lefts = []
    for (let i = nums.length - 1; i >= 0; i--) {
        if (nums[i] >= biggest) {
            lefts.push(nums[i])
            biggest = nums[i]
        }
    }
    return lefts.reverse()
}

// left peak = value greater than or equal to ALL values on right
console.log(leftPeaks([1,2,3,4,5]), [5])
console.log(leftPeaks([1]), [1])
console.log(leftPeaks([2,1]), [2,1])
console.log(leftPeaks([2,2,1]), [2,2,1])
console.log(leftPeaks([2,3,1]), [3,1])
console.log(leftPeaks([4,3,2]), [4,3,2])
console.log(leftPeaks([6,2,4,9]), [9])
console.log(leftPeaks([1,4,15,9,17,5,3,2]), [17,5,3,2])
console.log(leftPeaks([3,4,18,10,9,11,12]), [18, 12])

// list of largest = [12]
// 11