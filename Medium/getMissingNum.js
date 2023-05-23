// You have a set of integers nums, which originally contains all the numbers from 1 to n. Unfortunately, due to some error, 
// one of the numbers in nums got duplicated to another number in the set, which results in the repetition of one number and the 
// loss of another number.
// You are given an integer array nums representing the data after the error. Return the missing number. If no number is missing, return -1.

// sort
// function findMissing(arr) {
//     arr.sort((a, b) => a - b)

//     for (let i = 1; i <= arr.length; i++) {
//         if (arr[i] !== i) return i
//     }

//     return -1
// }

// set
function findMissing(arr) {
    const set = new Set()
    for (const num of arr) {
        if (set.has(num)) return num
        else set.add(num)
    }
    return -1
}



// [1,8] = 1,2,3,4,5,6,7,8
let loss = [1,1,3,4,5,6,7,8]
console.log(findMissing(loss), 2)
loss = [1,2,2,4,5,6,7,8]
console.log(findMissing(loss), 3)
loss = [1,2,3,3,5,6,7,8]
console.log(findMissing(loss), 4)
loss = [1,2,3,5,5,6,7,8]
console.log(findMissing(loss), 4)
loss = [1,2,3,4,8,6,7,8]
console.log(findMissing(loss), 5)
loss = [1,2,3,4,5,7,7,8]
console.log(findMissing(loss), 6)