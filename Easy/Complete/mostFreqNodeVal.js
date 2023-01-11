function mostFreqNode(tree) {
    if (!tree) return null

    let map = new Map()

    let recurse = function(node) {
        if (!node) return null

        if (!map.has(node.val)) {
            map.set(node.val, 1)
        } else {
            map.set(node.val, map.get(node.val) + 1)
        }
        recurse(node.left)
        recurse(node.right)
    }

    recurse(tree)
    let mostFreq = -Infinity
    let mostFreqVal
    console.log(map.entries())
    for (const entry of map.entries()) {
        mostFreq = Math.max(mostFreq, entry[1]) // if equal, returns the 2nd arg?
        mostFreqVal = entry[0]
    }

    return mostFreqVal
}

class Node {
    constructor(val, left=null, right=null) {
        this.val = val,
        this.left = left,
        this.right = right
    }
}

let tree1 = new Node(1)
let tree2 = new Node(1, new Node(2))
let tree3 = new Node(1, null, new Node(2))
let tree4 = new Node(1, new Node(2), new Node(2))
let tree5 = new Node(1, null, new Node(2, new Node(3, null, new Node(4))))
let tree6 = new Node(1, null, new Node(2, new Node(3, null, new Node(4)), new Node(3)))

console.log(mostFreqNode(tree1), 1)
console.log(mostFreqNode(tree2), 2)
console.log(mostFreqNode(tree3), 2)
console.log(mostFreqNode(tree4), 2)
console.log(mostFreqNode(tree5), 4)
console.log(mostFreqNode(tree6), 4)