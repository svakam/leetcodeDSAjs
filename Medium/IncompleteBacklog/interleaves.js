/* Given two strings *x* and *y* we can create an interleaving by repeatedly taking the first character of either and 
    appending the characters together to form a new string. Specifically, valid interleavings will have these properties:

1. len(interleaving) == len(x) + len(y)
2. *interleaving - x = y* and *interleaving - y = x* meaning that removing the characters in *x* from the interleaving will produce *y* 
    and vice versa.
3. x and y both appear as subsequences in the interleaving. The order of characters in x and y are preserved in the interleaving.

Given *x*, *y*, and *s*, write a function that determines whether *s* is a valid interleaving of *x* and *y*.
*/

// function isInterleaving(a, b, interleaved) {
//     const interleaves = new Set()
//     function helper(aIdx, bIdx, str) {
//         if (str.length === interleaved.length) {
//             interleaves.add(str)
//             return
//         }
//         if (aIdx === a.length || bIdx === b.length) {
//             if (aIdx === a.length) {
//                 while (bIdx < b.length) {
//                     str += b[bIdx]
//                     bIdx++
//                 }
//             }
//             else {
//                 while (aIdx < a.length) {
//                     str += a[aIdx]
//                     aIdx++
//                 }
//             }
//             interleaves.add(str)
//             return
//         }

//         // pick which word to add letter from
//         let incrAOrBIdx = Math.round(Math.random())
//         // increment picked word's idx
//         // recurse
//         // decrement picked word's idx
//         if (incrAOrBIdx === 0) {
//             str += a[aIdx]
//             helper(aIdx++, bIdx, str)
//             str = str.slice(0, str.length)
//         } else {
//             str += b[bIdx]
//             helper(aIdx, bIdx++, str)
//             str = str.slice(0, str.length)
//         }

//         helper(aIdx, bIdx, str)
//     }

//     helper(0, 0, "")
//     return interleaves.has(interleaved)
// }

function isInterleavingBest(x, y, s) {
    if (x.length + y.length !== s.length)
        return false
  
    if (x === '' && y === '')
        return s.length === 0
  
    if (x.length !== 0 && s[0] === x[0])
        return isInterleaving(x.slice(1), y, s.slice(1))
  
    if (y.length !== 0 && s[0] === y[0])
        return isInterleaving(x, y.slice(1), s.slice(1))
  
    return false
}

// console.log(isInterleaving("ABC", "DEF", "ABCDEF"), true)
// console.log(isInterleaving("ABC", "DEFG", "ADBECFG"), true)
console.log(isInterleavingBest("ABCD", "EFG", "ABECFDG"), true)
console.log(isInterleavingBest("ABC", "BCD", "BABCDD"), false)
// console.log(isInterleaving("ABC", "BCD", "BABDCC"), false)