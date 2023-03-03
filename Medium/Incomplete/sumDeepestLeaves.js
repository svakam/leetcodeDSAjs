class Node {
    constructor(val=val, left=null, right=null) {
        this.val = val,
        this.left = left,
        this.right = right
    }
}

function sum(tree) {
    if (!tree) return null

    let q = [tree], deepest_row_sum = 0

    while (q > 0) {
        let n = q.length, curr_row_sum = 0
        while (n > 0) {
            let temp = q.shift()
            console.log(q)
            console.log(temp)
            curr_row_sum += temp.val

            if (temp.left) q.push(temp.left)
            if (temp.right) q.push(temp.right)
            n--
        }
        deepest_row_sum = curr_row_sum
    }
    
    console.log(deepest_row_sum)
    return deepest_row_sum
}

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
