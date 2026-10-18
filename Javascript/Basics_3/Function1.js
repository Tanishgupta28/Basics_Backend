// syntax

function tan(){
    console.log("Tanish")
}
// tan -> refrence of function 
// tan()-> calling out the function  
tan();

// function to add two numbers 
function addNum(num1, num2){ // here which is written in brackets is called parameters
 return num1+num2
}
let num3 = addNum(1,3);
console.log("Addition through function");
console.log(num3);

// if we do not pass any values to the function then the gives result as undefined 
// to handel this we can apply if elese statement or we can give a by default value 

// REST OPERATOR 
function restoprfunc(...num1){ // ... these three dots tells here that any other 
    // argument entered other than num1 willalos be accepted 
    return num1
}
console.log("understanding the importance of rest operator")
console.log(restoprfunc(1 ,2 ,3)); // gives [ 1, 2, 3 ]

// HOW TO HANDEL OBJECTS VIA FUNCTION
const user = {
    name:"Tanish",
    price:199
}

function handelObject(anyobj){
    console.log(`user name is ${anyobj.name} and total cost is ${anyobj.price}`);

}
handelObject(user);

// if we want to run the function in some interval then 
setInterval(function(){
    //code
},1000) // at last comes time in milisecond, accorsing to this after every 1 sec the function will
// be executed