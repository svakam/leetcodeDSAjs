var shortestSubarray = function(nums, k) {
    if (!nums.length) return -1
    
    let i = -1
    let shortestLength = Infinity, currLength = 0, currSum = 0, subarr = []
    
    while (i < nums.length) {
        if (currSum >= k) {
            shortestLength = Math.min(currLength, shortestLength)
        }
        if (currLength > shortestLength) {
            let temp = subarr.unshift()
            currSum -= temp
            currLength--
        } else {
            i++
            subarr.push(nums[i])
            currSum += nums[i]
            currLength++
        }
    }
    
    return shortestLength === Infinity ? -1 : shortestLength
};

console.log(shortestSubarray([2,-1],-1))

// [1], k = 1 -> 1x`
// [1,2], k = 4 -> -1
// [2,-1,2], k = 3

// [-1,1,0,2,5,2], k = 3 -> 2
// [-1,2,2,0,1,2,6,3,1], k = 3 -> 1
// [-1,2,2,0,1]

// for sum = k (NOT sum >= k):
// set i = 0
// longest length = 2
// i = 4
// repeat the below until end
// [1,2] = 3 ? if yes, update longest length with curr length if shorter, pop beginning off and skip the below
// if curr length is longest - 1, pop beginning off
// else increment i and add nums[i]


// forming a solution:
// 1. example walkthroughs
// 2. once viable solution id'd, draft an algo line by line
// repeat the below until perfect algo
// trim algo and move steps up and down, adding/removing bits
// test case with current impl