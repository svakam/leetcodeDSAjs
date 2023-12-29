/* BRAINSTORM
 * CONSTRAINTS:
 * an array of 9 arrays
 * each array = sudoku row
 * 0 <= array[i][j] <= 9
 * if (arr[i][j] = 0), then empty cell
 *
 * any coordinate arr[i][j] may be solved or unsolved
 * 3 conditions for solved coordinate:
 * every column of its own contains 1-9
 * every row of its own contains 1-9
 * every box of its own contains 1-9 
 * 
 * ALGO:
 * 
 * 
 * 
 * 
 */

function solution(sudoku) {
    
}


let sudoku = [[5,3,0,0,7,0,0,0,0], 
              [6,0,0,1,9,5,0,0,0], 
              [0,9,8,0,0,0,0,6,0], 
              [8,0,0,0,6,0,0,0,3], 
              [4,0,0,8,0,3,0,0,1], 
              [7,0,0,0,2,0,0,0,6], 
              [0,6,0,0,0,0,2,8,0], 
              [0,0,0,4,1,9,0,0,5], 
              [0,0,0,0,8,0,0,7,9]]

console.log(solution(sudoku))