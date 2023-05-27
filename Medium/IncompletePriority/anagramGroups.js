// group of anagrams = list of words where each group shares same anagram
// get number of distinct anagrams from a list of words

function getDistinctAnagrams(wordsArr) {
    if (wordsArr.length === 1) return 1
    const hashMapList = []

    // initialize set with first word
    const map = new Map()
    for (let char = 0; char < wordsArr[0].length; char++) {
        map.set(wordsArr[0][char], (map.get(wordsArr[0][char]) || 0) + 1)
    }
    hashMapList.push(map)

    // word
    

    return setList.length
}

let words = ["tea", "eat", "apple", "ate", "vaja", "cut", "java", "utc"]
console.log(getDistinctAnagrams(words), 4)

// setList = { t e a }, { a p p l e }, { v a j a }, { c u t }
// word = utc
// try each word with a set to check for match; if not complete match, add as new set