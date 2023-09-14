// https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
// given a sorted array that was rotated between 1 and n times, find the minimum element of the array in O(logn) time

function findMinRotatedSortedArr(arr) {

    if (arr.length === 1) return arr[0] // length 1
    if (arr[0] < arr[arr.length - 1]) return arr[0] // case: no rotation (smallest is at the beginning)

    let left = 0, right = arr.length - 1
    
    // inflection point: element before > element after
    // all elements to left of inflection > first element
    // all elements to right of inflection < first element

    // binary search:
    // get mid; if mid > first elem, look for inflection on right of mid
    // if mid < first elem, look for inflection on left of mid

    while (right >= left) {
        let mid = Math.floor(left + (right - left) / 2)

        // --- check if smallest is around mid area --- //
        // if mid > mid + 1, mid + 1 is smallest
        if (arr[mid] > arr[mid + 1]) return arr[mid + 1]

        // if mid - 1 > mid, mid is smallest
        if (arr[mid - 1] > arr[mid]) return arr[mid]


        // --- decide where to reset mid - just like regular binary search, but condition is checking for where smallest will be --- //
        // if mid > 0th, smallest is on the right of mid
        if (arr[mid] > arr[0]) {
            left = mid + 1

        // last case is mid being to the left of mid
        } else {
            right = mid - 1
        }

        return Infinity // this can't ever hit but should return something
    }
}

console.log(findMinRotatedSortedArr([3,4,5,1,2]), 1)
console.log(findMinRotatedSortedArr([4,5,6,7,0,1,2]), 0)
console.log(findMinRotatedSortedArr([11,13,15,17]), 11)
console.log(findMinRotatedSortedArr([7,8,9,10,11,1]), 1)

// [3,4,5,1,2]
// mid = 5/2 = 2
// [3,4], [5,1,2]
// [3][4], [5][1,2] index of 5 in original arr = inputArr.indexOf(left[leftIdx]) + 1 = index of min
// 5 > 1, return inputArr[index + 1]