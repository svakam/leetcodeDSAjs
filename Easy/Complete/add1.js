function solution(digits) {
    let i = digits.length - 1, carry = false
    
    while (i > 0) {
        if (digits[i] < 9) {
            digits[i] += 1
            return digits
        } else {
            carry = true
            digits[i] = 0
            i--
        }
    }
    if (carry && digits[0] === 9) {
        digits[0] = 0
        digits.unshift(1)
    } else {
        digits[0] += 1
    }
    return digits
}