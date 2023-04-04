// bubble sort: "bubble up" the larger number of every iteration
function bubbleSort(arr) {
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
function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let smallestIdx
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[i]) {
                smallestIdx = j
            }
            if (smallestIdx) swap(arr, i, j)
        }
    }
    return arr
}

// insertion sort: insert the smallest index of an iteration into the correct spot
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i]
        let j = i - 1 // set j before i
        if (key < arr[j]) {
            // key (i.e. something that needs to be moved back) is found, move all elems fwd until correct spot found for key
            while (j >= 0 && key < arr[j]) { 
                arr[j + 1] = arr[j]
                j--
            }
            arr[j + 1] = key 
        }
    }
    return arr
}

// merge sort: recursively split arrays until 1 piece each, sort each half and rejoin them 
function mergeSort(arr) {
    const helperArr = []

    function helper(arr, helperArr, low, mid, high) {
        for (let i = low; i <= high; i++) {
            helperArr[i] = arr[i]
        }
        let helperLeft = low, outputIdx = low, helperRight = mid + 1

        while (helperLeft <= mid && helperRight <= high) {
            if (helperArr[helperLeft] <= helperArr[helperRight]) {
                arr[outputIdx] = helperArr[helperLeft]
                helperLeft++
            } else {
                arr[outputIdx] = helperArr[helperRight]
                helperRight++
            }
            outputIdx++
        }

        let remaining = mid - helperLeft
        for (let i = 0; i <= remaining; i++) {
            arr[outputIdx + i] = helperArr[helperLeft + i]
        }
    }
    
    function merge(arr, helperArr, low, high) {
        if (low < high) {
            let mid = Math.floor((low + high) / 2)
            merge(arr, helperArr, 0, mid)
            merge(arr, helperArr, mid + 1, high)
            helper(arr, helperArr, 0, mid, high)
        }
    }

    merge(arr, helperArr, 0, arr.length - 1)

    return arr
}

function swap(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

const arr = [8,4,2,5,9,-1]
const arr2 = [8,4,2,5,-1]
console.log(bubbleSort(arr), [-1,2,4,5,8,9])
console.log(selectionSort(arr), [-1,2,4,5,8,9])
console.log(insertionSort(arr), [-1,2,4,5,8,9])
console.log(mergeSort(arr), [-1,2,4,5,8,9])
console.log(mergeSort(arr2), [-1,2,4,5,8])