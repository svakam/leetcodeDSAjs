/*
'''
Given an array where each number is located at most k places away from its sorted position, fully sort the array.

Assumptions:
Valid array filled with ints
>= 0 length?
k >= 0
k < length of array
cannot wrap elements
- we can only search up to the end or beginning
- for arr[i], abs(array.length - i) can be > k,
- if arr[i + 1] = arr[i] + 1, slide the window
- always ask if input can be mutated

EXAMPLE(S)
[3, 4, 1, 2, 6, 5], k = 2
returns [1, 2, 3, 4, 5, 6]


[10,12,15,17,100,106], k = 2
[12,17,10,15,106,100]


FUNCTION SIGNATURE
def k_sort(input, k)
'''

[3, 4, 1, 2, 6, 5], k = 2

[1,3,4,2,6,5]
[1,2,4,3,6,5]
[1,2,3,4,6,5]

.sort() on k elements:
n * klog(k) (if k small)
n * nlog(n)

queue:
n * k (time)


two pointer:
n * k (time)

minHeap:
n * logk

heap max size is k elements - sliding over adds new element and bubble up min
*/

function k_sort(input, k) {
    // iterate through each element
    for (let i = 0; i < input.length; i++) {
      let min = input[i]
  
      // sliding window up to k elements
      for (let window = i + 1; window <= i + k; window++) {
  
        if (window < input.length && input[window] < min) {// check for minimum
          
  
          [input[i], input[window]] = [input[window], input[i]] // swap minimum with current i
          console.log(input[window])
          console.log(input[i])
          min = input[i]
        }
      }
    }
  
      //[myArray[0], myArray[1]] = [myArray[1], myArray[0]];
  
    return input
  }
  
  console.log(k_sort([10,12,15,17,100,106], 2))
  console.log(k_sort([3, 4, 1, 2, 6, 5], 2))
  