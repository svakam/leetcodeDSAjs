function longestPalindromeBF(str) {
    if (str.length < 2) return str
    let longestPalin = []
    let longestLen = 0
    for (let char = 0; char < str.length; char++) {
        for (let end = str.length - 1; end > char; end--) {
            let currLen = 0, palinBeg = char, palinEnd = end
            while (palinBeg <= palinEnd && str[palinBeg] === str[palinEnd]) {
                currLen += 2
                palinBeg++
                palinEnd--
            }
            if (currLen > longestLen && palinBeg > palinEnd) {
                longestPalin = [char, end]
                longestLen = currLen
            }
        }
    }

    return str.substring(longestPalin[0], longestPalin[1] + 1)
}

function longestPalindromeBT(str) {
    if (str.length < 2) return str
    let longestPalin = [], longestLen = 0

    function helper(start, end, currLen) {
        console.log(start, end, currLen)
        if (start > end) return currLen
        if (str[start] === str[end]) {
            currLen = helper(start + 1, end - 1, currLen + 2)
            if (currLen > longestLen) {
                longestPalin = [start, end]
                return currLen
            }
        } else {
            if (helper(start, end, 0) === 0) {
                helper(start + 1, end, 0)
            }
        }
    }

    helper(0, str.length - 1, 0)
    return str.substring(longestPalin[0], longestPalin[1] + 1)
}

// console.log(longestPalindromeBT("racecar"), "racecar")
console.log(longestPalindromeBT("abcbq"), "bcb")
// console.log(longestPalindromeBT("absqwerttrewqhf"), "qwerttrewq")
// console.log(longestPalindromeBT("hellool"), "lool")
// console.log(longestPalindromeBT("a"), "a")
// console.log(longestPalindromeBT("abcdeqfqeqdcbacba"), "eqfqe")

// hellool
//    c  e    
//     eb
// currLen = 4
// longestLen = 4, longestPalin = "lool"
// BF: check for palin at every char
// indices to keep track of candidate palin while other indices checking for full palin within candidate char, total 4 indices
// t: O()

// "absqwerttrewqhf"
// 