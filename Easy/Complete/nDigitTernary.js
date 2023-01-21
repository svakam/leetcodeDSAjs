function ternary(n) {
    const output = []
    const s = []

    function permute() { // manages a current place
        // base case: if num is max length, join and add to output
        if (s.length === n) {
            output.push(s.join(''))
            return
        }

        // recursion: add place, recurse to add another place, remo
        for (let i = 0; i < 3; i++) {
            s.push(i)
            permute()
            s.pop()
        }
    }

    if (n == 1) {
        output.push("0")
    }

    for (let i = 1; i < 3; i++) {
        s.push(i) // adds next val
        permute() // takes care of next place
        s.pop() // pops current place
    }

    return output
}

console.log(ternary(1), ["0", "1", "2"])
console.log(ternary(2), ["10", "11", "12", "20", "21", "22"])
console.log(ternary(3), ["100", "101", "102", "110", "111", "112", "200", "201", "202", "210", "211", "212", "220", "221", "222"])

// n = 3
// output = []

// if n = 1, start number at 0
// else start at 1 + n - 1 0's
