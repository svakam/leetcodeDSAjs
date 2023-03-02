function fib(n) {
    if (n === 0) return 0
    if (n === 1) return 1

    return fib(n - 1) + fib(n - 2)
}

// fib(0) = 0
// fib(1) = 1
// fib(2) = fib(0) + fib(1) = 1
// fib(3) = fib(2) + fib(1) = 1 + 1 = 2
// fib(n) = fib(n - 1) + fib(n - 2)

console.log(fib(0))
console.log(fib(1))
console.log(fib(2))
console.log(fib(3))
console.log(fib(4))
console.log(fib(5))
console.log(fib(6))
console.log(fib(7))
console.log(fib(8))
console.log(fib(9))
