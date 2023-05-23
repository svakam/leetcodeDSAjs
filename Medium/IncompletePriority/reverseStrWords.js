function solution(string) {
    let char = 0
    let words = []
    while (char < string.length) {
        let word = ""
        if (string[char] !== '' || string[char] !== ' ') {
            word += string[char]
        } else {
            if (word.length > 0) {
                words.push(word)
            }
        }
        char++
    }
    console.log(words)
    words = words.reverse()
    return words.join(' ')
}