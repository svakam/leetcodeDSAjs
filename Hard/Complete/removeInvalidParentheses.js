function removeInvalidParentheses(S) {
    let output = new Set()
    let global_rem = Infinity

    let reset = function() {
        output = new Set()
        global_rem = Infinity
    }

    let recurse = function(S, index, leftp_count, rightp_count, expr, rem_count) {
        if (index === S.length) { // reached str end
            if (leftp_count === rightp_count) { // curr expr is valid
                if (rem_count <= global_rem) { // if curr count of removed paren is less than or equal to global removed
                    let possibleAns = expr // this is a possible ans
                    if (rem_count < global_rem) { // if curr count beats overall min, clear valid expr and reset min to curr min
                        output = new Set()
                        global_rem = rem_count
                    }
                    output.add(possibleAns) // add to valid expr if removed paren amount is equal to or less than global
                }
            }
        } else { // if still in middle of str
            let currChar = S[index] // get curr char
            let length = expr.length // curr length of expr

            if (currChar !== '(' && currChar !== ')') { // if not paren, add to expr
                expr += currChar
                recurse(S, index++, leftp_count, rightp_count, expr, rem_count) // move onto next char
                expr = expr.substring(0, length) // remove last char
            } else {
                recurse(S, index++, leftp_count, rightp_count, expr, rem_count + 1) // recursion where delete curr char and move fwd
                expr += currChar 

                if (currChar === '(') {
                    recurse(S, index + 1, leftp_count++, rightp_count, expr, rem_count) // if opening paren, consider it and recurse
                } else if (rightp_count < leftp_count) {
                    recurse(S, index++, leftp_count, rightp_count++, expr, rem_count) // for closing, recurse only if right < left
                }

                expr = expr.substring(0, length) // undoing append for other recursions
            }
        }
    }

    reset()
    recurse(S, 0, 0, 0, "", 0)
    return output
}


// for every bracket, we have two choices:
// 1. included in final expression
// 2. ignored from final expression
// multiple options with no strategy or metric of deciding greedily which option to take
// try all options and see which ones lead to final answer -- recursion

// e.g. 
// (((()())
// ^^
//   ^^
// ^  ^        -> (()()) (solution 1)
// ^    ^
//  ^   ^
//   ^  ^      -> ((())) (solution 2)
