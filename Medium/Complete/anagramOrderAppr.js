// given array of strings and target word, return all anagrams in order of appearance

function solution(array, target) {
    const output = []
    let addWord = true
    const map = new Map()
    for (let idx = 0; idx < target.length; idx++) {
        map.set(target[idx], 1)
    }
    for (let idx = 0; idx < array.length; idx++) {
        let word = array[idx]
        addWord = true
        if (word.length === target.length) {
            for (let wordIdx = 0; wordIdx < word.length; wordIdx++) {
                let char = word[wordIdx]
                if (map.has(char)) {
                    map.set(char, 0)
                }
            }
        }
        for (const used of map.values()) {
            if (used === 1) {
                addWord = false
            }
        }
        if (addWord) output.push(word)
        resetMap()
    }
    
    function resetMap() {
        for (const k of map.keys()) {
            map.set(k, 1)
        }
    }
    
    return output
}