// given array of 0, 1, 2s, sort in-place ascending order

function solution(array) {
    if (!array) return null
    
    function swap(i, j) {
        [array[i], array[j]] = [array[j], array[i]]
    }
    
    let left = 0, middle = 0, right = array.length - 1
    
    while (middle <= right) {
        let n = array[middle]
        
        if (n === 0) { // 0 goes left
            swap(left, middle)
            left++
            middle++
        } else if (n === 2) { // 2 goes right
            swap(middle, right)
            right--
        } else {
            middle++ // 1 stays in mid
        }
    }
    
    return array
}