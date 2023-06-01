/* https://www.ibm.com/topics/knn#:~:text=The%20k%2Dnearest%20neighbors%20algorithm%2C%20also%20known%20as%20KNN%20or,of%20an%20individual%20data%20point.
While it’s not as popular as it once was, it is still one of the first algorithms one learns in data science due to its simplicity and accuracy.
However, as a dataset grows, KNN becomes increasingly inefficient, compromising overall model performance. It is commonly used for simple 
recommendation systems, pattern recognition, data mining, financial market predictions, intrusion detection, and more. 

the goal of the k-nearest neighbor algo is to ID nearest neighbors of given query point, so we can assign a class label to that point
requirements for determining distance metrics (to near neighbors) for forming decision boundaries - partitions query points into different 
regions (Voronoi diagrams)

possible distance measures:
 - Euclidean distance formula (p = 2)
 - Manhattan distance AKA taxicab distance/city block distance (p = 1) - abs. value between two points AKA tax
 - Minkowski distance - generalized version of Euclidean and Manhattan distance
 - Hamming disatnce - for Boolean or string vectors, finding where vectors don't match

k = the number of neighbors checked to determine classification of query point
e.g. k = 1, classification assigned based on THE nearest neighbor
e.g. k = 2, based on 2 nearest neighbors (not ideal value since even)
finding ideal k value is important for classifying the best way
lower k = high variance + low bias
larger k = low variance + high bias
k should ideally be odd to avoid classification ties

applications in ML:
data preprocessing: can estimate for missing values in datasets AKA missing data imputation
recommendation engines: clickstream data from websites visited by user to provide recommendation
finances: loan risk, stock market forecasting, currency exchange
healthcare: calculate most likely gene expressions for risk of heart attack and cancer
pattern recognition: text, digit classification (ID handwritten numbers) 

adv:
easy to implement, adapts easily (all training data stored into memory for new data), simpler compared to toher ML algos
disadv:
does not scale well (more memory), curse of dimensionality (high dimensional data inputs are worse), prone to overfitting
*/ 

// given array of points and integer k, return k closest points to origin (0,0)
// hint: use Euclidean distance to find distance betwen two points 
// (x^2 + y^2 = c^2, sqrt(x^2 + y^2) = c = sqrt((x1 - x2)^2 + (y1 - y2)^2))

function knn(array_points, k) {
    const output = []

    // assuming second point is (0,0)
    function getDistance(x1, y1) {
        let x = Math.abs(x1), y = Math.abs(y1)
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    }
    
    // sort coordinates by distance from origin
    // calculate distance of each point
    // cb function: between a and b, sort a before b if a - b < 0, b before a if a - b > 0, else maintain order
    array_points.sort((a, b) => getDistance(a[0], a[1]) - getDistance(b[0], b[1]))

    for (let i = 0; i < k; i++) {
        output.push(array_points[i])
    }

    return output
}

//               2,     1
let points1 = [[1,3],[-2,2]]
let points2 = [[3,3],[5,-1],[-2,4]]
console.log(knn(points1, 1), [[-2,2]])
console.log(knn(points2, 2), [[3,3],[-2,4]])
console.log(knn(points2, 3), [[3,3],[-2,4],[5,-1]])

// get all distances and replace them in array
// sort by asc distance and return from 0 to k - 1
// T(O(nlogn)), S(O(1))


// 