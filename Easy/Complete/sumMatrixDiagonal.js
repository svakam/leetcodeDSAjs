function sumDiagonal(arr) {
    if (arr.length === 1) return arr[0][0]
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i][i]
    }
    for (let i = 0; i < arr.length; i++) {
        let j = arr.length - i - 1
        if (j !== i) {
            sum += arr[i][j]
        }
        j--
    }
    return sum
}


const arrOdd = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]
const arrEven = [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,16]
]
const arrOne = [
    [1]
]
const arrSmall = [
    [1,2],
    [3,4]
]
console.log(sumDiagonal(arrOdd), 1 + 5 + 9 + 3 + 7)
console.log(sumDiagonal(arrEven), 1 + 6 + 11 + 16 + 4 + 7 + 10 + 13)
console.log(sumDiagonal(arrOne), 1)
console.log(sumDiagonal(arrSmall), 1 + 2 + 3 + 4)

// i = 2, j = 1