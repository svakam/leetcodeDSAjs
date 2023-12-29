// return new matrix where k is nonnegative int and i - k <= r <= i + k, j - k <= c <= j + k

function solution(matrix, k) {
    if (k === 0) {
        return matrix;
    }

    const m = matrix.length;
    const n = matrix[0].length;
    const output = [];

    for (let r = 0; r < m; r++) {
        const row = [];

        for (let c = 0; c < n; c++) {
            let sum = 0;

            for (let i = Math.max(0, r - k); i <= Math.min(m - 1, r + k); i++) {
                for (let j = Math.max(0, c - k); j <= Math.min(n - 1, c + k); j++) {
                    sum += matrix[i][j];
                }
            }

            row.push(sum);
        }

        output.push(row);
    }

    return output;
}