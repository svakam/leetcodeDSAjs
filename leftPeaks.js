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

// implements stack
function leftPeaks2(nums) {
    let result = []
    if (nums.length > 0) {
        for (let i = 0; i < nums.length; i++) {
            while (result.length > -1 && arr[i] > result.at(-1)) {
                result.pop()
            }
            result.push(arr[i])
        }
    }
    return result
}

// result = [18,17,5,3,2]

// left peak = value greater than or equal to ALL values on right
// works on the fundamental that once a larger value is encountered, pop everything to the left of it until the top is larger than current
console.log(leftPeaks([1,2,3,4,5]), [5])
console.log(leftPeaks([1]), [1])
console.log(leftPeaks([2,1]), [2,1])
console.log(leftPeaks([2,2,1]), [2,2,1])
console.log(leftPeaks([2,3,1]), [3,1])
console.log(leftPeaks([4,3,2]), [4,3,2])
console.log(leftPeaks([6,2,4,9]), [9])
console.log(leftPeaks([1,4,18,9,17,5,3,2]), [18,17,5,3,2])
console.log(leftPeaks([3,4,18,10,9,11,12]), [18, 12])

// list of largest = [12]
// 11