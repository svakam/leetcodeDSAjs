function nextGreaterElementBF(arr) {
    const n = arr.length
    for (let i = 0; i < n; i++) {
        let j = i + 1
        while (j < n && arr[j] <= arr[i]) j++
        j === n ? arr[i] = -1 : arr[i] = arr[j]
    }
    return arr
} 
// time: O(n^2), space: O(1)


console.log(nextGreaterElement([2]), [-1])
console.log(nextGreaterElement([2, 1]), [-1, -1])
console.log(nextGreaterElement([2, 3]), [3, -1])
console.log(nextGreaterElement([2, 4, 6, 8]), [4, 6, 8, -1])
console.log(nextGreaterElement([2, 1, 0, -1, -2, -3]), [-1, -1, -1, -1, -1, -1])
console.log(nextGreaterElement([2, 5, 4, 9, 8, 10, 6, 4]), [5, 9, 9, 10, 10, -1, -1, -1])
console.log(nextGreaterElement([5, 4, 3, 2, 1, 6]), [6, 6, 6, 6, 6, -1])

/*
Given the nature of this problem (checking if an element j > i is greater than element i), a stack is a useful structure 
here, since it's best for operating on an array in reverse (i.e. comparing j to i). 

Initialize an output array with the size of the input array filled with -1's. 
Initialize an empty stack. The top of the stack will represent a "candidate" for the next greater element for a 
given number. Add to the stack if a possible next greater element is found, and pop from it if there is no way for the 
candidate to be the next greater element. 

Iterating from the end of the array, add each element to the stack, but not before checking if the current stack top is 
greater than the current element. 
- If it is, it's the next greater element for this number, so set output[i] to the value of stack top. Then push the 
current number to the stack, since it could be the next greater element for another number earlier in the array. 
- If it's not, then the current element is greater, which means the candidate next greater gets popped to check if the 
next candidate down the stack is greater than the current. Keep popping as long as the stack is filled. If the stack's empty, there is no element greater than this number, and the -1 in this output position will remain. Add this current element to the stack, since it could be the next greater for another number. 
*/ 

function nextGreaterElement(arr) {
    if (!arr) return null

    const n = arr.length, output = new Array(n).fill(-1), s = []

    for (let i = n - 1; i >= 0; i--) {
        let current = arr[i]
        while (s.length) {
            let candidateNextGreatest = s[s.length - 1]
            if (candidateNextGreatest <= current) {
                s.pop()
            } else {
                output[i] = candidateNextGreatest
                break
            }
        }
        s.push(current)
    }

    return output
}
// time: O(N), space: O(N)


// [2,5,4,9,8,10,6,4]
// s = [4]
// arr[i] = 6

// [2,5,4,9,8,10,6,4]
//                 i