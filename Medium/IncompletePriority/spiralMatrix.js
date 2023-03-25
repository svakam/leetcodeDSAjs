function spiral(m) {
    const output = []
    let row = 0, col = 0
    let top = 0, left = 0, right = m[0].length - 1, bottom = m.length - 1

    while (top <= bottom && left <= right) {
        // traverse top
        for (let col = left; col <= right; col++) {
            push(row, col)
        }
        top++

        // traverse right
        for (let row = top; row <= bottom; row++) {
            push(row, col)
        }
        right--

        // traverse bottom
        for (let col = right; col >= left; col--) {
            push(row, col)
        }
        bottom--

        // traverse left
        for (let row = bottom; row >= top; row--) {
            push(row, col)
        }
        left++
    }

    function push(row, col) {
        output.push(m[row][col])
    }

    return output
}

let square = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]
let wide = [
    [4,3,2,1],
    [8,7,6,5],
    [12,11,10,9]
]
let tall = [
    [7,6,5],
    [1,2,8],
    [4,3,9],
    [11,10,12],
    [13,14,15]
]
console.log(spiral([[1,2],[3,4]]), [1,2,4,3])
console.log(spiral(square), [1,2,3,6,9,8,7,4,5])
console.log(spiral(wide), [4,3,2,1,5,9,10,11,12,8,7,6,5])
console.log(spiral(tall), [7,6,5,8,9,12,15,14,13,11,4,1,2,3,10])