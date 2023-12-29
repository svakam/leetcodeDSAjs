function siftDown(minHeap) {
    if (minHeap.length === 0) return null
    if (minHeap.length === 1) return minHeap[0]

    let min = minHeap[0]

    // swap first and last
    swap(minHeap, 0, minHeap.length - 1)
    minHeap.pop() // pop previous min

    // sift down swapped elem until lowest possible level
    helper(0, minHeap)

    return min
}

function helper(siftDownIdx, minHeap) {
    if (siftDownIdx < minHeap.length / 2) {
        let left = (2 * siftDownIdx) + 1, right = (2 * siftDownIdx) + 2 // get left and right indices

        // try to swap current elem with smallest of left and right children
        let currMinIdx
        if (minHeap[right] < minHeap[left]) {
            currMinIdx = right
        } else if (minHeap[left] < minHeap[right]) {
            currMinIdx = left
        } else {
            currMinIdx = siftDownIdx
        }

        // if elem to sift down can go lower, continue to sift down
        if (currMinIdx !== siftDownIdx) {
            swap(minHeap, siftDownIdx, currMinIdx)
            helper(currMinIdx, minHeap)
        }
    }
}

function swap(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

const arr = [1,2,4,3,5,6,9,11]
console.log(siftDown(arr), arr)

//                            
//          1                         
//      2       4                        
//   3    5   6   9                            
// 11       
// [1,2,4,3,5,6,9,11]
//
/*
//          11                         
//      2       4                        
//   3    5   6   9                            
// 1       
// [11,2,4,3,5,6,9,1] (remove end)
// 
//          2                        
//     11       4                        
//   3    5   6   9      
// [2,11,4,3,5,6,9]                          
// 
//          2                        
//      3       4                        
//   11    5   6   9      
// [2,3,4,11,5,6,9]                             
//

//                            
//          1                         
//      4       2                        
//   3    5   6   9                            
// 11       
*/