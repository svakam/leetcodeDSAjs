public class Solution {
  public static void main(String[] args) {
    String[][] test = {{"+", "+", "+"}, {"+", "W", "+"}, {"+", "+", "+"}};
    String[][] test2 = {{"W", "+", "W"}, {"W", "B", "B"}, {"W", "W", "B"}};
    String[][] test3 = {{"B", "+", "+"}, {"+", "B", "B"}, {"+", "+", "B"}};
    System.out.println(countLiberties(test, 1, 1) + " 4");
    System.out.println(countLiberties(test2, 1, 1) + " 1");
    System.out.println(countLiberties(test3, 1, 1) + " 4");
  }

  public static int countLiberties(String[][] board, int x, int y) {
    // instantiate board of visited
    String[][] visited = {{"-","-","-"},{"-","-","-"},{"-","-","-"}};
    // take note of starting color piece
    
    String startingPiece = board[x][y];

    return helper(board, visited, x, y, startingPiece);
  }

  public static int helper(String[][] board, String[][] visited, int x, int y, String startingPiece) {
    int liberties = 0;
    // bounds check and if visited
    if (x < 0 || x >= board.length || y < 0 || y >= board.length || visited[x][y] == "+") {
      return 0;
    }

    // mark curr position as visited
    visited[x][y] = "+";
    
    // board[x][y] == '+' -> liberties++
    if (board[x][y] == "+") {
      liberties++;
    }

    // board[x][y] == 'W' || 'B' -> check all the adjacent cells and add to liberties
    // (x, y+1) (x-1, y) (x+1, y) (x, y-1)
    // traverse only in direction of connecting group, passing in starting color piece
    if (board[x][y] == startingPiece) {
      liberties += helper(board, visited, x + 1, y, startingPiece) + helper(board, visited, x, y + 1, startingPiece) + helper(board, visited, x - 1, y, startingPiece) + helper(board, visited, x, y - 1, startingPiece); // down
    }
    
    // might need to change this
    return liberties; 
  }
  //   y
  // [[1,2], x
  //  [3,4],
  //  [5,6]]
}