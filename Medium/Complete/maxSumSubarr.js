// Kadane's algo

function solution(array) {
    if (!array) return null
    
    // local max[i] = Math.max(array[i], local_max[i - 1] + array[i])
    // if (i === 0) local_max = array[0]
    
    let localMax = 0
    let globalMax = -Infinity
    
    for (let i = 0; i < array.length; i++) {
        localMax = Math.max(array[i], array[i] + localMax)
        if (localMax > globalMax) globalMax = localMax
    }
    
    return globalMax
}