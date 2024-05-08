/*
'''
Coin Change Number of Ways

You are given coins of different denominations and a total amount of money. Write a function to compute the "number of combinations" that make up that amount.
 

EXAMPLE(S)
Input: amount = 5, coins = [1, 2, 5]
Output: 4
Explanation: there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1

Input: amount = 3, coins = [2]
Output: 0
Explanation: the amount of 3 cannot be made up just with coins of 2.

Input: amount = 10, coins = [10] 
Output: 1
 

FUNCTION SIGNATURE
func coinChangeCombinations(coins: [Int], amount: Int) -> Int
'''
*/

function coinChangeCombinations(coins, amount) {
    const dp = Array(amount + 1).fill(0);
    dp[0] = 1;
  
    for (const coin of coins) {
      for (let i = 0; i <= amount; i++) {
  
        if (i >= coin) {
          dp[i] += dp[i - coin];
          console.log(coin, i, dp)
        }
      }
    }
  
    return dp[amount];
  }
  
  console.log(coinChangeCombinations([1, 2, 5], 5)) // 4
  console.log(coinChangeCombinations([2, 5], 2)) //1