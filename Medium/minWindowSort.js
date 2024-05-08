/*Given an array, find the length of the smallest subarray in it which, when sorted, will sort the whole array.

Example(s)
Input: [1, 2, 5, 3, 7, 10, 9, 12]
Output: 5
Explanation: We need to sort only the subarray [5, 3, 7, 10, 9] to make the whole array sorted.

Input: [1, 3, 2, 0, -1, 7, 10]
Output: 5
Explanation: We need to sort only the subarray [1, 3, 2, 0, -1] to make the whole array sorted.

Plan:
Find the first element out of sorted order from the left and from the right. These two elements will be the 
bounds of the candidate subarray that needs to be sorted. However, this candidate subarray will only be valid if (i) 
there are no elements left of the subarray which are larger than the minimum of the subarray, and (ii) there are 
no elements of the subarray which are smaller than the maximum of the subarray. If either of these conditions is 
false, extend the array left or right to ensure that those elements fall within the final subarray to be sorted.

Input: [1, 2, 5, 3, 7, 10, 9, 12]
1. find first unsorted element L->R - 3, i = 3
2. find first unsorted element R->L - 10, i = 5
3a. candidate subarray = [3,7,10]
3b. min of subarray: 3
4. left of subarray = 5, larger than min, thus extend [5,3,7,10]
5. max of subarray: 10
6. right of subarray = 9, smaller than max, thus extend [5,3,7,10,9]
7. left of subarray = 2, smaller than min
8. right of subarray = 12, larger than max
9. return length of subarray, or distance between L and R indices

by checking left + if larger than min, ensures 

*/

function shortestWindowSort(arr) {

    let n = arr.length
    if (n < 1) return 0
    
    // get first unsorted elem, L->R
    let start = arr[0], i = 1
    while (arr[i] > start && i < n) {
        i++
    }
    start = arr[i]
    
    // get first unsorted elem, R->L
    let end = arr[n - 1]
    i = n - 1
    while (arr[i] < end && i >= 0) {
        i--
    }
    end = arr[i]

    function getMin() {
        let min = arr[start]
        for (let j = start + 1; j < end; j++) {
            min = Math.min(min, arr[j])
        }
        return min
    }

    function getMax() {
        let max = arr[start]
        for (let j = start + 1; j < end; j++) {
            max = Math.max(max, arr[j])
        }
        return max
    }

    // get min and max of candidate subarray
    let min = getMin(), max = getMax()

    // verify no elements to left of cand. subarr. < min
    // verify no elements to right of cand. subarr. > max
    while (arr[start] < min) {
        start--
    }

    while (arr[end] > max) {
        end++
    }

    // return length of corrected subarray
    return arr.slice(start, end).length
}