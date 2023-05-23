// Q. Given a positive integer, return it with its digits reversed. Do not use strings to solve this problem.

function getReverseDigits(n) {
    if (n % 100 === 0) return n
    const s = []

    function helper(n) {
        if (n === 0) {
            return
        }

        s.push(n % 10)
        helper(Math.floor(n / 10))
    }

    helper(n)
    n = 0

    let multiplier = 1
    while (s.length > 0) {
        let digit = s.pop()
        n += digit * multiplier
        multiplier *= 10
    }

    return n
}

// 4321
// s = [123]
// helper(4321)
// helper(432)
// helper(43)
// helper(4)
// n = 4 + 3 * 10
// multipler = 10
// digit = 3

console.log(getReverseDigits(4), 4)
console.log(getReverseDigits(12), 21)
console.log(getReverseDigits(123), 321)
console.log(getReverseDigits(4321), 1234)
console.log(getReverseDigits(43217), 71234)


// 123 -> 321
// 4 -> 4