/*
'''
❓ PROMPT
Given a vertex and edge list of nodes and a start node for an undirected graph return the sum of all the nodes values accessible from the start node. For practice's sake, do this in DFS order.

Example(s)
vertexList: [1, 2, 3, 4, 5]
edgeList: [(1, 2), (2, 3), (1, 3)]

1--2
| /
3      4    5

sumNodes(vertexList, edgeList, 1) -> 6

Node 1 has access to 2 and 3. The sum of all these nodes is 6. Nodes 4 and 5 aren't accessible.
 

🔎 EXPLORE
List your assumptions & discoveries:
- there can be islands
- edges are undirected
- start node may or may not be able to access all vertices
- vertexList.length > 0
- unique ids

Insightful & revealing test cases:

🧠 BRAINSTORM
What approaches could work?
Algorithm 1: 
pre-process v/e list to adj list
initialize visited list to ensure nodes aren't seen more than ocne
dfs through curr node's neighbors
if unvisited, add to global sum
else return

Time: O(V + E)
Space: O(V + E)
 

📆 PLAN
Outline of algorithm #: 
 

🛠️ IMPLEMENT
function sumNodes(vertexList, edgeList, startNode) {
 

🧪 VERIFY
Run tests. Methodically debug & analyze issues.

'''
*/

function sumNodes(vertexList, edgeList, startNode) {
    
    // initialize adjacency list with all node ids
    const adjList = {}
    for (const node of vertexList) {
        adjList[node] = []
    }
    const visited = new Set()

    // preprocess edge list into adj list
    for (const edge of edgeList) {
        let start = edge[0], end = edge[1]
        adjList[start].push(end)
        adjList[end].push(start)
    }
    // console.log(adjList)

    // dfs func to traverse through any node's neighbors
    function dfs(node, adjList, visited) {
        console.log(node)
        // if node already seen, 
        if (visited.has(node)) return 0

        let neighbors = adjList[node]
        visited.add(node)

        let currSum = node
        if (!neighbors.length) return currSum
        else {
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    currSum += dfs(neighbor, adjList, visited)
                }
            }
            return currSum
        }
    }

    return dfs(startNode, adjList, visited)
}
// curr = 1
// neighbors = [2,3]
// visited = 1, 2, 3
// currSum = 1 + dfs(2, ...) = 5

// curr = 2
// neighbrs = [1,3]
// currSum = 2 + dfs(3, ...) = 3

// curr = 3
// neighbors = [1,2]
// currSum = 3 


const vertexList = [1, 2, 3, 4, 5]
const edgeList = [[1, 2], [2, 3], [1, 3]]

console.log(sumNodes(vertexList, edgeList, 1), 6)

