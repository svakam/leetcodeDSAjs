function flapjacks(orders) {
    let stack = 0
    let max = -Infinity
    let constraintMet = true
    for (let order = 0; order < orders.length; order++) {
        stack += orders[order]
        max = Math.max(max, stack)
        if (stack > 4 || stack < 0) constraintMet = false
    }

    return [constraintMet, max]
}

console.log(flapjacks([2, -1]), [true, 2])
console.log(flapjacks([-1, 2]), [false, 1])
console.log(flapjacks([2, -1, 3, -3, 2, -1]), [true, 4])