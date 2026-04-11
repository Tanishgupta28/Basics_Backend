/*Data types are of two types primitive and non primitive 

DIFFERENCE BTWEEN PRIMITIVE AND NON PRIMITIVE 
data are categorised as primitive and nono primitive based on how they are kept 
int the main memory and how they are ascessed */

// PRIMITIVE(call by value)(menas when ever we call then and make changes we are changing 
// in there coppy 
// 7 TYPES : String ,Number, Boolean, null, undefined, Symbol, BigInt
let id = Symbol('123');
let anotherId = Symbol('123')
// console.log(id === anotherId) // gives false shows that Symbol is uniqueness

//NON PRIMITIVE (Reference)
// Array, Objects, Functions

//Arrays
const heros = ["Ironman","SpiderMan","CaptainAmerica"]
//Objects 
let myObj = {
    name:"Tanish",
    age:21, 
}

//function
const myFunction = function(){
    // console.log("Hello World");
}


//JavaScript is a dynamically typed language. ✅

/*🧠 What that means
You don’t need to declare data types explicitly
The type is decided at runtime */