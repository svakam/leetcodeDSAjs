function count(str, substr) {
    // base case: length of curr ref string < substr
    if (str.length < substr) {
        return 0
    }

    // recurse on smaller bits of larger string
    if (str.substring(0, substr.length) === substr) {
        return 1 + count(str.substring(substr.length), substr)
    }

    return count(str.substring(0), substr)
}

console.log(count("catcowcat", "cat"), 2)
console.log(count("catcowcat", "cow"), 1)
console.log(count("catcowcat", "dog"), 0)
console.log(count("catatcow", "cat"), 1)
console.log(count("ccatt", "cat", 1))