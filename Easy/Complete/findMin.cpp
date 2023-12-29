#include <iostream>

using namespace std;

int findMin(int[], int);

int main() {
    int arr[] = {2, 4, 1, 5};
    cout << findMin(arr, 4) << endl;

    return 0;
}

int findMin(int arr[], int len) {
    if (len == 1)
        return arr[len - 1];

    int possibleMin = findMin(arr, len - 1);

    if (possibleMin < arr[len - 1]) {
        return possibleMin;
    } else {
        return arr[len - 1];
    }
}