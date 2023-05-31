/*
'''
Suggest Meeting Times

You've been asked to write a function that finds all available time slots for scheduling a meeting between a group of people. The function should take as input a dictionary of schedules, where each key represents a person and the value is a list of busy intervals during the workday. The busy intervals are represented as tuples of start and end times. For example, the following schedule shows that Alice is busy from 8am to 10am and from 1pm to 2pm, while Bob is busy from 9am to 11am and from 2pm to 3pm:

schedules = {
    'Alice': [(8, 10), (13, 14)],
    'Bob': [(9, 11), (14, 15)],
}

The function should also take as input the duration of the meeting in hours, and should return a list of all available time slots during the workday where the meeting can be scheduled. A workday begins at 8am and ends at 5pm. A time slot is represented as a single integer that represents the start time of the slot in hours past midnight.

Your task is to implement the find_available_slots function that takes these inputs and returns the list of available time slots. Be sure to consider edge cases, such as when there are no busy intervals, when the meeting duration is longer than the workday, and when multiple start times are possible within a single free interval.
 

EXAMPLE(S)
schedules = {
    'Alice': [(8, 10), (13, 14)], [10-13], [14-17]
    'Bob': [(9, 11), (14, 15)], [8-9],[11-14],[15-17]
}
[[11,13],[15,17]]

For example, if the meeting duration is 2 hours and the workday is from 8am to 5pm, the available time slots for the above schedule would be [11, 15], since those are the only times where both Alice and Bob are available for a meeting of 2 hours.
 

FUNCTION SIGNATURE
find_available_slots(schedules: dict, duration: int) -> list:
'''


Assumptions: 
-multiple people, multiple windows 
-meeting window cant be longer than 9 hours
- schedules input length > 1 person
- whole hour inputs
- multiple valid meetings in an available increment

schedules = {                       [10,12],[11,13]   - [11,13],[12,14]
    'Alice': [(8, 10), (13, 14)] - [10-13], [14-17]
    'Bob': [(9, 11), (14, 15)] - [9-11], [11-14],[15-17]
}
[[11,13],[15,17]]

comparing 2 time blocks [10-13],[11-14]
start = Math.max(x[0], y[0]) = 11
end = Math.min(x[1], y[1]) = 13

comparing 2 time blocks [10-13],[9-11]
start = Math.max(x[0], y[0]) = 10
end = Math.min(x[1], y[1]) = 11
availability > min duration ? 
if no, skip : get valid meetings

Brainstorm: 
- get available times for each individual
- iterate through all availbaities and eliminate those < minimum duration
- for every ith availability for a person, look at other people's avialabilites for overlap
- for any overlap, get all possible meeting times
  - get all possible 2 hour blocks in each avialabilitey and check fro match in other block
  - start = Math.max(x[0], y[0])
  - end = Math.min(x[1], y[1])
      - stick in valid timeblock into a set 
      - if time block is already in the set, its a valid solution
      - maybe keep set as a solution ? 
  - get meeting times via min duration
  - add valid meeting times to hashset (if already in here, skip adding redundant time) - 
- return array'd version of hashset
- 
*/

var schedules  = {
    'Alice': [[8, 10], [13, 14]] ,
    'Bob': [[9, 11], [14, 15]] ,
    'Jack': [ [8,11] ]
  }
  
  console.log(find_available_slots(schedules, 2)) // expects [[11,13],[15,17]]
  
  // [10,12],[11,13],[14,16],[15,17]
  
  function find_available_slots(map_busy_schedules, min_duration) {
    //make sure min duration > 9
    if(min_duration > 8) return []
    // - get available times for each individual
    const freeTimes = new Set()
    for (const person_times of map_busy_schedules.values()) { //add in index instead of hard coding 0,0
      // compare first availability to day start
      if (person_times[0][0] > 8) {
        freeTimes.add([8, person_times[0][0]])
      }
      //assume theres at least 2 tiems - make check 
      for (let i = 1; i < person_times.length; i++) {
        let freeTime = [person_times[i - 1][1], person_times[i][0]]
        if (freeTime === min_duration) {
          freeTimes.add(freeTime)
        } else if (freeTime > min_duration) {
          let max = person_times[i - 1][1] + min_duration
          while (max <= person_times[i][0]) {
            freeTimes.add(person_times[i - 1][1], max)
            max++
          }
        }
      }
      // check for free time until EOD
      if(person_times[person_times.length-1][1] < 17){
        freeTimes.add([person_times[person_times.length-1][1],17])
      }
    }
  }