function isAttackedByQueens(n, queries, queens) {
    const attackedRows = new Set();
    const attackedCols = new Set();
    const attackedDiagonals = new Set();
  
    // Mark positions attacked by queens
    for (const [row, col] of queens) {
      attackedRows.add(row);
      attackedCols.add(col);
      attackedDiagonals.add(row - col);
      attackedDiagonals.add(row + col);
    }
  
    // Check each query position
    const result = queries.map(([row, col]) => {
      return (
        attackedRows.has(row) ||
        attackedCols.has(col) ||
        attackedDiagonals.has(row - col) ||
        attackedDiagonals.has(row + col)
      );
    });
  
    return result;
  }
  
  // Example usage:
  const n = 8; // Size of the chessboard
  const queries = [
    [0, 0],
    [3, 4],
    [7, 7],
  ];
  const queens = [
    [0, 1],
    [2, 3],
    [4, 4],
    [6, 5],
  ];
  
  const result = isAttackedByQueens(n, queries, queens);
  console.log(result);