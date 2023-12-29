/*
Imagine you're coordinating a voting station, and there are multiple lines of people waiting. However, not everyone is in the proper place in line (some have cut in front others, naturally).

You're given a grid/matrix representing people as integer values. The lower the number, the higher the priority in line (eg: 1 should be first in line).

The grid has diagonal (voting) **lines **of cells starting from some cell in either the top row or leftmost column - leading to the bottom right/grid's end.

Given an m x n grid grid of integers, sort each grid diagonal in ascending order and return the resulting grid. You may safely assume your grid is rectangular/valid.

For example:

[[3,3,1,1],
[2,2,1,2],
[1,1,1,2]]
would return

[[1,1,1,1],
[1,2,2,2],
[1,2,3,3]]
*/


function solution(grid) {
    let numRows = grid.length, numCols = grid[0].length
    const output = []
    
    const set = new Set()
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            set.add(grid[i][j])
        }
    }
    
    // order the set via insertion sort into array
    const sortedList = []
    
    for (const key of set.keys()) {
        sortedList.push(key)
    }
    sortedList.sort((a, b) => a - b)
    
    // create rows in output
    for (let i = 0; i < numRows; i++) {
        output.push([])
    }
    
    // insert elements into output
    let startTop = 0
    
    for (const key of sortedList) {
        // go right until the end, for this index
        for (let i = 0; i < numRows; i++) {
            output[i][startTop] = key
        }
        // go down until the end
        for (let i = 0; i < numCols; i++) {
            output[startTop][i] = key
        }
        
        startTop++
    }
    
    return output
}

/*
 * [3,3,1,1],
 * [2,2,1,2],
 * [1,1,1,2]
 * 
 * 6 1's
 * 4 2's
 * 2 3's
 * 
 * // create a hashset of unique priorities
 * // the number of unique priorities should equal the unique number of row-col each priority should fill
 * // highest priority in the set should occupy the outer "layer", next highest the next inner layer, until filled
*/