// given two lists, lists from most to least preferred items, find best preferred item between both lists

function findCompatibleRestaurantsBetween(ned, mary) {
    let res = []
    const nedPrefs = new Map()
    let minIndexSum = Number.MAX_VALUE
  
    for (let i = 0; i < ned.length; i++)
    nedPrefs.set(ned[i], i)
  
    for (let j = 0; j < mary.length; j++) {
      let maryPref = mary[j]
  
      if (nedPrefs.has(maryPref)) {
        let sum = j + nedPrefs.get(maryPref)
  
        if (sum < minIndexSum) {
          res = [maryPref]
          minIndexSum = sum
        } else if (sum == minIndexSum) {
          res.push(maryPref)
        }
      }
    }
  
    return res
  }