class Node {
    constructor(val=val, left=null, right=null) {
        this.val = val,
        this.left = left,
        this.right = right
    }
}

function sum(tree) {
    if (!tree) return null

    let q = [tree], lastLevel, deepestSum = 0

    while (q.length) {
        let levelProcessed = q.length

        lastLevel = [...q]
        while (levelProcessed) {
            let node = q.shift()
            if (node.left) q.push(node.left)
            if (node.right) q.push(node.right)
            levelProcessed--
        }
    }
    for (const node of lastLevel) {
        deepestSum += node.val
    }

    return deepestSum
}

//        1
//     2     4    
//   3

let tree1 = null
let tree2 = new Node(1)
let tree3 = new Node(1, new Node(2))
let tree4 = new Node(1, new Node(2), new Node(3))
let tree5 = new Node(1, new Node(2, new Node(3)), new Node(4))
console.log(sum(tree1), null)
console.log(sum(tree2), 1)
console.log(sum(tree3), 2)
console.log(sum(tree4), 5)
console.log(sum(tree5), 3)
