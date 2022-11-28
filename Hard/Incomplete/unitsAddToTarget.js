function solution(units, target) {
    let ans = []
    let currSum = 0
    let s = []
    let unit = 0

    let pop = function(unit) {
        s.pop()
        currSum -= unit
    }
    let push = function(unit) {
        s.push(unit)
        currSum += unit
    }

    let recurse = function() {
        let currUnit = units[unit]
        while (currSum < target) {
            push(currUnit)
        }
        if (currSum === target) {
            let copy = [...s]
            ans.push(copy)
        }
        pop(currUnit)
        pop(currUnit)

        if (unit === units.length - 1) {
            units--
        } else {
            units++
        }
        recurse()
        return
    }

    recurse()
    return ans
}

// [1,2,3], t = 6
// currUnit = 3
// currSum = 6
// s = [1,1,]
// unit = 2
// ans = [
    // [1,1,1,1,1,1]
    // [1,1,1,1,2]
    // [1,1,1,3]
    // [1,1,2,2]
// ]
// recurse() unit = 0
// recurse() unit = 1
// recurse() unit = 2
// recurse() unit = 1
// recurse() unit = 2

let sol1 = [
    [1,1,1,1,1],
    [1,1,1,2],
    [1,2,2],
    [2,3]
]
let sol2 = [
    [1,1,1,1],
    [1,1,2],
    [2,2]
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
    [1,1,2,3],
    [1,1,4],
    [1,2,3],
    [2,2,2],
    [2,4],
    [3,3]
]
console.log(solution([1,2,3], 5), sol1)
console.log(solution([1,2], 4), sol2)
console.log(solution([1,2,3,4], 4), sol3)
console.log(solution([1,2,3,4], 6), sol4)


// when sum reached or greater, have to pop at least 2 front units (unit 1: no point readding same unit; unit 2: will return original amount to add same unit back)
// add k + 1 next unit
// if reached end of units array, get top of stack, pop, and go to next unit
// if units[k] greater than top of stack, recurse on k

// ans:
// [1,1,1,1,1,1]
// [1,1,1,1,2]
// [1,1,1,3]
// [1,1,2,2]
// [1,2,3]
// [2,2,2]
// [3,3]

// [1,2,3], 6
// recurse(), k = 0
// [1,1,1,1,1,1] add
// [1,1,1,1,]
// recurse(), k = 1
// [1,1,1,1,2] add
// [1,1,1,]
// recurse(), k = 2
// [1,1,1,3] add
// [1,1] -> k can't advance further and stack top is not last unit, k = 1
// recurse()
// [1,1,2,2] add
// [1,1,]
// recurse()
// [1,1,3,3]
// [1,1]
// [1]
// [1,2] return
// resume recurse()
// [1,2,2,2]
// [1,2,]
// recurse()
// [1,2,3] add
// [1]
// [1,3,3]
// [1] 
// []
// [2] return
// resume recurse()
// [2,2,2] add
// [2]
// recurse(2)
// [2,3,3]
// [2]
// []
// [3] return
// resume recurse(1)
// recurse(2)
// [3,3] add
// []
// can't add next, return
// resume recurse(1)