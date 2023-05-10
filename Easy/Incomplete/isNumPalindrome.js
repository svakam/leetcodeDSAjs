// determine if number is palindrome without str conversion

function isNumberPalindrome(num) {
    if (num === 0 || num < 10) return true

    let currDigit = num % 10
    let currPeak = num % 10
    let prevPeak = null
    let currPrevPeak = [currPeak,prevPeak]
    const s = [currPrevPeak]
    num = Math.floor(num / 10)
    while (num > 0 && (currPeak !== currDigit) || prevPeak !== currDigit) {
        currDigit = num % 10
        currPeak = num % 10
        num = Math.floor(num / 10)
        currPrevPeak = [currPeak,prevPeak]
        s.push(currPrevPeak)
        prevPeak = currPeak
    }

    if (num === 0 && s.length > 0) return false

    while (num > 0 && currPeak === currDigit) {
        s.pop()
        currPeak = num % 10
        num = Math.floor(num / 10)
    }

    return s.length === 0 && num === 0
}

console.log(isNumberPalindrome(0), true)
console.log(isNumberPalindrome(1), true)
console.log(isNumberPalindrome(10), false)
console.log(isNumberPalindrome(12), false)
console.log(isNumberPalindrome(575), true)
console.log(isNumberPalindrome(456654), true)
console.log(isNumberPalindrome(123454321), true)
console.log(isNumberPalindrome(246987642), false)
console.log(isNumberPalindrome(123678876), false)
console.log(isNumberPalindrome(47958853974), false)

// initialize current tuple = last number of input, update input
// initialize stack with first tuple
// initialize previous peak outside while loop
// while (input is > 0 and current tuple's peak or prevpeak is not equal to current digit), 
    // modulo input and set currPeak to it
    // reset input
    // initialize tuple with [currPeak, prevPeak]
    // push tuple to stack
    // update previous peak to current peak
// if input is 0 and stack is filled, return false
// else potential palin is found: while input > 0 and peak or prevpeak matches current number, 
    // pop from stack
    // currPeak = modulo 
    // reset input

// return bool of stack empty or not and input === 0