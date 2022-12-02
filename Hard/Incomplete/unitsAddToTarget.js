function solution(units, target) {
    let ans = []
    let currSum = 0
    let s = []

    let pop = function(unit) {
        s.pop()
        currSum -= unit
    }
    let push = function(unit) {
        s.push(unit)
        currSum += unit
    }

    let recurse = function(unit) {
        let currUnit = units[unit]
        if (!currUnit) {
            currUnit = units[unit - 1]
            pop(currUnit)
            pop(currUnit)
            return
        }

        while (currSum < target) {
            push(currUnit)
        }
        if (currSum === target) {
            ans.push([...s])
        }
        pop(currUnit)
        pop(currUnit) // pop 2 off to make room for trying next unit
        recurse(unit + 1)
    }

    recurse(0)
    return ans
}


// [1,2,3], t = 6
// currUnit = 1
// currSum = 6
// ans = [[1,1,1,1,1,1],[1,1,1,1,2],[1,1,1,3],]
// s = [1,1,]
// recurse(0)
// currUnit = 1
// recurse(1)
// currUnit = 2
// recurse(2)
// currUnit = 3
// recurse(3)
// currUnit = undefined
// return to recurse(2)


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
console.log(solution([1,2], 4), sol1)
// console.log(solution([1,2,3], 5), sol2)
// console.log(solution([1,2,3,4], 4), sol3)
// console.log(solution([1,2,3], 6), sol4)
// console.log(solution([1,2,3,4], 6), sol5)