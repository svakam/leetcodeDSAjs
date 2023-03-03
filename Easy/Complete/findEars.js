function findEars(rabbits) {
    if (rabbits === 0) return 0

    return rabbits % 2 === 0 ? 3 + findEars(rabbits - 1) : 2 + findEars(rabbits - 1)
}

console.log(findEars(2), 5)
console.log(findEars(3), 7)
console.log(findEars(4), 10)
console.log(findEars(5), 12)