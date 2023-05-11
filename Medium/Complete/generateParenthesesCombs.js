// https://leetcode.com/problems/generate-parentheses/editorial/

function generate(n) {
    const answer = []
    let q = [""]

    function isValid(p_string) {
        let left_count = 0
        for (let p = 0; p < p_string.length; p++) {
            if (p_string[p] === "(") {
                left_count += 1
            } else {
                left_count -= 1
            }
            if (left_count < 0) return false
        }
        return left_count === 0
    }

    while (q.length > 0) {
        let currString = q.shift()

        if (currString.length === 2 * n) {
            if (isValid(currString)) {
                answer.add(currString)
            }
            continue
        }
        if (currString.length < (2 * n)) {
            q.push(currString += ")")
            q.push(currString += "(")
        }
    }

    return answer
}

console.log(generateBF(1), combo1)
console.log(generateBF(2), combo2)
console.log(generateBF(3), combo3)

// (