// determine if a number n is a power of some other number k without using built in library; n = 27 and k = 3, return true (3^3 = 27)

function isPowerOfK(n, k) {
    if (k === 1 && n === 1 || k === n) return true
    if (k === 1 && n > 1) return false
    while (n > 1 && n % k === 0) {
        n /= k
    }
    return n === 1
}

// 27 > 1 && 27 % 3 === 0
// n = 9
// 9 > 1 && 9 % 3 === 0
// n = 3
// 3 > 1 && 3 % 3 === 0
// n = 1
// 

console.log(isPowerOfK(27, 3), true)
console.log(isPowerOfK(4, 2), true)
console.log(isPowerOfK(5, 2), false)
console.log(isPowerOfK(10, 2), false)
console.log(isPowerOfK(1, 1), true)
console.log(isPowerOfK(10, 1), false)