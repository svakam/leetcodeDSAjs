def insertionSort(arr):
    helper(arr, 1)
    return arr

def helper(arr, index):
    if index < len(arr):
        moveElemBack(arr, index)

        return helper(arr, index +1)    

def forEach(start, end, fn):
    # ... 

def moveElemBack(arr,index):
    key = arr[index]

    # swap(index - 1, arr)
    def inner(j):
        if j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            inner(j - 1)
        else:   
            arr[j + 1] = key
            
    inner(index - 1)
        


def swap(index, arr):
    j = index - 1
    key = arr[index]
    if j >= 0 and key < arr[j]:
        arr[j + 1] = arr[j]
        return swap(j - 1)    

def insertionSort_iterative(arr):

    for i in range(1, len(arr)):
        key = arr[i]

        j = i - 1

        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    
    return arr    
        
print(insertionSort([2, 4, 6, 8]))
print(insertionSort([5, 4, 3, 2, 1]))
print(insertionSort([3, 8, 5, 4, 1, 9, -2]))
print(insertionSort([2]))
print(insertionSort([]))