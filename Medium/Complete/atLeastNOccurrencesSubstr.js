function count(str, substr, reqOcc) {

    let helper = function(str, substr) {
        if (str.length < substr.length) return 0

        if (str.slice(0, substr.length) === substr) {
            return 1 + recurse(str.slice(substr.length), substr)
        }

        return recurse(str.slice(1), substr)
    }

    return helper(str, substr) >= reqOcc
}

console.log(count("catcowcat", "cat", 1), true) // catcowcat 1 cowcat owcat wcat cat 2 
console.log(count("catcowcat", "cat", 2), true)
console.log(count("catcowcat", "cat", 3), false)
console.log(count("catcowcat", "cow", 2), false)
console.log(count("catcowcat", "cow", 1), true)
console.log(count("at", "cat", 0), true)
console.log(count("at", "cat", 1), false)

// substring problems: 
// recursion
// pass in string and substring
// each call slices by substr length to check if it's target substr, if so slice by substr length, else slice by 1 to check incrementally