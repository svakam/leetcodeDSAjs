function permute(nums) {
    let output = []
    let used = new Set()

    let recurse = function(idx, currPermutation) {
        if (idx === nums.length) {
            output.push([...currPermutation])
            return
        }

        for (const num of nums) {
            if (!used.has(num)) {
                used.add(num)
                currPermutation.push(num)
                recurse(idx + 1, currPermutation)
                used.delete(num)
                currPermutation.pop()
            }
        }
    }

    recurse(0, [])

    return output

    // 3 spots for available numbers
    // at every spot, can either include a given number or not
    // once seat occupied, remove number from available numbers and recurse on next
    // base case: once all seats are occupied, add to output
}

console.log(permute([]))
console.log(permute([1]))
console.log(permute([1,2]))
console.log(permute([1,2,3]))
console.log(permute([1,2,3,4]))



// time complexity: O(2^n), n = number of elements in input arr
// space: O()