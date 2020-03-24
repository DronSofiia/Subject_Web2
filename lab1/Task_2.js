var mixingWord=function(word){

    
    var mass=word.split("");
    mass=mass.sort();
    var alphabet="";
    for(var i=0; i<mass.length; i++){
        alphabet+=mass[i];
    }
    return alphabet;
}
module.exports={mixingWord};
