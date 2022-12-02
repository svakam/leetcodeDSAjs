function printChildrenOfParent(set) {
    let map = new Map()
    for (let childParents of set) {
        for (let parent = 1; parent <= 2; parent++) {
            if (!map.has(childParents[parent])) {
                map.set(childParents[parent], `${childParents[0]}`)
            } else {
                let currstr = map.get(childParents[parent])
                let newstr = currstr + `, ${childParents[0]}`
                map.set(childParents[parent], newstr)
            }
        }
    }

    // console.log(map)
    let output = []
    for (const entry of map) {
        let curr = `${entry[0]} is the parent of `
        curr += entry[1]
        output.push(curr)
    }

    return output
}

// childParents = [james, ben, lisa]
// {
     // ben: "james, jen"
     // lisa: "james"
     // taylor: "george"
     // fred: "george"
     // gloria: "jen"
// }
// output = []
// curr = "lisa is the parent of james"

let set1 = [
    ["James", "Ben", "Lisa"],
    ["George", "Taylor", "Fred"],
    ["Jen", "Ben", "Gloria"]
]
let ans1 = [
    "Ben is the parent of James, Jen",
    "Lisa is the parent of James",
    "Taylor is the parent of George",
    "Fred is the parent of George",
    "Gloria is the parent of Jen"
]
console.log(printChildrenOfParent(set1))