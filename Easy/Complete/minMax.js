function findMinIndex(arr) {
    function getMin(currIndex) {
        if (currIndex === arr.length - 1) { // base case
            return currIndex
        }

        const smallestIndex = getMin(currIndex + 1) // recursion

        if (arr[smallestIndex] < arr[currIndex]) {
            return smallestIndex
        }
        if (arr[smallestIndex] > arr[currIndex]) {
            return currIndex
        }
        else {
            return Math.min(smallestIndex, currIndex) // get first occurrence
        }
    }

    return getMin(0)
}
  
function findMaxIndex(arr) {
    function getMax(currIndex) {
        if (currIndex === arr.length - 1) { // base case
            return currIndex
        }

        const largestIndex = getMax(currIndex + 1)

        if (arr[currIndex] > arr[largestIndex]) {
            return currIndex
        }
        if (arr[currIndex] < arr[largestIndex]) {
            return largestIndex
        }
        else {
            return Math.min(largestIndex, currIndex) // get first occurrence
        }
    }

    return getMax(0)
}

let arr = [8,16,-3,2,5,100, 9]
let arr2 = [3,4,5,3,3,6]
console.log(findMinIndex(arr), 2)
console.log(findMaxIndex(arr), 5)
console.log(findMinIndex(arr2), 0)
console.log(findMaxIndex(arr2), 5)
