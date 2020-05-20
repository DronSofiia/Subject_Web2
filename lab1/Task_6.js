

const SortName=(a,b) => (a.name>b.name)? 1:(a.name<b.name? -1:0 );


module.exports = {
    
    SortName: SortName
}
