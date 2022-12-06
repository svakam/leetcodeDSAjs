// https://leetcode.com/problems/factorial-trailing-zeroes/

function getNumTrailingZeroes(n) {
    if (n < 5) return 0

    var cur = 5,
        total = 0;
    
    while (cur <= n) {
        total += Math.floor(n / cur);
        cur *= 5;
    }
    
    return total;
}

// n = 50
// cur = 125
// total = 10 + (50 / 25) = 12

console.log(getNumZeroes(5), 1)
console.log(getNumZeroes(3), 0)
console.log(getNumZeroes(10), 2)
console.log(getNumZeroes(15), 3)
console.log(getNumZeroes(20), 4)
console.log(getNumZeroes(25), 6)
console.log(getNumZeroes(50), 12)

// # trailing zeroes increases by 1 every time factorial multiplied by factor of 10
// i.e. pair of 2 and 5 occurs among prime factors of factorial elements (e.g. 10 contains 2, 5 and 20 contains 2 2's and 2 5's)
// since every even number has 2 as prime factor, limiting factor for trailing zeroes is number of elements with 5 as prime factor
// count the total number times 5 appears as prime factor and return it
// 5! = (2 * 5) * ... = 1 trailing = 720
// 10! = (2 * 5) * (10 =  2 * 5) * ... = 2 trailing = 3628800
// 15! = (2 * 5)^2 * (10 = 2 * 5) = 3 trailing = 1307674368000
// 20! = (2 * 5)^2 * 10^2 = (2 * 5)^2 = (2 * 5) ^ 2 = 4 trailing
// 25 = 

// 25! 
// 25 - 24 - 23 - 22 - 21 - 20 - 19 - 18 - 17 - 16 - 15 - 14 - 13 - 12 - 11 - 10 - 9 - 8 - 7 - 6 - 5 - 4 - 3 - 2 - 1
// 10 = why 2 trailing zeroes? 10 / 2 = 5
// 15 = 3 zeroes = 15 / 3 = 5
// 20 = 4 