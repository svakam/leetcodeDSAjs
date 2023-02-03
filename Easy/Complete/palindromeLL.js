class Node {
    constructor(val=null, next=null) {
        this.val = val,
        this.next = next
    }
}

function palindromeLL(arr) {
    let s = []

    let head = new Node()
    let curr = head
    for (let i = 0; i < arr.length; i++) {
        curr.next = new Node(arr[i])
        s.push(arr[i])
        curr = curr.next
    }

    s.pop()
    while (s.length > 0) {
        curr.next = new Node(s.pop())
        curr = curr.next
    }

    return head
}

function betterImpl(arr) {
    if (!arr.length) return null

    let sentinel = new Node()
    let curr = sentinel

    for (let i = 0; i < arr.length; i++) {
        curr.next = new Node(arr[i])
        curr = curr.next
    }

    for (let i = arr.length - 2; i >= 0; i--) {
        curr.next = new Node(arr[i])
        curr = curr.next
    }

    return sentinel.next
}

console.log(palindromeLL([99]))
console.log(palindromeLL([1,4,5]))

// i = 2
//                             curr
// head -> 1 -> 4 -> 5 -> 4 -> 1
// s = []