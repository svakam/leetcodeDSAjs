function generatePasswords(words, maxLen) {
    const output = []
    const stack = []
    const usedWords = {} // map of words with count 1 or 0; 1 if currently in use in stack, 0 if unused
    let currLen = 0

    let addOneWord = function() {
        // if viable word, add to output
        if (currLen > 0 && currLen <= maxLen) {
            output.push(stack.join(' '))
        }

        for (const word of words) {
            const count = usedWords[word] || 0

            if (count === 0) {
                stack.push(word)
                usedWords[word] = 1 // mark word as used
                const charsAdded = currLen === 0 ? word.length : word.length + 1 // includes space between each word
                currLen += charsAdded
                
                addOneWord() // recurse after word is in use, re-iterating over words and using/not using

                currLen -= charsAdded
                usedWords[word] = 0
                stack.pop()
            }
            // do nothing for curr word if word in use
        }
    }

    addOneWord()

    return output
}

console.log(generatePasswords(["ad", "b", "cef", "g"]), 6)

// happy case; max length 1, single letters
// L = [a,b,c], maxLength = 1 -> [a, b, c]
// hard case; max length > 1, more than 1 letter per word
// maxLength = 2 -> [a, b, c, ab, ac, ba, ba, bc, ca, cb]
// maxlength = 3 -> [a,b,c,ab,ac,ba,bc,ca,cb,abc,acb,bac,bca,cab,cba]

// NOTES:
// recursive call is used to re-iterate over all words, but using a map to know which words have or haven't been used
// if unused, add to stack
// if used, don't add to stack, but continue iteration and recursion regardless to check for words that haven't been used
// pop from stack once function call is done
// the stack is used only to keep track of current formation of word; the counts {} map is what tells us (through each iteration of words) which words are used yet or not
// at any given function on top of call stack, the current word and its length are known in current iteration; once dealt with, pop off stack and update vars, and iterate to next word
// this implementation is essentially a dynamic nested for loop, that within each nested loop, knows if curr word is unused, and if so, use it and move onto next
// the next nested for loop knows how to handle it

// essential data structures/algos:
// map: keeps track of unused/used words
// stack: keeps track of current word formation
// for loop: iterate over words on every recursive call to decide which word to add to stack
// currLen: string var used to decide whether to add to output