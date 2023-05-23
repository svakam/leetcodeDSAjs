// You are given a two-digit integer n. Return the sum of its digits.

function getSumDigits(n) {
    if (n < 9) return n

    return (n % 10) + getSumDigits(Math.floor(n / 10)) 
}

console.log(getSumDigits(4), 4)
console.log(getSumDigits(11), 2)
console.log(getSumDigits(35), 8)
console.log(getSumDigits(74), 11)
console.log(getSumDigits(99), 18)
