// k sorted arrays, return 1 sorted array

class Node {
    constructor(val = null, next = null) {
        this.val = val,
        this.next = next
    }
} 

function mergeTwoLists(list1, list2) {
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

function mergeKLists(lists) {
    if (lists.length === 0) return null
    if (lists.length === 1) return lists[0]

    // take a merged list and merge with next list, until no lists left
    let finalMerged = null

    for (const list of lists) {
        finalMerged = mergeTwoLists(finalMerged, list)        
    }

    return finalMerged
}

// priority queue
var mergeKListsPQ = function(lists) {
    if (lists.length === 0) {
        return null;
    }
    // two two
    // priority queue
    while (lists.length > 1) {
        let a = lists.shift(); // the head will contains the "less" length list
        let b = lists.shift(); // acturally, we can use the linkedlist to replace it, the while loop will be the while( list.header.next !== null || lists.length > 0)
        const h = mergeTwoLists(a, b);
        lists.push(h);
    }
    return lists[0];
};

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

function createListSet(...lists) {
    const output = []
    for (const list of lists) {
        output.push(list)
    }
    return output
}

let list1 = createList([1,3,4])
let list2 = createList([2,5,6])
let list3 = createList([1,3,4,7])
let list4 = createList([2,5,6])
let listSet1 = createListSet(list1)
let listSet12 = createListSet(list1, list2)
let listSet123 = createListSet(list1, list2, list3)
let listSet1234 = createListSet(list1, list2, list3, list4)
// console.log(listSet1)
// console.log(listSet12)
// console.log(listSet123)
// console.log(listSet1234)
let merge1 = mergeKLists(listSet1)
let merge12 = mergeKLists(listSet12)
let merge123 = mergeKLists(listSet123)
let merge1234 = mergeKLists(listSet1234)
console.log(readList(merge1), [1,3,4])
console.log(readList(merge12), [1,2,3,4,5,6])
console.log(readList(merge123), [1,1,2,3,3,4,4,5,6,7])
console.log(readList(merge1234), [1,1,2,2,3,3,4,4,5,5,6,6,7])