// (a) Choose any two numbers from the array and perform a mathematical operation on them. This will result in a new value.
// (b) Remove the two numbers used in step (a), and replace them with the new value.
// (c) Repeat steps (a) and (b) with the updated array until the array only contains one number.
// (d) If this number is 24, then we found a result. Otherwise, we backtrack and try selecting the numbers in a different 
//  order or using a different permutation of mathematical operations.

const judgePoint24 = function(nums) {
	//converting all the integers to decimal numbers.
    nums = nums.map(num => Number(num.toFixed(4)));
    
	//Function that calculates all possible values after all operations on the numbers passed
    const computeTwoNums = (num1, num2) => {
        return [num1 + num2, num1 - num2, num2 - num1, num1 * num2, num1/num2, num2/num1];
    };
    
    const dfs = (list) => {
        let size = list.length;
        if(size === 1) {
            if(Math.abs(list[0] - 24) < 0.001) return true;
            else return false;
        }
        
        for(let i = 0; i < size; i++) {
            for(let j = i + 1; j < size; j++) {
                let nextRound = [];
                for(let k = 0; k < size; k++) {
                    if(k !== i && k !== j) nextRound.push(list[k]);
                }
                for(let val of computeTwoNums(list[i], list[j])) {
                    nextRound.push(val);
                    if(dfs(nextRound)) return true;
                    else nextRound.pop();
                }
            }
        }
        return false;
    };
    
    return dfs(nums);
};

let cards = [4,1,8,7]
let no = [1,2,1,2]
console.log(judgePoint24(cards), true)
console.log(judgePoint24(no), false)

// Separate function to compute all operations between two nums and return those results

// helper method that takes in a list
    // base case: if that list length is 1, and if list[0] - 24 < 0.001, this decision tree branch of operations and numbers equates to 24 thus return true, else return false
    // recursion: 
        // pick all but two numbers to push into “next round” that passes into recursive call
        // The other two numbers, compute all operations on them, and for each result, backtrack with recursion
            // Push this val into next round, recurse, and pop val - try with next val
            // This gets all possible operations and all combinations

