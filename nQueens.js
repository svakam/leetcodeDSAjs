function nQueens(n) {
    
}

// place n queens on an n x n chessboard and output number of solutions (i.e. all possible arrangements that all n queens can be laid out)

// 1. iterate over each row in board, i.e. once last row on board reached, explored all solutions
// 2. at each iteration, further iterate over each column; here, explore possibility of placing queen on curr cell
// 3. before queen placed, must check that this is not in zone of attack by previously placed queens; implement function is_not_under_attack(row, col) to check
// 4. once check passes, place queen and mark out attacking zone of this queen; dedicate function place_queen(row, col)
// 5. should be able to abandon previous decision at moment of moving onto next candidate (spot); function remove_queen(row, col) to revert this along with step 4