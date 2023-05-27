function solution(string) {
    let char = 0
    let words = []
    let word = []
    while (char < string.length) {
        let currChar = string[char]
        // parse a word and add to stack
        if ((currChar === ' ' || char === string.length - 1) && word.length > 0) { // push word to output if invalid char or end of string, AND there's something to push
            if (char === string.length - 1 && currChar !== ' ') word.push(currChar)
            words.push(word.join(''))
            word = []
        } else if (currChar !== ' ') { // valid character, push to curr word
            word.push(currChar)
        }
        char++
    }
    words = words.reverse()
    return words.join(' ')
}

console.log(solution("hi i am an apple"), "apple an am i hi")
console.log(solution("hi      this is me"), "me is this hi")
console.log(solution("    hello world    "), "world hello")
console.log(solution("h     i "), "i h")