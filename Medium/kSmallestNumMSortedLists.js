// given M sorted arrays, find kth smallest number among all arrays
// e.g. L1 = [2,6,8], L2 = [3,6,7], L3 = [1,3,4], k = 5
// output = 4
// [1,2,3,3,4,6,6,7,8], 5th smallest = 4
// e.g. L1 = [5,8,9], L2 = [1,7], k = 3
// output = 7
// [1,5,7,8,9], 3rd smallest = 7

// approach 1: merge lists into 1, iterate through merged from 1 to k and return k
// time: O(n + nlogn), n = total # elements in all lists
// space: O(n)
function kthSmallest(lists, k) {
    const merged = []
    for (const list of lists) {
        for (const elem of list) {
            merged.push(elem)
        }
    }

    merged.sort((a, b) => a - b)

    if (k - 1 < merged.length) {
        return merged[k - 1]
    }

    return -1
}

const lists = [[1,2,3],[-1,2,4,6],[-5,2,7,10],[100]]
console.log(kthSmallest(lists, 2), -1)
console.log(kthSmallest(lists, 12), 100)
console.log(kthSmallest(lists, 1), -5)

// approach 2: priority queue
// create min heap and push in values from each list into heap: for each value, push [value, idx of list of origin, index of value]
function kthSmallestHeap(lists, k) {
    
    // instantiate heap and push in initial values from lists 
    let heap = []
    for (let i = 0; i < lists.length; i++) {
        heap.push([lists[i][0], i, 0])
    }
    heap.sort((a, b) => a[0] - b[0])

    // iterate k times to find kth smallest element
    for (let i = 0; i < k; i++) {
        let smallestElem = heap.shift() // extract smallest element
        let [val, listIndex, valIndex] = smallestElem // destruct

        // if there's a next element in same list, push it onto the heap
        let sameList = lists[listIndex]
        if (valIndex + 1 < sameList.length) { // bounds check for next element in list
            let nextElemSameList = [sameList[valIndex + 1], listIndex, valIndex + 1]
            heap.push(nextElemSameList)
        }

        // re-sort heap after adding new element
        heap.sort((a, b) => a[0] - b[0])

        // if this is the kth iteration, return kth smallest element
        if (i === k - 1) return val
    }

    return null
}

console.log(kthSmallestHeap(lists, 1), -5)
console.log(kthSmallestHeap(lists, 2), -1)
console.log(kthSmallestHeap(lists, 3), 1)
console.log(kthSmallestHeap(lists, 4), 2)

// after heap instantiation
// [1,0,0],[-1,1,0],[-5,2,0],[100,3,0]
// after sort
// [-5,2,0],[-1,1,0],[1,0,0],[100,3,0]
// after 0th iteration up to k:
// remove smallestElem from min heap = [-5,2,0]
// next elem [2,2,1] exists, so push it to heap
// heap after re-sorting: [-1,1,0],[1,0,0],[2,2,1],[100,3,0]

// pitfall: .sort() isn't really sorting the heap: must implement heap class with heapify up/down methods