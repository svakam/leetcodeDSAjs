  
  import heapq
  
  def k_sort(input, k):
      result = []
      heap = []
  
      // build heap with k values
      for i in range(k):
          heapq.heappush(heap, input[i])
  
      // 
      for i in range(k, len(input)):
          heapq.heappush(heap, input[i])
          result.append(heapq.heappop(heap))
  
      while heap:
          result.append(heapq.heappop(heap))
  
      return result
   