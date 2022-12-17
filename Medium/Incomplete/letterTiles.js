function letterTiles(str) {
    let combos = 0
    let indicesUsed = new Set()
    let distinctLetters = new Set()
    let strCombos = new Set()

    let recurse = function(idx, comboLen, currCombo) {
        while (comboLen >= 0) {
            if (!indicesUsed.has(idx)) {
                // add curr combo, indices, str combos
                currCombo.push(str[idx])
                indicesUsed.push(idx)
                strCombos.add(currCombo)
                
                // recurse and remove current
                recurse(idx + 1, comboLen - 1, currCombo)
                currCombo = currCombo.substring(0, idx)
                indicesUsed.delete(idx)
            }
        }
    }

    for (let comboLen = 1; comboLen <= str.length; comboLen++) {
        recurse(0, comboLen, "")
    }
    return combos
}

// "AAB"
// { 0, 1, 
// { "A", }
// "AAB"
// "A", "B"


// console.log(letterTiles("A"), 1)
// console.log(letterTiles("AB"), 4)
// console.log(letterTiles("AAA"), 3)
console.log(letterTiles("AAB"), 8)
// console.log(letterTiles("AAABBC"), 188)

// from str length 1 up to str length, get all possible strings
// either use a letter in a current combo or don't

// "AB"
// from str length 1 up to str length, get all possible strings
// "A", "B", "AB", "BA"
// {
//  "A", 1
//  "B", 1
// }
// str length 1: "A", "B" - decrement count of used letter
// str[0] -> add to curr str -> "A"
// str[1] -> 