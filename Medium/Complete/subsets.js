function subsetsLC(nums) {
	const powerset = [];
	generatePowerset([], 0);

	function generatePowerset(path, index) {
		// pushes concatenated elem from previous call in this call
		powerset.push(path);

		// this loop includes base case AND recursive call
		// base case: since i + 1 is passed into recursive call, recursion doesn't run when i = array length
		// recursive: runs as long as i < array length
		// unique subsets created since loop starts from passed-in index
		for (let i = index; i < nums.length; i++) { 
			generatePowerset([...path, nums[i]], i + 1);
		}
	}

	return powerset;
}

function subsetsLC2(nums) {
	let result = [];
    dfs([], 0);
    
    function dfs(current, index){
        result.push(current);
        for(let i = index; i < nums.length; i++) {
            dfs(current.concat(nums[i]), i + 1);
        }
    }
    
    return result;
}

let ans1 = [[],[1]]
let ans2 = [[],[1],[1,2],[2]]
let ans3 = [[],[1],[1,2],[1,3],[1,3],[2,3],[1,2,3]]
// let ans4 = [[],[1],[2],[1,2],[3],[1,3],[2,3],[4],[1,4],[2,4],[3,4],[1,2,4],[1,3,4],[2,3,4],[1,2,3,4]]

console.log(subsetsLC2([1]))
console.log(subsetsLC2([1,2]))
console.log(subsetsLC2([1,2,3]))
console.log(subsetsLC2([1,2,3,4]))

// [1,2,3]
// dfs([], 0)
	// pushed []
	// iterate i = 0
	// dfs([1], i + 1)
		// pushed [1]
		// iterate i = 1
		// dfs([1,2], i + 1)
			// pushed [1,2]
			// iterate i = 2
				// dfs([1,2,3], i + 1)
					// pushed [1,2,3]
					// iterate i = 3 (loop doesn't run), thus recursion stops
			// loop stops
		// i = 2
		// dfs([1,3], i + 1)
			// pushed [1,3]
			// iterate i = 3 (loop doesn't run)
		// loop stops
	// i = 1
	// dfs([2], i + 1)
		// pushed [2]
		// iterate i = 2
		// dfs([2,3], i + 1)
			// pushed [2,3]
			// iterate i = 3, loop doesn't run
		// loop stops
	// i = 2
	// dfs([3], i + 1)
		// pushed [3]
		// iterate i = 3, loop doesn't run
	// loop stops
// return [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]
					