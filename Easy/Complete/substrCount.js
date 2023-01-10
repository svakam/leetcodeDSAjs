function count(str, substr) {
    // base case: length of curr ref string < substr
    if (str.length < substr) {
        return 0
    }

    // recurse on smaller bits of larger string
    if (str.slice(0, substr.length) === substr) {
        return 1 + count(str.slice(substr.length), substr)
    }

    return count(str.slice(1), substr)
}

console.log(count("catcowcat", "cat"), 2)
console.log(count("catcowcat", "cow"), 1)
console.log(count("catcowcat", "dog"), 0)
console.log(count("catatcow", "cat"), 1)
console.log(count("ccatt", "cat"), 1)

// count("catcowcat", "cat")
    // 1 + count("cowcat", "cat")
        // count("owcat", "cat")
            // count("wcat", "cat")
                // count("cat", cat")
                    // 1 + count("", "cat")
                        // 0