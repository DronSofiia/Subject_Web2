var user_1={
    name:"Sonja"
}
var user_2={
    name:"Nelya"
}
var user_3={
    name:"Misha"
}
var user_4={
    name:"Yuriy"
}

function SortName(us_1, us_2){
    if(us_1.name>us_2.name){
        return 1;
    }
    if(us_1.name<us_2.name){
        return -1
    }
    else{
        return 0
    }
}

var mass=[user_1,user_2,user_3,user_4]

mass.sort(SortName);
console.log(mass);