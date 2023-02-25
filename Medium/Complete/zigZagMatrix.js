function zigZag(m) {
    const output = []
    let j = 0, jFwd = true

    for (let i = 0; i < m.length; i++) {
        // console.log("i " + i)
        while (j < m[i].length && j >= 0) {
            // console.log("j " + j)
            output.push(m[i][j])
            jFwd ? j++ : j--
        }
        j = j < 0 ? ++j : --j
        // console.log("j reset " + j)
        jFwd = !jFwd
    }

    return output
}

let square = [[1,2,3],[4,5,6],[7,8,9]]
let rectWide = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
let rectTall = [[1,2],[3,4],[5,6],[7,8],[9,10],[11,12],[13,14]]

        //  j
//  [1,2,3]
//  [4,5,6]
// i[7,8,9]
// every time j goes out of bounds, increment i and switch direction of j
// how to declare j direction? j++, j-- with bool - if true, j++, if false, j--

console.log(zigZag(square), [1,2,3,6,5,4,7,8,9])
console.log(zigZag(rectWide), [1,2,3,4,8,7,6,5,9,10,11,12])
console.log(zigZag(rectTall), [1,2,4,3,5,6,8,7,9,10,12,11,13,14])