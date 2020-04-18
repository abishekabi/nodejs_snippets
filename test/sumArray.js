
module.exports = {
    sumArray: function sumArray(arr1=[1,2,3,4,5]){
        total_sum = 0;
        arr1.forEach(element => {
            total_sum = total_sum + element;
        });
        return total_sum;
    
    }
    
}