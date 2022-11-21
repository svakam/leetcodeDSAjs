function solution(list) {
    let lengths = []

    // s = [1]
    // combinedFinal = []
    let recurse = function(i) {
        let s = [list[i]]
        // console.log(s)
        let final
        for (let j = i; j < list.length; j++) {
            if (list[j + 1]) {
                // if next number exactly 1 greater, add to stack
                if (list[j + 1] === list[j] + 1) {
                    s.push(list[j + 1])
                    // console.log(s)
                // else get downstream stacks and find best fit stack to add to curr stack
                } else {
                    let downstreamStacks = [recurse(j + 1)]
                    // console.log(downstreamStacks)
                    let bestStack
                    for (const stack of downstreamStacks) {
                        let numOfBestFit = Infinity
                        console.log(stack[0])
                        if (s[s.length - 1] < stack[0] && stack[0] < numOfBestFit) {
                            bestStack = stack
                            console.log("hello")
                            // console.log(bestStack)
                            numOfBestFit = stack[0]
                        }
                    }
                    let copy = [...s]
                    // console.log(copy)
                    let combined = []
                    if (bestStack) {
                        combined = copy.concat(bestStack) // add best stack to curr stack
                    }
                    console.log(combined)
                    downstreamStacks.unshift(combined) // add new stack to all stacks
                    final = downstreamStacks
                    // console.log(final)
                }
            } else {
                final = [...s]
            }
        }
        return final
    }

    let allstacks = [recurse(0)]
    // console.log(allstacks)
    for (let stack of allstacks) {
        // console.log(stack)
        lengths.push(stack.length)
    }
    // console.log(lengths)

    return lengths.reduce((acc, length) => {
        Math.max(acc, length)
    })
}

// console.log(solution([1]), 1)
// console.log(solution([1,2]), 2)
// console.log(solution([1,2,3]), 3)
// console.log(solution([3,2,1]), 1)
console.log(solution([1,2,5,3]), 3)
// console.log(solution([104,102,103,95,96,97,108,105,100,101]), 5)

// [1,2]
// [5]
// [3]

// call stack of stacks:
// [104,]
// [102,]
// [103,]
// [95,96,97,100,101] [[108], [[105,]]


// NOTES:
// there are too many edge cases to think about or try to describe
// there can be many viable increasing chains which are of different lengths, but to find the longest one, must go off the constraint that
// as long as the next number in a provisioning order isn't bigger by 1, there is a possibility that it exists down the line, so must recurse from i + 1 to find the next largest that is the smallest out of the rest
// if a digit is used already, don't need to use it in another stack

// []