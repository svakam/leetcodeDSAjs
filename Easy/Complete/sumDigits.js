function sumDigits(n) {
    if (Math.floor(n / 10) === 0) {
        return n % 10
    }

    return (n % 10) + sumDigits(Math.floor(n / 10))
}

function solution(n) {
    // let ans = 0
    // while (n / 10 > 0) {
    //     ans += n % 10
    //     n = Math.floor(n / 10)
    // }
    
    // return ans
}


console.log(sumDigits(5), 5)
console.log(sumDigits(1234), 10)
console.log(sumDigits(10000), 1)
