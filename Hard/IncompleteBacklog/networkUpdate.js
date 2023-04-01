/*
'''
A subset of database servers in a grid network received an update that needs to be replicated to the remaining nodes. Nodes can only broadcast updates to their immediate neighbors, north, west, south, and east, each second.

Given an initial state of the nodes with the updated information, determine how many seconds it will take to propagate the update to the entire network.
 

EXAMPLE(S)
If the state of the network at the 0th second is:
[
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0]
]
Then it takes 2 seconds to propagate the information. After the 1st second:
[
  [0, 1, 0],
  [1, 1, 1],
  [0, 1, 0]
]
After the 2nd second:
[
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1]
]
 

FUNCTION SIGNATURE
function broadcastTime(network) {
def broadcastTime(network: list[list[int]]) -> int:
'''
*/