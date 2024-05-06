function merge(B, C, A) {
    let i = 0, j = 0, k = 0, totalLen = B.length + C.length - 1

    while (i < B.length && j < C.length) {
        if (B[i] <= C[j]) {
            A[k] = B[i]
            i++
        } else {
            A[k] = C[j]
            j++
        }
        k++
    }

    if (i == B.length) {
        let l = q - 1 
        while (k < totalLen && j < l) {
            A[k] = C[j]
            k++
            j++
        }
    } else {
        let l = p - 1
        while (k < totalLen && i < l) {
            A[k] = B[i]
            k++
            i++
        }
    }
}

function mergeSort(arr) {
    if (arr.length > 1) {
        let mid = (arr.length / 2) - 1
        let copyB = [], copyC = []
        
        for (let i = 0; i < mid; i++) {
            copyB.push(arr[i])
        }
        for (let i = mid; i < arr.length; i++) {
            copyC.push(arr[i])
        }

        mergeSort(copyB)
        mergeSort(copyC)
        merge(copyB, copyC, arr)
    }

    return arr
}

let test = []
let test2 = [0,1,2,3]
let test3 = [0,1,2,3,4]
let test4 = [3,1,4,1,5,9,2,6,5]
let test5 = [9,8,7,6,5,4,3,2,1,0]

console.log(mergeSort(test))
console.log(mergeSort(test2))
console.log(mergeSort(test3))
console.log(mergeSort(test4))
console.log(mergeSort(test5))

// Question 1: Test case 1 is important because it is an edge case. What if an input array is null or has 0 length? Our code should be able to handle that.
// Question 2: #2 is even length, #3 is odd length. Since mergeSort() calculates the midpoint of a given array, we should calculate it appropriately for even and odd-sized arrays, especially if Math.floor() or other implementations of finding mid vary significantly between languages. 
// Question 3: It's also important to test duplicate values. In this implementation, duplicate values are considered the "left" side of the array, AKA array B. 