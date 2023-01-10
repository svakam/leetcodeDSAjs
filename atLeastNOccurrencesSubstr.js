function count(str, substr, reqOcc) {

    let recurse = function(str, substr) {
        if (str.length < substr.length) return 0

        if (str.slice(0, substr.length) === substr) {
            return 1 + recurse(str.slice(substr.length), substr)
        }

        return recurse(str.slice(1), substr)
    }

    return recurse(str, substr) >= reqOcc
}

console.log(count("catcowcat", "cat", 1), true)
console.log(count("catcowcat", "cat", 2), true)
console.log(count("catcowcat", "cat", 3), false)
console.log(count("catcowcat", "cow", 2), false)
console.log(count("catcowcat", "cow", 1), true)
console.log(count("at", "cat", 0), true)
console.log(count("at", "cat", 1), false)

