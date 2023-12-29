function countSubarraySum(nums, k) {
    let currSum = 0 // initialize curr sum to 0
    
    // initialize hash map with sum of 0 seen at least once
    const seenSums = {0: 1}
    
    // set count of sums = to k as 0
    let count = 0
    
    // iterate over array
    for (let i = 0; i < nums.length; i++) {
        currSum += nums[i] // add curr element to sum
        
        // check if currSum - k exists in the hash map; if it does, there is a subarray ending at index i whose sum is equal to k, so increment 
        // count of sums
        count += seenSums[currSum - k] || 0
      
        // update hash map by incrementing count of curr sum
        seenSums[currSum] = (seenSums[currSum] || 0) + 1
    }

    // return count
    return count
}