function countSubarraySum(nums, k) {
  let currSum = 0;
  const seenSums = {0: 1};
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
      currSum += nums[i];
      count += seenSums[currSum - k] || 0;
      seenSums[currSum] = (seenSums[currSum] || 0) + 1;
  }
  return count;
}