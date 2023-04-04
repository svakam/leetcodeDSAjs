class FreqStack {
  
    constructor() {
      this.element_to_freq = new Map()
      this.frequency_to_elements = new Map()
      this.maxFreq = 0
    }
  
    push(val) { 
      let newFreq = this.element_to_freq[val] + 1 ? this.element_to_freq[val] : 1
      this.element_to_freq[val] = newFreq
      if (newFreq > this.maxFreq) this.maxFreq = newFreq
      if (this.frequency_to_elements[newFreq]) {
        this.frequency_to_elements[newFreq].push(val)  
      } else {
        this.frequency_to_elements[newFreq] = [val]
      }
      
    }
  
    pop() {
  
      let elemOfMaxFreq = this.frequency_to_elements[this.maxFreq].pop()
      this.element_to_freq[elemOfMaxFreq] -= 1
      if (!this.frequency_to_elements[this.maxFreq].length) {
        this.maxFreq -= 1
      }
      return elemOfMaxFreq
    }
  }
  
  /**
   * e_to_f = {int: int}
   * f_to_e = {int: list[int] }
   * maxFreq = int
   */
  
  // class FreqStack:
  //     def __init__(self):
  //         self.element_to_frequency = collections.Counter() // you can use a regular dict
  //         self.frequency_to_elements = collections.defaultdict(list) // you can use a regular dict and initialize a list every time there is a new frequency
  //         self.maxfreq = 0
  
  //     def push(self, x):
  //         f = self.element_to_frequency[x] + 1
  //         self.element_to_frequency[x] = f
  //         if f > self.maxfreq:
  //             self.maxfreq = f
  //         self.frequency_to_elements[f].append(x)
  
  //     def pop(self):
  //         x = self.frequency_to_elements[self.maxfreq].pop()
  //         self.element_to_frequency[x] -= 1
  //         if not self.frequency_to_elements[self.maxfreq]:
  //             self.maxfreq -= 1
  
  //         return x
  
          
  const freqStack = new FreqStack()
  // freqStack.pop() // None
  freqStack.push(1)
  freqStack.push(2)
  freqStack.push(1)
  console.log(freqStack.pop()) // 1
  freqStack.push(2)
  freqStack.push(3)
  console.log(freqStack.pop()) // 2
  console.log(freqStack.pop()) // 3