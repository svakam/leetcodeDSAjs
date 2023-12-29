class Heap {
    defaultComparator = (a, b) => a > b;
    
    constructor(capacity, comparator = undefined) {
      this.data = Array(capacity).fill(undefined);
      this.length = 0;
      this.comparator = comparator ? comparator : this.defaultComparator; 
    }
    
    add(value) {
      this.data[this.length] = value;
      let cur_position = this.length;
      while (cur_position > 0) {
        const parent_index = this.parent(cur_position);
        if (this.comparator(this.data[parent_index], value)) {
          this.data[cur_position] = this.data[parent_index];
          this.data[parent_index] = value;
          cur_position = parent_index;
        } else {
          break;
        }
      }
      this.length += 1
    }
  
    remove() {
      const res = this.data[0];
      let cur_position = 0;
      this.data[cur_position] = this.data[this.length - 1];
      const last_val = this.data[cur_position];
      this.length -= 1;
      while (cur_position <= this.length) {
        const left_child_index = this.left_index(cur_position);
        const right_child_index = this.right_index(cur_position);
        if (this.comparator(last_val, this.data[left_child_index])) {
          this.data[cur_position] = this.data[left_child_index];
          this.data[left_child_index] = last_val;
          cur_position = left_child_index;
          continue;
        }
        else if (this.comparator(last_val, this.data[right_child_index])) {
          this.data[cur_position] = this.data[right_child_index];
          this.data[right_child_index] = last_val;
          cur_position = right_child_index;
          continue;
        } else {
          break;
        }
      }
    }
  
    peek() {
      return this.data[0];
    }
    
    parent(index) {
      return Math.floor((index-1)/2);
    }
    
    left_index(index) {
      return index*2 + 1;
    }
    
    right_index(index) {
      return index*2 + 2;
    }
  }
  
  function build(data, comp = undefined) {
    const h =  new Heap(data.length, comp);
    for (let i = 0; i < data.length; i++) {
      h.add(data[i]);
    }
    return h;
  }
  
  function testMin(size) {
    let data = [];
    for (let i = 0; i < size; i++) {
      data.push(Math.floor((Math.random() * size * 3)));
    }
  
    const h = build(data);
    console.log(`h`, h);
  
    let prev = h.remove();
    while (h.length > 0) {
      if (prev > h.peek()) {
        console.log(data);
        console.log(h.data);
        return ["FAIL min:", next, sorted[i], i].join(' ');
      }
      h.remove();
    }
    return "PASS min";
  }
  
  function testMax(size) {
    let data = [];
    for (let i = 0; i < size; i++) {
      data.push(Math.floor((Math.random() * size * 3)));
    }
  
    const h = build(data, (a, b) => a < b);
  
    let prev = h.remove();
    while (h.length > 0) {
      if (prev < h.peek()) {
        console.log(data);
        console.log(h.data);
        return ["FAIL max:", next, sorted[i], i].join(' ');
      }
      h.remove();
    }
    return "PASS max";
  }
  
  console.log(testMin(1000000));
  console.log(testMax(100000));
  
  // test expanding the capacity
  const heap = new Heap(1);
  heap.add(1);
  heap.add(2);
  console.log(heap.remove(), 1);
  console.log(heap.remove(), 2);