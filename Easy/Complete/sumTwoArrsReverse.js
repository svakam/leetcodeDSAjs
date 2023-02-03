function sumTwoArrs(arr1, arr2) {
    let output = []
    for (let i = 0; i < arr1.length; i++) {
        output.push(arr1[i] + arr2[arr2.length - 1 - i])
    }

    return output
}

function sumTwoArrsDiffImpl(arr1, arr2) {
    let output = []

    for (let i = 0, j = arr2.length - 1; i < arr1.length; i++, j--) {
        output.push(arr1[i] + arr2[j])
    }

    return output
}

let arr1 = [1,3,6,9]
let arr2 = [3,6,8,10]
console.log(sumTwoArrs(arr1, arr2), [11, 11, 12, 12])
