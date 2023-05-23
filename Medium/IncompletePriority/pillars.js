function maxAreaBF(heights) {
    let maxArea = 0
    for (let left = 0; left < heights.length; left++) {
        for (let right = left + 1; right < heights.length; right++) {
            let width = right - left
            maxArea = Math.max(maxArea, Math.min(heights[left], heights[right]) * width)
        }
    }

    return maxArea
}