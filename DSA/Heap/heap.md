# Heap

**Full binary tree**: every node has two children except leaves
**Complete binary tree**: full binary tree, except all levels filled and leaves optionally filled from left

A tree can be complete binary and NOT full

Binary tree follows __heap structure__ if it's a complete binary tree and follows max/min heap structure
- **Max heap** = all nodes are larger than their children
- **Min heap** = all nodes are smaller than their children

## Heapsort

### Mapping elements in array to complete binary tree
If index of element is ```i```, then indices of children/parent of ```i```th element are:
left: ```2i + 1```
right: ```2i + 2```
parent: ```(i - 1) / 2``` (lower bound)

### Heapifying a tree

Ensuring that every parent is **larger** than its children for a max heap or every parent is **smaller** than its children (min heap)

Before heapifying at a node, its subtrees must already be heapified

1. Map out array to complete binary tree
2. Ensure each subtree is heapified
   - Looking at i (root), 2i + 1 and 2i + 2 (left and right children):
     - Swap the largest of the 3 up to the root for max heap, or smallest of the 3 up to root for min heap
     - Call heapify on the largest or smallest of the 3
       - This ensures the largest (or smallest, or opposite of the desired top type) is moved farthest down relative to its parents
3. Heapsort the heapified tree
   - Iterating from ith leaf from end to beginning, swap ith node with root
   - Heapify at the root 

## Heap class

