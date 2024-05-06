// function distance(p1, p2, numDimensions) {
//     let total = 0
//     for (let i = 0; i < numDimensions; i++) {
//         // console.log(p1[i])
//         // console.log(p2[i])
//         total += Math.pow(p1[i] - p2[i], 2)
//     }
//     return Math.sqrt(total)
// }

function distanceR(p1, p2, numDimensions, i = 0, acc = 0) {
    if (i === numDimensions) return Math.sqrt(acc)

    return distanceR(p1, p2, numDimensions, i + 1, acc + Math.pow(p1[i] - p2[i], 2))
}

// one dimension (basically a number line)
let oneDP1 = [2]
let oneDP2 = [3]
console.log(distanceR(oneDP1, oneDP2, 1)) // expect 1
oneDP1 = [2.4]
oneDP2 = [3.76]
console.log(distanceR(oneDP1, oneDP2, 1)) // expect 1.36
// two dimension
let twoDP1 = [2, 3]
let twoDP2 = [2, 3]
console.log(distanceR(twoDP1, twoDP2, 2)) // expect 0 (same point)
twoDP1 = [2, 3]
twoDP2 = [4, 5]
console.log(distanceR(twoDP1, twoDP2, 2))
// three dimensions
let threeDP1 = [2, 3, 5]
let threeDP2 = [5, 20, 1]
console.log(distanceR(threeDP1, threeDP2, 3))