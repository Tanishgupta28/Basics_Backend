"use strics"
let score = 33
console.log(typeof(score))
/* so here it is already in number 
but what if it was in string ..then we need to convert
it in number*/

let scoree = "33"
let scoreeInNumber = Number(scoree);
// Number() helps us to convert string into number 

console.log(typeof(scoree));
console.log(typeof(scoreeInNumber));

// if we do not keep 33 as string  in scoree and then convert it into number 
scoree = "33abc";
scoreeInNumber = Number(scoree);
console.log(typeof(scoreeInNumber));
console.log(scoreeInNumber);
// Again Number converts into number datatype but assign it NaN value

// if we keep null value in scoree then what happens 
scoree = null;
scoreeInNumber = Number(scoree);
console.log(typeof(scoreeInNumber));
console.log(scoreeInNumber);
// then it gives us 0  value 

// if we keep a boolean values in scoree then
scoree = true;
scoreeInNumber = Number(scoree);
console.log(typeof(scoreeInNumber));
console.log(scoreeInNumber);
// then it gives 1 

// if we keep a strinng in scoree then 
scoree = "Tanish";
scoreeInNumber = Number(scoree);
console.log(typeof(scoreeInNumber));
console.log(scoreeInNumber);
// it gives NaN value 

// say we have something and we need to convert it in to boolean 
let isLoggedIn = 1;
let booleanIsLoggedIN = Boolean(isLoggedIn);
console.log(typeof(booleanIsLoggedIN));
console.log(booleanIsLoggedIN);
// it gives us value ture 

//if we keep empty string in isLoggedIn then 
isLoggedIn = "";
booleanIsLoggedIN = Boolean(isLoggedIn);
console.log(typeof(booleanIsLoggedIN));
console.log(booleanIsLoggedIN);
// gives us false ... where as in full string it gives us value true i.e on "Tanish"

// we can convert things into string too
let someNumber = 33;
let stringSomeNumber = String(someNumber);
console.log(typeof(stringSomeNumber));
console.log(stringSomeNumber);
// it gives us value in in string that is "33"
