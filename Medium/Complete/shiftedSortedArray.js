function shiftedSortedArray(array, target) {
    let left = 0, right = array.length - 1
    
    while (left <= right) {
        let mid = Math.floor((right - left) / 2)
        if (array[mid] === target) return mid
        // if array left sorted
        if (array[left] <= array[mid]) {
            if (array[left] <= target && target < array[mid]) {
                right = mid - 1
            } else {
                left = mid + 1
            }
        // if array is right sorted
        } else {
            if (array[mid] < target && target <= array[right]) {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
    }
    return -1
}

console.log(shiftedSortedArray([5,6,1,2,3,4], 2), 3)
console.log(shiftedSortedArray([5,6,1,2,3,4], 8), -1)