var countDate=function(month,year){
    return new Date(year, month, 0).getDate();

}
console.log(countDate(3,2017));