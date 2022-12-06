function pairStars(word, index=0) {
    if (index === word.length) {
        return "";
    }
    const substring = pairStars(word, index + 1);
  
    if (word[index] === substring[0]) {
        return word[index] + "*" + substring;
    }
    return word[index] + substring;
}

console.log(pairStars(""), "")
console.log(pairStars("a"), "a")
console.log(pairStars("aa"), "a*a")
console.log(pairStars("aabbababb"), "a*ab*babab*b")

// recursive approach: start from the end of word: if word at curr index matches beginning of substring (growing larger and larger), return word[index] + * + substring
// base case: if index reaches word length, return empty substring