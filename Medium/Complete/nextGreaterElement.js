function nextGreaterElementBF(arr) {
    for (let i = 0; i < arr.length; i++) {
        let j = i + 1
        while (j < arr.length && arr[j] <= arr[i]) j++
        j === arr.length ? arr[i] = -1 : arr[i] = arr[j]
    }
    return arr
}


console.log(nextGreaterElement([2]), [-1])
console.log(nextGreaterElement([2, 1]), [-1, -1])
console.log(nextGreaterElement([2, 3]), [3, -1])
console.log(nextGreaterElement([2, 4, 6, 8]), [4, 6, 8, -1])
console.log(nextGreaterElement([2, 1, 0, -1, -2, -3]), [-1, -1, -1, -1, -1])
console.log(nextGreaterElement([2, 5, 4, 9, 8, 10, 6, 4]), [5, 9, 9, 10, 10, -1, -1, -1])
console.log(nextGreaterElement([5, 4, 3, 2, 1, 6]), [6, 6, 6, 6, 6, -1])


function nextGreaterElement(arr) {
    if (!arr) return null

    const s = [], output = []

    for (let i = 0; i < arr.length; i++) {
        output.push(-1)
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        while (s.length) {
            if (s[-1] <= arr[i]) {
                s.pop()
            } else {
                arr[i] = s[-1]
                break
            }
        }
        s.push(arr[i])
    }

    return output
}

// 


// [2,5,4,9,8,10,6,4]
// s = [4]
// arr[i] = 6

// [2,5,4,9,8,10,6,4]
//                 i

// n = len(input)
// result = [-1] * n

// # create an empty stack
// s = deque()

// # process each element from right to left
// for i in reversed(range(n)):
//     # loop till we have a greater element on top or stack becomes empty.
//     while s:
//         # pop elements that aren't greater than the current element
//         if s[-1] <= input[i]:
//             s.pop()
//         # the next greater element is now on the top of the stack
//         else:
//             result[i] = s[-1]
//             break
//     # push current element into the stack
//     s.append(input[i])

// return result