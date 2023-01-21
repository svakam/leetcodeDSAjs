function sumDigits(n) {
    if (Math.floor(n / 10) === 0) {
        return n % 10
    }

    return (n % 10) + sumDigits(Math.floor(n / 10))
}

console.log(sumDigits(5), 5)
console.log(sumDigits(1234), 10)
console.log(sumDigits(10000), 1)
