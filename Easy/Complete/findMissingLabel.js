// given array with an expected range of integers [0,n] n inclusive, find the missing number else -1
function solution(array) {
    array.sort((a,b) => a - b)
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== i) return i
    }

    return -1
}
// ts: O(nlogn), O(1)

function set(array) {
    const set = new Set()
    for (const num of array) {
        set.add(num)
    }
    for (let i = 0; i < array.length + 1; i++) {
        if (!set.has(i)) return i
    }
    return -1
}
// ts: O(n), O(n)

function gauss(array) {
    // closed form expression for sum: 
    let n = array.length
    let expectedSum = Math.floor((n * (n + 1)) / 2)
    
    let actualSum = 0
    for (const num of array) {
        actualSum += num
    }

    // the missing number is the expected sum - actual sum
    return expectedSum - actualSum
}
// ts: O(n), O(1)



console.log(solution([0,3,4,1,6,5]), 2)
console.log(solution([0,1,3,4,5,6,7]), 2)

// e.g. [0,8] = 0,1,2,3,4,5,6,7,8 = 9 elements
// [0,1,3,4,5,6,7]
// [0,]