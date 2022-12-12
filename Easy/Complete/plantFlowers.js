// You have a long flowerbed in which some of the plots are planted, and some are not. However, flowers cannot be planted in adjacent 
// plots. Given an integer array flowerbed containing 0's and 1's, where 0 means empty and 1 means not empty, and an integer newFlowers, 
// return true if all newFlowers can be planted in the flowerbed without violating the no-adjacent-flowers rule.

function plantFlowers(bed, newFlowers) {
    let n = bed.length

    let recurse = function(pos) {
        if (pos === bed.length) {
            return true
        }

        if (bed[pos] !== 1) {
            if ((bed[pos - 1] !== undefined && bed[pos + 1] !== undefined && bed[pos - 1] !== 1 && bed[pos + 1] !== 1) || pos === 0 && bed[pos + 1] !== 1) {
                if (newFlowers > 0) newFlowers -= 1
                bed[pos] = 1
                console.log(bed)
                if (newFlowers === 0) return true
                let success = recurse(pos + 1)
                if (success && newFlowers === 0) {
                    return true
                }
                bed[pos] = 0
            }
        }
    }

    for (let pos = 0; pos < n; pos++) {
        let successPlanted = recurse(pos)
        if (successPlanted) return true
    }
    return false
}

// [1,0,1,0,1], 1
// n = 5
// pos = 2
// recurse(0)
// recurse(2)

// looking at a position i in flower bed
// if a 1 isn't neighboring, use up a flower and recurse with this new position
// if false, remove this flower and move to next position

let flowerbed1 = [1,0,0,0,1]
console.log(plantFlowers(flowerbed1, 1), true)

let flowerbed2 = [1,0,0,0,1]
console.log(plantFlowers(flowerbed2, 2), false)

let flowerbed3 = [0,0,1]
console.log(plantFlowers(flowerbed3, 1), true)