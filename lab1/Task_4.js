var randomMass=function(){
    var massuv=[1,2,4,8,7];
    for(var k=0; k<=massuv.length ; k++ ){
        var j=Math.floor(Math.random()*massuv.length);
        var i=Math.floor(Math.random()*massuv.length);
        [massuv[i], massuv[j]]=[massuv[j], massuv[i]];
        
    }
  
    return [massuv];

}
module.exports={randomMass};
