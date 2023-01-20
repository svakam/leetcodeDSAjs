// count 8s in a non-negative int n; 8 next to another 8 counts as double, and compounds

function count8(n) {
    if (n === 0) {
        return 0;
    }

    if (n % 100 === 88) {
        return 2 + count8(Math.floor(n / 10))
    }
    if (n % 10 === 8) {
        return 1 + count8(Math.floor(n / 10))
    }

    return count8(Math.floor(n / 10));
}

// console.log("modulo gives last digit, dividing gives decimal result, dividing with floor removes last digit")
// console.log(12 % 10)
// console.log(12 / 10)
// console.log(Math.floor(12 / 10))