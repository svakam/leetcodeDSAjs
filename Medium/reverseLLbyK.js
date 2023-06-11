// reverse a linked list by groups of k

class Node {
    constructor(val=null, next = null) {
        this.val = val,
        this.next = next
    }
}

function reverseLLbyK(head, k) {
    if (k < 2) return head

    let sentinel = new Node()
    sentinel.next = head

    
}

let test1 = new Node(1, new Node(2, new Node(3, new Node(4, new Node(5, new Node(6))))))

console.log(reverseLLbyK(test1, 0))
console.log(reverseLLbyK(test1, 1))
console.log(reverseLLbyK(test1, 2))
console.log(reverseLLbyK(test1, 3))
console.log(reverseLLbyK(test1, 4))
console.log(reverseLLbyK(test1, 5))
console.log(reverseLLbyK(test1, 6))
console.log(reverseLLbyK(test1, 7))

// 1->2->3->4->5->6
// beginning -> 1 -> 2 -> rest
