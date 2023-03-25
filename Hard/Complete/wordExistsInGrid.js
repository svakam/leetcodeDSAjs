function wordExists(board, word) {
  if (!board || !board.length)
    return false

  const rows = board.length
  const cols = board[0].length
  const visited = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false))

  function dfs(i, j, k) {
    if (i < 0 || i >= rows || j < 0 || j >= cols || visited[i][j] || board[i][j] !== word[k])
      return false

    if (k === word.length - 1)
      return true

    visited[i][j] = true
    const result =
      dfs(i - 1, j, k + 1) ||
      dfs(i + 1, j, k + 1) ||
      dfs(i, j - 1, k + 1) ||
      dfs(i, j + 1, k + 1)
    visited[i][j] = false
    return result
  }

  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      if (dfs(i, j, 0))
        return true

  return false
}

const board = [
  ['A', 'B', 'C'],
  ['D', 'E', 'F'],
  ['G', 'H', 'I']]
console.log(wordExists(board, "ABEHI") === true)
console.log(wordExists(board, "AE") === false)
console.log(wordExists(board, "AC") === false)
console.log(wordExists(board, "ABA") === false)
console.log(wordExists(board, "ABCFEDGHI") === true)
console.log(wordExists(board, "ABCDEFGHI") === false)

const board2 = [
  ['A', 'A', 'A'],
  ['A', 'A', 'A'],
  ['A', 'A', 'B']]
console.log(wordExists(board2, "ABA") === true)
console.log(wordExists(board2, "ABB") === false)
console.log(wordExists(board2, "BAAAAAAAB") === false)