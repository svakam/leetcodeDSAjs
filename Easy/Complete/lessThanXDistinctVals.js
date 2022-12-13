function solution(arr, target) {
    let vals = new Set()
    for (let i = 0; i < arr.length; i++) {
        if (!vals.has(arr[i])) {
            vals.add(arr[i])
        }
    }
    return vals.size < target
}

console.log(solution([1,2,2,3,3], 4), true)
console.log(solution([1,2,2,3,3], 3), false)
console.log(solution([1,1,2,2,2], 3), true)
console.log(solution([1,1,1,1,1], 1), false)