// Recursive / Backtracking Solution
// This solution is not good because it is exponential runtime. Use dynamic programming to remember the solution to the subproblems.
function maxProfit(coins) {
    function helper(start, count) {
      if (count === 1) {
        return coins[start];
      } else if (count === 2) {
        return Math.max(coins[start], coins[start + 1]);
      }
  
      return Math.max(
        coins[start] + Math.min(helper(start + 1, count - 2), helper(start + 2, count - 2)),
        coins[start + count - 1] + Math.min(helper(start, count - 2), helper(start + 1, count - 2))
      );
    }
  
    return helper(0, coins.length);
  }
  
  /*
  Python
  
  # Notice that this solution uses much more memory
  # than the Javascript solution above
  def max_profit(coins):
      if len(coins) == 1:
          return coins[0]
  
      elif len(coins) == 2:
          return max(coins)
  
      else:
          return max(
              coins[0] + min(max_profit(coins[2:]), max_profit(coins[1:-1])),
              coins[-1] + min(max_profit(coins[:-2]), max_profit(coins[1:-1]))
          )
  
  
  # DP Solution
  def max_profit(coins):
      n = len(coins)
      profit = [[0 for _ in range(n)] for _ in range(n)]
  
      for i in range(n):
          profit[i][i] = coins[i]
  
      for i in range(n - 1):
          profit[i][i + 1] = max(profit[i][i], profit[i + 1][i + 1])
  
      for gap in range(2, n):
          for i in range(n - gap):
              j = i + gap
              left = profit[i][j - 2]
              diagonal = profit[i + 1][j - 1]
              bottom = profit[i + 2][j]
              profit[i][i + gap] = max(
                  coins[i] + min(diagonal, bottom),
                  coins[j] + min(left, diagonal)
              )
  
      return profit[0][-1]
      
  
  
  */
  
  /*
  
  This solution utilizes dynamic programming because it breaks down the problem into smaller subproblems and utilizes the solutions to those subproblems to solve the larger problem. Here's how it works:
  
  Initialization:
  
  profit is initialized as a 2D array where profit[i][j] represents the maximum profit that can be obtained from the coins between indices i and j.
  Initially, the diagonal elements (profit[i][i]) are set to the values of the individual coins because if there's only one coin, the maximum profit is simply its value.
  Base Case:
  
  profit[i][i+1] is initialized as the maximum value between the two adjacent coins because in this case, the player has no choice but to pick the coin with the higher value.
  Filling the table:
  
  The algorithm iterates over all possible gaps between coins, from gap = 2 to n - 1.
  For each gap size, it computes the maximum profit that can be obtained by considering all possible choices for the first and last coins.
  It calculates the profit for the current subproblem by considering the two possible choices:
  If the player chooses the first coin, the opponent is assumed to choose optimally between profit[i+1][j-1] and profit[i+2][j].
  If the player chooses the last coin, the opponent is assumed to choose optimally between profit[i][j-2] and profit[i+1][j-1].
  The maximum profit between these two choices is stored in profit[i][i+gap].
  Final Answer:
  
  The maximum profit achievable by the first player is stored in profit[0][-1], which represents the entire range of coins.
  This approach ensures that each subproblem is solved only once, and its solution is reused when needed, making it efficient and avoiding redundant computations. This is the essence of dynamic programming.
  */