// Smallest Common Region
// You are given some lists of regions where the first region of each list includes all other regions in that list.

// Naturally, if a region x contains another region y then x is bigger than y. Also, by definition, a region x contains itself.

// Given two regions: region1 and region2, return the smallest region that contains both of them.

// If you are given regions r1, r2, and r3 such that r1 includes r3, it is guaranteed there is no r2 such that r2 includes r3.

// It is guaranteed the smallest region exists.
// Example

// Input:

// regions = [
//   ["Earth","North America","South America"],
// ["North America","United States","Canada"],
// ["United States","New York","Boston"],
// ["Canada","Ontario","Quebec"],
// ["South America","Brazil"]],
// region1 = "Quebec",
// region2 = "New York"

// Output:

//  "North America"

// Explanation:

// Since the region “North America” is the Smallest region that contains both “Quebec” and “New York” , we return “North America”.

// Input:

//  regions = [
//    ["United States", "New York", "Boston"],
//   ["Earth", "North America", "South America"],
//  ["North America", "United States", "Canada"],
//  ["Canada", "Ontario", "Quebec"],
//  ["South America", "Brazil"]], 
//  region1 = "Canada", region2 = "South America"

// Output:

//  "Earth"

// Explanation :

// Since the region “Earth” is the Smallest region that contains both “Canada” and “South America”, we return “Earth”.