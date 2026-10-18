/* WHILE LOOP 
SYNTAX
while(conditino){
code
}

DO WHILE LOOP 
SYNTAX
do{
code
}while(condition);

FOR OF LOOP
helps us to access things present in array ..even if object is present inside the array 
SYNTAX
for(let i of array or something){
// here i driectly becomes the element present in array 
console.log(i) // prints all element present in the array
}
 we can apply it for strings too to access each a every charecter present in the string
 */
console.log("printting result using for of loop")
const arr = [1,2,3,4,5];
for(let i of arr){
    console.log(i)
}

// MAPS -> another datastructure in javascript 
const map = new Map();
// maps holds key - value pairs and remember original insertion order of keys and it only have 
// unique keys name 

// to insert value in map 

map.set("IN", "INDIA")
map.set("USA", "UNITED STATES OF AMERICA")
map.set("FR", "FRANCE")
console.log(map)

// HOW TO USE FOR OF LOOP IN CASE OF MAPs
console.log("for if loop for maps")
for(let[key, value] of map){
    console.log(key);
    console.log(value);
/*
gives this result
IN
INDIA
USA
UNITED STATES OF AMERICA
FR
FRANCE
*/
}

//NOTE -> OBJECT IS NOT ITERATABLE USING FOR OF LOOP 

// in oerder to iterate object we use FOR IN LOOP 
/*
SYNTAX
for(let i  in somethin){
 // here i can take values of keys but not the values
}
 */

const lang  = {
    js:"javascript",
    cpp:"c++",
    rb:"Ruby"
}
console.log("iterating in object using FOR IN loop");
for(let i in lang){
    console.log(i); // prints all keys
    console.log(`${i} -> ${lang[i]}`)
}

// if we apply for in loop for arrays then it will print then i will pick index of the array not 
// the direct element

// maps are not iteratable using for in loops 

// FOR EACH LOOP

const coding  =["js","cpp","python","ruby"];
coding.forEach(function (item){ // since it is a call back function hence we do not give its name 
// here item is the element present in the array
console.log(`langauge is ${item}`);
}) // so it will execute the function for each element present in the array 

// doing same thing using arrow function 
console.log("using for each loop and arrow function as call back function")
coding.forEach((item)=>{
    console.log(item)
})

// another way to use foreach loop 

function printme(item){
console.log(`printed ${item}`);
}
coding.forEach(printme); // NOTE give function as refrence not call
// i.e dont do this printme() inside for each loop on do printme

// for each loop dont only brings item it can also bring index as well as array 
// coding.forEach(item,index,array){
// console.log(item,index,array) 
// }

// FOR EACH LOOP allows us to access objects present in the arrays very easily 

// FOR EACH lOOP can not return any thing wven if we write return in function 

// FILTER helps us to filter out the elements and select the selective element and also it returns the value unlike FOR EACH 

const arrays  = [1,2,3,4,5,6,7];
let ans = arrays.filter(function(ele){
   return ele>3;
});
console.log("on using filter")
console.log(ans);

console.log("on using filter and arrow function")
let ans2 = arrays.filter((ele)=>ele>4);
console.log(ans2);

// for each loop can be used to update something too as follows 
const newarr = [];
arrays.forEach((ele)=>{
    if(ele>3)newarr.push(ele);
})
console.log("on using foreach to update somthing")
console.log(newarr);

const tan  = [1,2,3,4,5,6,7,8,9];
tan.forEach((ele, index)=>{
    tan[index] = ele+10;
})
console.log(tan)


// MAP 
console.log("using map to manipulate the arrays")
const hello = [1,0,2,3,1,6,0,4,1];
const newhello = hello.map((ele)=>ele+10);
console.log(newhello);

//CHAINING => here we apply map , filter, for each in chain i.e one by one 
console.log("on applying chaining")
const newhellllo = hello.map((ele)=>ele*10).map((ele)=>ele+1).filter((ele)=>ele>=10);
console.log(newhellllo);

// REDUCE 
/*
it is bassically used to add the elemets present in the araay here 0 after } is the initail value of acc (accumulator) and currval is the value coming from the array 
acc = 0 currval = 1
acc = 1 currval = 2
acc = 3 currval = 3
acc = 6 currval = 4

final ans = 10 
*/
const array3 = [1,2,3,4];
const mynums = array3.reduce(function(acc,currval){
    return acc+currval;
},0) 
console.log("using reduce");
console.log(mynums);





