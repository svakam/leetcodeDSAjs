function subsetsLC(nums) {
	const powerset = [];
	generatePowerset([], 0);

	function generatePowerset(path, index) {
		powerset.push(path);
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
        for(let i = index; i < nums.length; i++) { // recursion to idx + 1 within iteration allows generating subsets 
            dfs(current.concat(nums[i]), i + 1);
        }
    }
    
    return result;
}

let ans1 = [[],[1]]
let ans2 = [[],[1],[2],[1,2]]
let ans3 = [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
let ans4 = [[],[1],[2],[1,2],[3],[1,3],[2,3],[4],[1,4],[2,4],[3,4],[1,2,4],[1,3,4],[2,3,4],[1,2,3,4]]

console.log(subsetsLC2([1]))
console.log(subsetsLC2([1,2]))
console.log(subsetsLC2([1,2,3]))
console.log(subsetsLC2([1,2,3,4]))
