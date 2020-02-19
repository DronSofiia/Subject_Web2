var mixingWord=function(word){

    //var mix=word.sort();
    var mass=word.split("");
    mass=mass.sort();
    var alphabet="";
    for(var i=0; i<mass.length; i++){
        alphabet+=mass[i];
    }
    console.log(alphabet);
}
mixingWord('hello');