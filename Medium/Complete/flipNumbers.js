// given numbers from 1 to an upperbound, convert all potentially confusing numbers when rotated 180 degrees. 
// e.g. 81 -> 18, 69 -> 96, 181 -> 181

function underlineNumbers(upperBound) {
    const output = []
    const map = new Map()
    map.set(1, 1)
    map.set(6, 9)
    map.set(8, 8)
    map.set(9, 6)
    map.set(0, 0)
    for (let i = 0; i < upperBound; i++) {
      let curr = i, converted = "", isValidConv = true
      
      // check for leading 0
      if (curr % 10 === 0) continue
      
      while (curr > 0) {
        let currDigit = curr % 10
        if (map.has(currDigit)) {
          converted += map.get(currDigit)
          curr = Math.floor(curr / 10)        
        } else {
          isValidConv = false
          break
        }
      }
      let convertedNum = parseInt(converted)
      if (convertedNum <= upperBound && isValidConv && convertedNum !== i) output.push(i)
    }
  
    return output
}

console.log(underlineNumbers(650)) // expect 20 numbers