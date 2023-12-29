// bubble sort: "bubble up" the larger number of every iteration
// time: O(n^2), space; O(1)
function bubbleSort(arr) {
    console.log("bubble sort " + arr)
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                swap(arr, i, j)
            }
        }
    }
    return arr
}

// selection sort: select the smallest index within every iteration and swap it to the back
// time: O(n^2), space: O(1)
function selectionSort(arr) {
    console.log("selection sort " + arr)
    for (let i = 0; i < arr.length - 1; i++) {
        let smallestIdx = i // track smallest

        // this iteration will get smallest idx within the larger itr.
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[i]) {
                smallestIdx = j
            }
        }

        // swap ith element with current smallest; i may also be the smallest, so could swap with itself
        swap(arr, i, smallestIdx)
    }
    return arr
}

// insertion sort: like a deck of cards, insert the smallest index of an iteration and backtrack into the correct spot
// time: O(n) best case (sorted), O(n^2) worst (desc. order), space: O(1)
function insertionSort(arr) {
    console.log("selection sort " + arr)
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i] // "key" = element to compare against one before
        let j = i - 1 // set j before i
        if (key < arr[j]) {
            // key (i.e. something that needs to be moved back) is found, move all elems fwd until correct spot found for key
            while (j >= 0 && key < arr[j]) { 
                arr[j + 1] = arr[j] // push the higher element fwd 1 space to make room for insertion
                j-- // decrement check position
            }
            arr[j + 1] = key // j + 1 gets the insertion because j is 1 too far to the left from j--, j + 1 contains empty
        }
    }
    return arr
}

// merge sort: recursively split arrays until 1 piece each, sort each half and rejoin them 
function mergeSortShifting(array) {

    // BASE case: can't split an array size of 1 
    if (array.length <= 1) return array
    
    let mid = Math.floor(array.length / 2) // on every call, get mid point
    
    // recurse on halves: left of mid and right of mid
    // on last call, left and right get returned arrays of size 1
    let left = mergeSortShifting(array.slice(0, mid))
    let right = mergeSortShifting(array.slice(mid))
    
    // merge arrays
    return mergeSortHelper(left, right)
    
    // uses two halves 
    function mergeSortHelper(left, right) {
        let sorted = []
        
        while (left.length && right.length) { // continues as long as left or right have something in them
            if (left[0] < right[0]) {
                sorted.push(left.shift()) // if first elem in left less than first in right, removes first element from left and pushes to sorted
            }
            else {
                sorted.push(right.shift()) // if first greater or eq to first in right, removes first element from right and pushes to sorted
            }
        }
        
        return [...sorted, ...left, ...right] // concatenate 'sorted' with any remaining elements in both left and right to the end using spread operator 
    }

}

// merge sort: recursively split arrays until 1 piece each, sort each half and rejoin them 
function mergeSort(array) {

    // BASE case: can't split an array size of 1 
    if (array.length <= 1) return array
    
    let mid = Math.floor(array.length / 2) // on every call, get mid point
    
    // recurse on halves: left of mid and right of mid
    // on last call, left and right get returned arrays of size 1
    let left = mergeSort(array.slice(0, mid))
    let right = mergeSort(array.slice(mid))
    
    // merge arrays
    return mergeSortHelper(left, right)
    
    // uses two halves 
    function mergeSortHelper(left, right) {
        let sorted = []
        
        let leftIdx = 0, rightIdx = 0

        // continues as long as left or right have something in them
        while (leftIdx < left.length && rightIdx < right.length) {
            // if first elem in left less than first in right, pushes left elem to sorted and incr idx
            if (left[leftIdx] < right[rightIdx]) {
                sorted.push(left[leftIdx])
                leftIdx++
            }

            // if first greater or eq to first in right, pushes right elem to sorted and incr idx
            else {
                sorted.push(right[rightIdx])
                rightIdx++
            }

        }

        // concatenate 'sorted' with any remaining elements in both left and right to the end
        while (leftIdx < left.length) {
            sorted.push(left[leftIdx])
            leftIdx++
        }
        while (rightIdx < right.length) {
            sorted.push(right[rightIdx])
            rightIdx++
        }
        
        return sorted 
    }

}


function swap(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

let arr = [8,4,2,5,9,-1]
let arr2 = [8,4,2,5,-1]
console.log(bubbleSort(arr), [-1,2,4,5,8,9])
arr = [8,4,2,5,9,-1]
console.log(selectionSort(arr), [-1,2,4,5,8,9])
arr = [8,4,2,5,9,-1]
console.log(insertionSort(arr), [-1,2,4,5,8,9])
arr = [8,4,2,5,9,-1]
console.log("merge sort with array shifting " + arr)
console.log(mergeSortShifting(arr), [-1,2,4,5,8,9])
console.log("merge sort with array shifting " + arr2)
console.log(mergeSortShifting(arr2), [-1,2,4,5,8])
arr = [8,4,2,5,9,-1]
arr2 = [8,4,2,5,-1]
console.log("merge sort " + arr)
console.log(mergeSort(arr), [-1,2,4,5,8,9])
console.log("merge sort " + arr2)
console.log(mergeSort(arr2), [-1,2,4,5,8])