function solution(root) {
    if (!root) return null
    
    const s = [], output = []
    let curr = root
    
    while (curr || s.length > 0) {
        if (curr) {
            s.push(curr)
            curr = curr.left
        }
        else {
            curr = s.pop()
            output.push(curr.value)
            curr = curr.right
        }
    }
    
    return output
}