function firstRepeat(arr) {
    let set = new Set()
    for (let i = 0; i < arr.length; i++) {
        if (set.has(arr[i])) {
            return arr[i]
        }
        set.add(arr[i])
    }
    return null
}

console.log(firstRepeat([1,2,3,2]), 2)
console.log(firstRepeat([1,2,3,2,1,3]), 2)
console.log(firstRepeat([1,2,3,4]), null)