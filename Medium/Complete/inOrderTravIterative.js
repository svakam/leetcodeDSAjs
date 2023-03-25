function solution(root) {
    const s = [], output = []
    
    let curr = root
    while (curr || s.length) {
        if (curr) {
            s.push(curr)
            curr = curr.left // as long as there is a left, add to stack and go left
        } else {
            curr = s.pop()
            output.push(curr.value)
            curr = curr.right // if no more lefts, then found leftmost node - pop leftmost off stack, add to output, and check for right subtree
        }
    }
    
    return output
}

// curr = 2
// s = [1]
// output = [2]