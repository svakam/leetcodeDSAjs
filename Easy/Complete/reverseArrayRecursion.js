function reverseArray(arr) {
    if (arr.length <= 1) return arr

    let left = 0
    let right = arr.length - 1

    while (left <= right) {
        [arr[left], arr[right]] = [arr[right], arr[left]]
        left++
        right--
    }

    return arr
}

console.log(reverseArray([]))
console.log(reverseArray([1]))
console.log(reverseArray([1,2,3]))
console.log(reverseArray([1,2,3,4,5]))
console.log(reverseArray([1,6,2,5,4,3]))
console.log(reverseArray([1,6,2,5,4,3,8,7]))