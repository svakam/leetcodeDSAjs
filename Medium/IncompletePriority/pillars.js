function maxAreaBF(heights) {
    let total = 0

    for (let left = 0; left < heights.length; left++) {
        for (let right = left + 1; right < heights.length; right++) {
            let width = right - left
            total = Math.max(total, Math.min(heights[left], heights[right]) * width)
        }
    }
}

// total = 1
/*
5
4               |
3       | x x x |
2   | x | x x x |             1 + 2 + 3 + 3 = 9
1   | | | | x x |
0 1 2 3 4 5 6 7 8
*/
/*  A
    B 
to create valid container, walls must be at least 2 units apart (3 - 4 invalid)
how to decide water can be filled at a cross section? 
*/