function solution(matrix) {

    const rotatedMatrix = []
    const rows = matrix.length, cols = matrix[0].length
    
    // initialize rotated matrix with zeros
    for (let i = 0; i < cols; i++) {
        rotatedMatrix[i] = Array(rows).fill(0)
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            rotatedMatrix[j][rows - 1 - i] = matrix[i][j];
        }
    }

    return rotatedMatrix
}

// [1,2,3,12] -> 
// [4,5,6,11]
// [7,8,9,10]

// [1, 2, 3, 4, 5],
// [6, 7, 8, 9, 10],
// [11,12,13,14,15],
// [16,17,18,19,20]

// [1,2,3],
// [4,5,6],
// [7,8,9],
// [10,11,12],
// [13,14,15],
// [16,17,18]
