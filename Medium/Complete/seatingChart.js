function seatingCharts(students) {
    const results = [];
    const seats = []; // stack
    const assigned = new Set();
  
    function helper() {
      // is this a dead end (or base case)
      if (seats.length === students.length) {
        results.push([...seats]);
        return;
      }
  
      // Try each of the possible decisions from here
      for (const s of students) {
        // Have we already place this student in a seat?
        if (!assigned.has(s)) {
          // If we haven't...
          // Put this person in THIS seat
          seats.push(s);
          assigned.add(s);
  
          // Move on to the next student to place
          helper();
  
          // Remove this person from this seat so we can try someone else here
          seats.pop();
          assigned.delete(s);
        }
      }
  
    }
  
    helper();
    return results;
  }