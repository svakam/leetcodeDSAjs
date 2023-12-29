/* 
xor (exclusive or) i.e. are both bits exclusively one "or" the other? 1 for yes, 0 for no

truth table
x | y | x ^ y
-------------
0 | 0 |   0
0 | 1 |   1
1 | 0 |   1
1 | 1 |   0

xor rules:
x ^ 0 = x
x ^ x = 0
x ^ y = y ^ x
if a sequence of xor operations are done on a list of numbers, all duplicate pairs (not exclusive or's) are removed without affecting the result
a ^ b ^ c ^ b ^ a = a ^ a ^ b ^ b ^ c = 0 ^ 0 ^ c = c
*/

// swap two values without helper variables
function swapValues(x, y) {
    console.log("before ", x, y)

    // x, y
    x = x ^ y // => x ^ y, y
    y = y ^ x // => x ^ y, (y ^ x = y ^ x ^ y = x) => x ^ y, x
    x = x ^ y // => y ^ x  

    console.log("after ", x, y)
}
console.log(swapValues(1, 2))