// Q. Given two non-empty linked lists which represent two non-negative integers, return their sum as a linked list in a reverse order. 
// Each node represents a single digit in reverse order, and you may assume there is no leading zero(s) in given two numbers.

class Node {
    constructor(val=null, next = null) {
        this.val = val,
        this.next = next
    }
}

// initialize new output list
// initialize carry bool to false
// add pointers to inputs and output
// while input pointers are not null, get sum of each place
// if 

function getSumLL(ll1, ll2) {
    if (!ll1 && !ll2) return null
    if (ll1 && !ll2) return ll1
    if (ll2 && !ll1) return ll2
    let curr1 = ll1, curr2 = ll2, sentinel = new Node(), curr3 = sentinel
    let carry = false

    let placeSum = 0
    while (curr1 && curr2) {
        placeSum = curr1.val + curr2.val
        if (carry) {
            placeSum += 1
            carry = false
        }
        if (placeSum > 9) {
            carry = true
            placeSum %= 10
        }
        curr3.next = new Node(placeSum)
        curr1 = curr1.next
        curr2 = curr2.next
        curr3 = curr3.next
    }
    if (!curr1 && !curr2) {
        if (carry) curr3.next = new Node(1)
        return sentinel.next
    } 
    else if (!curr1) {
        while (curr2) {
            if (carry) {
                placeSum = curr2.val + 1
                carry = false
            }
            curr3.next = new Node(placeSum)
            curr2 = curr2.next
            curr3 = curr3.next
        }
    } else {
        while (curr1) {
            if (carry) {
                placeSum = curr1.val + 1
                carry = false
            }
            placeSum += curr1.val
            curr3.next = new Node(placeSum)
            curr1 = curr1.next
            curr3 = curr3.next
        }
    }

    return sentinel.next
}

// happy case: equal length, both null, one null, result is same length, create new list
// 2->5->1
// 4->2->3
// 6->7->4
let happy1 = new Node(2, new Node(5, new Node(1)))
let happy2 = new Node(4, new Node(2, new Node(3)))
console.log(getSumLL(happy1, happy2))
let happy3 = new Node(4, new Node(2))
// 6->7->1
console.log("longer ll1 ", getSumLL(happy1, happy3))
let happy4 = new Node(2, new Node(5))
// 6->7->3
console.log("longer ll2 ", getSumLL(happy4, happy2))

// hard case: diff length, carry over place sum 
// 2->5->1
// 9->1->1
// 152 + 119 = 271
let carry1 = new Node(9, new Node(1, new Node(1)))
console.log("carry", getSumLL(happy1, carry1))

// 999 + 9 = 1008
let carry2 = new Node(9, new Node(9, new Node(9)))
console.log("carry2", getSumLL(carry2, new Node(9)))

// 394
//   6
// 400
let carry3 = new Node(4, new Node(9, new Node(3)))
console.log("carry3", getSumLL(carry3, new Node(6)))


// stretch: O(1) space
