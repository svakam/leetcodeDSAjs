function solution(units, target) {
    let ans = []
    let currSum = 0
    let s = []
    let counter = 0

    let recurse = function(idx) {
        counter++
        if (counter > 1000) {
            return
        }
        // console.log(counter)
        // console.log([...s])
        if (idx === units.length) {
            return
        }

        if (currSum < target) {
            s.push(units[idx])
            currSum += units[idx]
            recurse(idx)
            s.pop()
            s.pop()
            currSum -= units[idx]
            currSum -= units[idx]
        }
        if (currSum === target) {
            ans.push([...s])
            s.pop()
            s.pop()
            currSum -= units[idx]
            currSum -= units[idx]
        }
        if (currSum > target) {
            s.pop()
            s.pop()
            currSum -= units[idx]
            currSum -= units[idx]
        }
        recurse(idx + 1)
    }

    recurse(0)
    return ans
}


// [1,2], 5
// s = [1,1,1,1,2]
// [1,1,1,1,1],[1,1,1,2],[1,2,2],[2,3]


// ans = []
// sum = 0
// recurse(0)


// i = 0
// [1,1]


let sol1 = [
    [1,1,1,1],
    [1,1,2],
    [2,2]
]
let sol2 = [
    [1,1,1,1,1],
    [1,1,1,2],
    [1,2,2],
    [2,3]
]
let sol3 = [
    [1,1,1,1],
    [1,1,2],
    [1,3],
    [2,2],
    [4]
]
let sol4 = [
    [1,1,1,1,1,1],
    [1,1,1,1,2],
    [1,1,1,3],
    [1,1,2,2],
    [2,2,2],
    [3,3]
]
let sol5 = [
    [1,1,1,1,1,1],
    [1,1,1,1,2],
    [1,1,1,3],
    [1,1,4],
    [1,2,3],
    [2,2,2],
    [2,4],
    [3,3]
]
console.log(solution([1,2], 4))
// console.log(solution([1,2,3], 5))
// console.log(solution([1,2,3,4], 4))
// console.log(solution([1,2,3], 6))
// console.log(solution([1,2,3,4], 6))