var nsd=function(a,b){
    var max=0;
    if(a>b){
        max=b;
    }
    if(b>a){
        max=b;
    }
    else{
        max=a;
    }
    for( var i=0; i<=max ; i++ ){
         
        if(a%i==0 && b%i==0){
            var number=i;
            
        }
        
    }
return number;
}
console.log(nsd(28,28));