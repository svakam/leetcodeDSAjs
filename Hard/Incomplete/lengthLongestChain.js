function solution(list) {
    let lengths = []

    let recurse = function(i) {
        let s = [list[i]]
        let combinedFinal
        while (i < list.length) {
            if (list[i + 1] === list[i] + 1) {
                s.push(list[i + 1])
                i++
            } else if (list[i + 1]) {
                let downstreamChains = recurse(i + 1)
                let bestChain
                let nextLargest = Infinity
                for (let chain in downstreamChains) {
                    if (list[i] < nextLargest && chain[0] < nextLargest) {
                        bestChain = chain
                        nextLargest = chain[0]
                    }
                }
                let combined = s.concat(bestChain)
                combinedFinal = combined.concat(downstreamChains)
            } else {
                combinedFinal = s
            }
        }
        return combinedFinal
    }

    let allstacks = recurse(0)
    for (let stack in allstacks) {
        lengths.push(stack.length)
    }
    lengths.reduce(l => {
        
    })
}

console.log(solution(104,102,103,95,96,97,108,105,100,101))

// call stack of stacks:
// [104,108], [102,103,105] [95,96,97,100,101]


// NOTES:
// there are too many edge cases to think about or try to describe
// there can be many viable increasing chains which are of different lengths, but to find the longest one, must go off the constraint that
// as long as the next number in a provisioning order isn't bigger by 1, there is a possibility that it exists down the line, so must recurse from i + 1 to find the next largest that is the smallest out of the rest
// if a digit is used already, don't need to use it in another stack