// for loop approach
function solution(string, target) {
    if (!string) return -1
    
    for (let i = 0; i < string.length; i++) {
        let targetIdx = 0
        if (string[i] === target[targetIdx]) {
            let j = i + 1
            targetIdx++
            while (targetIdx < target.length) {
                if (string[j] !== target[targetIdx]) {
                    break
                } else {
                    targetIdx++
                    j++
                }    
            }
            if (targetIdx === target.length) return i          
        }
    }
    return -1
}
