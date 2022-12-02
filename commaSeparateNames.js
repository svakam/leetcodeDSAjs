// [Sam, Grant, Jenny]

function separate(names) {
    if (names.length === 0) return null
    if (names.length === 1) return `${names[0]}`
    let result = ""

    let recurse = function(nameIdx) {
        if (nameIdx === 0) {
            return `${names[nameIdx]}${recurse(++nameIdx)}`
        } else if (nameIdx === names.length - 1) {
            return ` and ${names[nameIdx]}`
        } else {
            return `, ${names[nameIdx]}${recurse(++nameIdx)}`
        }
    }
    return recurse(0)
}

console.log(separate([]), null)
console.log(separate(['Sam']), "Sam")
console.log(separate(['Sam', 'Grant']), "Sam and Grant") // 
console.log(separate(['Sam', 'Grant', 'Jenny']), "Sam, Grant and Jenny")
console.log(separate(['Sam', 'Grant', 'Jenny', 'Siobhan']), "Sam, Grant, Jenny and Siobhan")