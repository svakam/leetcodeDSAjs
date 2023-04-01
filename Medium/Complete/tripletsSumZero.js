function tripletsToZeroNCubed(arr) {
    let triplets = []
    
    // output not lexographical
    for (let l = 0; l < arr.length - 2; l++) {
        for (let r = arr.length - 1; r > l; r--) {
            for (let m = l + 1; m < r; m++) {
                let curr = [arr[l], arr[m], arr[r]], currSum = arr[l] + arr[m] + arr[r]
                if (currSum === 0) {
                    triplets.push(curr)
                }
            }
        }
    }

    return triplets
}

function tripletsToZeroSortedNSquared(arr) {
    let triplets = []
    arr.sort((a, b) => a - b)

    for (let l = 0; l < arr.length - 2; l++) {
        let m = l + 1, r = arr.length
        while (m < r) {
            let curr = [arr[l], arr[m], arr[r]], currSum = arr[l] + arr[m] + arr[r]
            if (currSum === 0) {
                triplets.push(curr)
                m++
                r-- // increment m, decrement r if curr result 0
            } else if (currSum < 0) {
                m++
            } else {
                r--
            }
        }
    }

    return triplets
}

let arr = [-7,-2,1,0,-1,2,3,4,-4]
//                 l         m  r
// for l up to length - 2, 
//  m = l + 1, r = length - 1
// while r > m
//  while l < r
//  for m < r
//      currSum = l + m + r
//      if currSum = 0, add as triplet
//  r--
// 
//  time: O(n^3)
// space: O(1)


console.log(tripletsToZeroSortedNSquared(arr), [
    [-7,3,4],
    [-4,0,4],
    [-4,1,3],
    [-2,-1,3],
    [-2,0,2],
    [-1,0,1]
])