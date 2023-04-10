// given num as str and an int k, return smallest possible num after removing k digits

// Follow up : 
// https://leetcode.com/problems/daily-temperatures/
// https://leetcode.com/problems/next-greater-element-i/
// keeping track of history
// can be many more ahead, but don't know, so keep track via stack

function getSmallestInt(strNum, k) {
    // console.log(strNum)
    const s = []
    let output = ""

    // iterate through full string
    for (let i = 0; i < strNum.length; i++) {
        if (s.length) {
            // if curr num less than stack top, replace it until smallest; 
            if (parseInt(s[s.length - 1]) > parseInt(strNum[i]) && k > 0) {
                while (parseInt(strNum[i]) <= parseInt(s[s.length - 1]) && k > 0) {
                    s.pop()
                    k--
                }
            }
        }
        s.push(strNum[i])
    }

    // if digits to remove still remain, go back through stack and re-make smallest int
    // while (k > 0 && s.length) {
    //     let top = s.pop()
    //     console.log(top)
    //     if (top < s[s.length - 1]) {
    //         s.pop()
    //         s.push(top)
    //         k--
    //     } else {
    //         s.push(top)
    //     }
    // } 

    // convert stack to string and truncate front 0's
    for (let i = 0; i < s.length; i++) {
        output += s[i]
    }
    while (output[0] === '0') {
        output = output.substring(1, output.length)
    }

    // if numbers still remain and k digits still to remove, iterate through string again
    
    return output !== null ? output : 0
}

// 1234567
// [13]
// 234567, 1
// 134567, 2
// 124567, 3
// 123567, 4
// 123467, 5
// 123457, 6
// 123456, 7
    // 12345, 6
console.log(getSmallestInt("1234567", 1), 123456)
console.log(getSmallestInt("1234567", 2), 12345)
console.log(getSmallestInt("1234567", 3), 1234)
console.log(getSmallestInt("1234567", 4), 123)
console.log(getSmallestInt("1234567", 5), 12)
console.log(getSmallestInt("7654321", 1), 654321)
// console.log(getSmallestInt("1234567", 2), 34567)
// console.log(getSmallestInt("1234567", 3), 4567)
// console.log(getSmallestInt("1234567", 4), 567)
// console.log(getSmallestInt("1234567", 5), 67)
// console.log(getSmallestInt("1234567", 6), 7)
// console.log(getSmallestInt("1234567", 7), 0)
// console.log(getSmallestInt("481925673", 1), 41925673)
// console.log(getSmallestInt("481925673", 2), 1925673)
// console.log(getSmallestInt("481925673", 3), 125673)
// console.log(getSmallestInt("481925673", 4), 12563)
// console.log(getSmallestInt("481925673", 5), 1253)
// console.log(getSmallestInt("481925673", 6), 123)
// console.log(getSmallestInt("481925673", 7), 12)
// console.log(getSmallestInt("481925673", 8), 1)
// console.log(getSmallestInt("481925673", 9), 0)
// console.log(getSmallestInt("2405781", 1), 205781)
// console.log(getSmallestInt("2405781", 2), 5781)
// console.log(getSmallestInt("2405781", 3), 571)
// console.log(getSmallestInt("2405781", 4), 51)
// console.log(getSmallestInt("2405781", 5), 1)
// console.log(getSmallestInt("2405781", 6), 0)
// console.log(getSmallestInt("1283129", 5), 11)
// console.log(getSmallestInt("43333", 1), 3333)
// console.log(getSmallestInt("10101010", 4), 0)
// console.log(getSmallestInt("1000000", 0), 1000000)
// console.log(getSmallestInt("1000000", 1), 0)
// 481925673 // 8 4 9 7 6 5
// [81925673], 4
// [41925673], 8
    // [1925673], 4
        // [925673], 1
        // [125673], 9 if next number is smaller, pop stack
            // [25673], 1
            // [15673], 2
            // [12673], 5
            // [12573], 6
            // [12563], 7
                // [2563], 1
                // [1563], 2
                // [1263], 5
                // [1253], 6
                    // [253], 1
                    // [153], 2
                    // [123], 5
                        // [23], 1
                        // [13], 2
                        // [12], 3
                    // [125], 3
                // [1256], 3
            // [12567], 3
        // [195673], 2
        // [192673], 5
        // [192573], 6
    // [4925673], 1
    // [4125673], 9
    // [4195673], 2
    // [4192673], 5
    // [4192573], 6
// [48925673], 1
// [48125673], 9
// [48195673], 2
// [48192673], 5
// [48192573], 6
// [48192563], 7
// [48192567], 3
// decide numbers in front before nums in back - makes number smaller sooner
