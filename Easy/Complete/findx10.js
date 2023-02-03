function findx10(arr) {
    function helper(currIdx) {
        if (currIdx === arr.length - 1) {
            return false
        }
        if (arr[currIdx] * 10 === arr[currIdx + 1]) {
            return true
        }
    }
    return helper(0)
}

function findx10BetterImpl(arr, currIdx) {
    if (currIdx >= arr.length - 1) return false

    return arr[currIdx + 1] === arr[currIdx] * 10 || findx10BetterImpl(arr, currIdx + 1)
}
// returning false only if reached end of array since nothing next to compared to
// return whether next idx === curr idx x 10, or recursive result

let arr1 = [0,2,20,21,33,35]
let arr2 = [2,10,12,25,31]
let arr3 = [5]
console.log(findx10(arr1), true)
console.log(findx10(arr2), false)
console.log(findx10(arr3), false)

[0,2,10,20,33,35]
 i