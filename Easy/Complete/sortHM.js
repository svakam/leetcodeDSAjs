// given string of chars, return array of chars by decreasing freq

function sortHM(str) {
    // create hashmap
    const map = new Map(), output = []
    for (let char = 0; char < str.length; char++) {
        map.set(str[char], (map.get(str[char]) || 0) + 1)
    }

    // sort hashmap
    // https://bobbyhadz.com/blog/javascript-sort-keys-in-map
    // const sortedAsc = new Map([...map].sort((a, b) => a[1] - b[1]))
    const sortedDesc = new Map([...map].sort((a, b) => b[1] - a[1])) 
    // creates array of entries, sorts by entry[1] (value), b - a sorts descending
    
    // return
    for (const k of sortedDesc.keys()) {
        output.push(k)
    }
    return output
}

console.log(sortHM("abcciasjflksdskfj"))

// abcciasjflksdskfj
// a = 2
// b = 1
// c = 2
// i = 1
// s = 3
// j = 2
// f = 2
// l = 1
// k = 2
// d = 1