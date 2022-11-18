function sumToK(arr, k) {
    if (arr.length <= 1) return false

    let left = 0
    let right = arr.length - 1

    while (left != right) {
        let sum = arr[left] + arr[right]
        if (sum === k) {
            return true
        } else if (sum < k) {
            left++
        } else {
            right--
        }
    }

    return false
}

// assumes inc sorted array
console.log(sumToK([1,5,8,10,13,18], 15), true)
console.log(sumToK([1,2,5,5,8], 10), true)
console.log(sumToK([1,2,4,9], 5), false)