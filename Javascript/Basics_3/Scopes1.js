// SO THERE WERE THREE TYPE OF VARIABLES const , let and var
var c = 3000;
if(true){
    let a = 10;
    const b = 20 ;
    var c = 30 ;
    // these all are declared in local/ block scope hnce these must be used within this if startement 
    // they cannot be used outside this if statement
}
// console.log("printing a")
// console.log(a) // this will give error tha a is not defined hence workinng nicely 

// console.log("printing b")
// console.log(b) // this will give error tha a is not defined hence workinng nicely 

console.log("printing c")
console.log(c) // this gives 30 hence it do not check wether it was declared gloabbly or locally 
// even if we declare c globally as 3000 then also it sees only the latest declaration even if we declared it locally 

// another ay to declare function also called as Expression

// addone(2) // gives error that addone is not yet made
const addone = function(num){
    return num+1;
}
console.log(addone(5))
// if we declare function as expression then we would not be able to call function before it is made
// if we declare function noramlly i.e function addone(num){ return num+1} the we can call it before it has been declared 
console.log("called before function formation");
console.log(addtwo(3));
function addtwo(num){
    return num+2;
}
console.log("called after function formation");
console.log(addtwo(4));
