var letterCombinations = function(digits) {
    let output = []
    let s = []
    const n = digits.length
    
    let map = new Map()
    map.set("2", "abc")
    map.set("3", "def")
    map.set("4", "ghi")
    map.set("5", "jkl")
    map.set("6", "mno")
    map.set("7", "pqrs")
    map.set("8", "tuv")
    map.set("9", "wxyz")

    function recurse(digitIdx = 0) {
        if (digitIdx === n) {
            output.push(s.join(''))
            return
        }

        for (const char of map[digits[digitIdx]]) {
            s.push(char)
            recurse(digitIdx + 1)
            s.pop()
        }
    }

    recurse()
    return output
}

console.log(letterCombinations("23"), ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"])
console.log(letterCombinations("623"), ["mad", "mae", "maf", "mbd", "mbe", "mbf", "mcd", "mce", "mcf", "nad", "nae", "naf", "nbd", "nbe", "nbf", "ncd", "nce", "ncf", "oad", "oae", "oaf", "obd", "obe", "obf", "ocd", "oce", "ocf"])

// 23
// output = []
// s = [a]
// recurse(0, 0)
    // letters = map[2] = abc
    // 