var minTransactions = function(transactions) {
    // set up balance map
    const balance = new Map()
    for (let [from, to, amount] of transactions) {
        balance.set(from, (balance.get(from) || 0) - amount)
        balance.set(to, (balance.get(to) || 0) + amount)
    }

    const ids = [...balance.keys()]
    // console.log(ids)

    function backtracking(id, debt) {
        while (id < ids.length && debt[id] === 0) {
            id++
        }

        if(id === ids.length) {
            return 0
        }

        let result = Infinity

        for (let i = id + 1; i < ids.length; i++) {
            if (debt[i] * debt[id] < 0) {
                debt[i] += debt[id]
                result = Math.min(result, backtracking(id + 1, debt) + 1)
                debt[i] -= debt[id]
            }
        }

        return result
    }
    return backtracking(0, [...balance.values()])
};

console.log(minTransactions([[0,1,5],[0,2,4],[3,2,1],[2,0,2]])) // 3
console.log(minTransactions([[0,1,10],[2,0,5]])) // 2
console.log(minTransactions([[0,1,10],[1,0,1],[1,2,5],[2,0,5]])) // 1
// 0 : -6
// 1 : 5
// 2 : 3
// 3 : -1

// getMin()

