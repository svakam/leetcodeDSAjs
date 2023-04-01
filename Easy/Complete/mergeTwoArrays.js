function mergeTwoArrays(arr1, arr2) {
    if (!arr1 && arr2) return arr2
    if (!arr2 && arr1) return arr1
    const output = []
    if (!arr2 && !arr1) return output

    // while both counters are less than their list's length
    let i = 0, j = 0
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            output.push(arr1[i])
            i++
        } else if (arr2[j] <= arr1[i]) {
            output.push(arr2[j])
            j++
        }
    }

    // push rest of remainder lists
    if (i === arr1.length) {
        while (j < arr2.length) {
            output.push(arr2[j])
            j++
        }
    } else {
        while (i < arr1.length) {
            output.push(arr1[i])
            i++
        }
    }

    return output
}

console.log(mergeTwoArrays([1,2,5,9],[4,7,10]), [1,2,4,5,7,9,10])
console.log(mergeTwoArrays([],[1,2]), [1,2])
console.log(mergeTwoArrays([3,4],[]), [3,4])
console.log(mergeTwoArrays([],[]), [])
console.log(mergeTwoArrays([1,4,7],[2,9,10]), [1,2,4,7,9,10])

// [1,4,7]
//         i

// [2,9,10]
//    j
//    while i < arr1.length and j < arr2.length
//  arr[i] <= arr[j], push arr[i] and i++
//  arr[j] <= arr[i], push arr[j] and j++
// [1,2,4,7,9,10]
// i = arr1.length, push rest of arr2, if j = arr2.length, push rest of arr1