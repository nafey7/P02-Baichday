exports.CalculateRating = (arr) => {

    let sum=0;
    for (let i=0;i<arr.length;i++){
        sum = sum+arr[i];
    }
    let rating = (sum)/(arr.length);

    return rating;
}