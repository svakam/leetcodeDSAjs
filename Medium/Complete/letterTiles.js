function letterTiles(tiles) {
    if (tiles.length < 1) return tiles.length

    let map = new Map()
    let count = 0
    let str = ''

    // establish map of tile counts
    for (let tile of tiles) {
        map.set(tile, map.get(tile) + 1 || 1)
    }

    function helper() {
        count++

        for (let [tile, available] of map.entries()) {
            if (available > 0) {
                str += tile
                map.set(tile, map.get(tile) - 1)

                helper()

                str.slice(0, -1)
                map.set(tile, map.get(tile) + 1)
            }
        }
    }

    helper()
    return count - 1
}


console.log(letterTiles("A"), 1)
console.log(letterTiles("AB"), 4) 
// -> "A", "B", "AB", "BA"
console.log(letterTiles("AAA"), 3) 
// -> "A", "AA", "AAA"
 console.log(letterTiles("AAB"), 8)
// -> "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA"
console.log(letterTiles("AAABBC"), 188)