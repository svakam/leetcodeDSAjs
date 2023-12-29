/*

You are tasked with building a screen that shows the top games being played on a classic board game app. To prevent the games from jumping around on the screen, you must write a function with the following constraints:

Given two arrays, 'oldIDs' and 'newIDs', return an array that meets the following criteria:
- result contains all values from newIDs
- all new ids that currently exist in oldIDs are in the same index as they were in oldIDs

EXAMPLE(S)
oldIDs: [1, 2, 3]
                i
newIDs: [2, 3, 4]
result: [4, 2, 3]

new = Set{4}

new.delete(seenvalues)

results = [undef, 2, 3]


oldIDs: [1, 2, 3, 4]
newIDs: [4, 3, 2, 1]
result: [1, 2, 3, 4]

{
  1:0,
  2:1,
  3:2
}
{2,3,4}

oldIDs: [1, 2, 3]
newIDs: [3, 4, 5]
result: [4, 5, 3] or [5, 4, 3]

2: 1
3: 2
4: -1

[-1, 2, 3]
[4, 2, 3]
 

FUNCTION SIGNATURE
function preserveIndices(oldIDs: [string], newIDs: [string]) => result: [string]

*/