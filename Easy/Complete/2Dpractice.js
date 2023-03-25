function getAvgColMin(arr) {
    let sum = 0
    for (let col = 0; col < arr[0].length; col++) {
        let colMin = Infinity
        for (let row = 0; row < arr.length; row++) {
            colMin = Math.min(colMin, arr[row][col])
        }
        sum += colMin
    }
    return sum / arr[0].length
}

function getAvgRowMin(arr) {
    let sum = 0
    for (let row = 0; row < arr.length; row++) {
        let rowMin = Infinity
        for (let col = 0; col < arr[0].length; col++) {
            rowMin = Math.min(rowMin, arr[row][col])
        }
        sum += rowMin
    }
    return sum / arr.length
}

function linearizeRow(arr) {
    let output = []
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            output.push(arr[i][j])
        }
    }
    return output
}

function linearizeCol(arr) {
    let output = []
    for (let i = 0; i < arr[0].length; i++) {
        for (let j = 0; j < arr.length; j++) {
            output.push(arr[j][i])
        }
    }
    return output
}

let test = [
    [32,23,3],
    [23,7,5]
]
let test2 = [
    [1,2,3],
    [4,5,6],
    [9,7,8]
]
console.log(getAvgColMin(test), (23 + 7 + 3) / 3)
console.log(getAvgRowMin(test), (3 + 5) / 2)
console.log(getAvgColMin(test2), (1 + 2 + 3) / 3)
console.log(getAvgRowMin(test2), (1 + 4 + 7) / 3)
console.log(linearizeRow(test), [32,23,3,23,7,5])
console.log(linearizeCol(test), [32,23,23,7,3,5])
console.log(linearizeRow(test2), [1,2,3,4,5,6,9,7,8])
console.log(linearizeCol(test2), [1,4,9,2,5,7,3,6,8])
