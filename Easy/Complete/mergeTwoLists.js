class Node {
    constructor(val = null, next = null) {
        this.val = val,
        this.next = next
    }
} 

function mergeLists(list1, list2) {
    if (!list1 && list2) return list2
    if (list1 && !list2) return list1
    if (!list1 && !list2) return null

    let output = new Node(), curr = output, curr1 = list1, curr2 = list2
    
    while (curr1 && curr2) {
        if (curr1.val <= curr2.val) {
            // console.log(curr1.val)
            curr.next = new Node(curr1.val)
            curr1 = curr1.next
        } else if (curr2.val <= curr1.val) {
            // console.log(curr2.val)
            curr.next = new Node(curr2.val)
            curr2 = curr2.next
        }
        curr = curr.next
    }

    if (curr1 && !curr2) {
        while (curr1) {
            curr.next = new Node(curr1.val)
            curr1 = curr1.next
            curr = curr.next
        }
    } else if (curr2 && !curr1) {
        while (curr2) {
            curr.next = new Node(curr2.val)
            curr2 = curr2.next
            curr = curr.next
        }
    }

    return output.next
}

function createList(arr) {
    let sHead = new Node(), curr = sHead
    for (let i = 0; i < arr.length; i++) {
        curr.next = new Node(arr[i])
        curr = curr.next
    }
    return sHead.next
}

function readList(list) {
    const output = []
    let curr = list
    while (curr) {
        output.push(curr.val)
        curr = curr.next
    }
    return output
}

let list1 = createList([1,3,4])
let list2 = createList([2,5,6])
let merge12 = mergeLists(list1, list2)
console.log(readList(merge12), [1,2,3,4,5,6])
let list3 = createList([1,3,4,7])
let list4 = createList([2,5,6])
let merge34 = mergeLists(list3, list4)
console.log(readList(merge34), [1,2,3,4,5,6,7])