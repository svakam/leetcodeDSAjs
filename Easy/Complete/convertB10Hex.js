// convert base 10 to hex

function convertBase10ToBase16(n) {
    const map = new Map()
    map.set(0, '0')
    map.set(1, '1')
    map.set(2, '2')
    map.set(3, '3')
    map.set(4, '4')
    map.set(5, '5')
    map.set(6, '6')
    map.set(7, '7')
    map.set(8, '8')
    map.set(9, '9')
    map.set(10, 'A')
    map.set(11, 'B')
    map.set(12, 'C')
    map.set(13, 'D')
    map.set(14, 'E')
    map.set(15, 'F')

    let outputCharArr = [], s = []
    while (n > 0) {
        s.push(map.get(n % 16))
        console.log(n % 16)
        n = Math.floor(n / 16)
    }
    while (s.length > 0) {
        outputCharArr.push(s.pop())
    }
    console.log(outputCharArr)
    return outputCharArr.join('')
}

console.log(convertBase10ToBase16(9), "9")
console.log(convertBase10ToBase16(10), "A")
console.log(convertBase10ToBase16(11), "B")
console.log(convertBase10ToBase16(12), "C")
console.log(convertBase10ToBase16(13), "D")
console.log(convertBase10ToBase16(14), "E")
console.log(convertBase10ToBase16(15), "F")
console.log(convertBase10ToBase16(16), "10")
console.log(convertBase10ToBase16(17), "11")
console.log(convertBase10ToBase16(18), "12")
console.log(convertBase10ToBase16(19), "13")
console.log(convertBase10ToBase16(20), "14")
console.log(convertBase10ToBase16(21), "15")
console.log(convertBase10ToBase16(22), "16")
console.log(convertBase10ToBase16(32), "20")
console.log(convertBase10ToBase16(910), "38E")
console.log(convertBase10ToBase16(13849), "3619")
