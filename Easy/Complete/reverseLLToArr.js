class Node {
    constructor(val, next=null) {
        this.val = val,
        this.next = next
    }
}

function reverseLLToArr(node) {
    let result = []
    while (node) {
        result.push(node.val)
        node = node.next
    }

    let i = 0
    let j = result.length - 1

    while (i < j) { // swapping allows using same array to swap beginning and end elements until middle 
        // instead of a stack and a brand new output arr
        let temp = result[i]
        result[i] = result[j]
        result[j] = temp

        i++
        j--
    }

    return result
}

console.log(reverseLLToArr(new Node(1, new Node(2, new Node(3)))), [3,2,1])