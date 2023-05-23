// given array of unique integers, return pairs with least abs diff - if multiple pairs, return with ascending order

function findMinAbsDiff(arr) {

}

// for each elem, find its pair and store it in a hashamp with absolute value as key and pair as value
// don't consider if ith elem larger than jth elem
// iterate over hashmap to find smallest key and return its value - pairs of elems
// diff = 
// [1,4,2,6,3] -> [1,2],[2,3],[3,4]
//  i
// smallest abs value = 3
// curr array: 
// 1: [1,2],[2,3],[3,4]
// 2: [1,3],[4,6]
// 3: [1,4],[3,6]
// 5: [1,6]
// 