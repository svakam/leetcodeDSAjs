// given an integer, determine if it is a power of 4 without using built-in functions or operators

function isPowerOf4(n) {
    if (n < 1) return false

    while (n % 4 === 0) {
        n /= 4
    }

    return n === 1
}