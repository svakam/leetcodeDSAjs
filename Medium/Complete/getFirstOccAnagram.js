function solution(array, target) {
    if (!target || target.length === 0) return null
    const validAnagrams = []
    
    let anagramLetters = new Map()
    for (let i = 0; i < target.length; i++) {
        if (!anagramLetters.has(target[i])) {
            anagramLetters.set(target[i], 1)
        } else {
            anagramLetters.set(target[i], anagramLetters.get(target[i]) + 1)
        }
    }
    let anagramLength = anagramLetters.size
    let valuesCopy = [...anagramLetters.values()]
    
    for (let i = 0; i < array.length; i++) {
        let word = array[i]
        // check if word is anagram of target
        if (wordIsAnagram(word, anagramLetters, anagramLength, valuesCopy)) {
            // console.log(word)
            validAnagrams.push(word)
        }
    }
    
    return validAnagrams
}

function wordIsAnagram(word, anagramLetters, anagramLength, valuesCopy) {
    console.log(word)
    console.log(anagramLetters)
    let isAnagram = true
    for (let i = 0; i < word.length; i++) {
        if (!anagramLetters.has(word[i])) {
            isAnagram = false
        } else {
            anagramLetters.set(word[i], anagramLetters.get(word[i]) - 1)
            anagramLength--
            console.log(anagramLetters)
        }
    }
    for (let value of anagramLetters.values()) {
        // console.log(value)
        if (value !== 0) {
            isAnagram = false
        }
    }
    
    let i = 0
    // console.log(valuesCopy)
    for (const key of anagramLetters.keys()) {
        anagramLetters.set(key, valuesCopy[i])
        i++
    }
    // console.log(anagramLength)
    
    if (anagramLength !== 0) isAnagram = false
    return isAnagram
}