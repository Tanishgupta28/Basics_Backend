let name = "Tanish";
let repoCount = 10;
// console.log(name + repoCount+ " Value");
// this is older fashoion of writing the code 


// currently we write code like this 
// console.log(``); 
// back ticks allows us to use string interpolaatinon that is to use variables inside the string 
// console.log(`Hello my name is ${name} and ny repo count is ${repoCount}`);


// another way to declare the string
let gameName = new String("COD");
// console.log(gameName); 

// we can also access evry charecter of the string 
// console.log(gameName[0]);

// console.log(gameName.__proto__);
// in prototype of every variable inbackend the functions are built to perform certain operation

//methods in protype of string 
// console.log(gameName.length)
// console.log(gameName.toLowerCase())
// this did not changed our original string value becase it is a primitive datatype
// console.log(gameName.charAt(2)) // here there is 0 indexing
// console.log(gameName.indexOf('T'));
// If there is no such cahrecter present then it will retunr -1 else it will return the postion 
let str1 = "God-Of-War";
// say we ant to do slicing of the string 
let str2 = str1.substring(0,4);
// console.log(str2);// so here last index is not included that we only consider 0 1 2 3

let str3 = str1.slice(0,4);
// console.log(str3); // here it is diffenret from sunstring as we can insert here negetive values 
// to take values of the part of the string from end as substring 
let str4 = str1.slice(-8,4);
// console.log(str4);

// say we have string with spaces and we want to remove it 
let nam = "   Tanish   ";
// console.log(nam);
// console.log(nam.trim());

// replace function is used to replace a charecter from another charecter 
let namee = "Tanish%Gupta";
// console.log(namee.replace("%"," "));

// includes fuctionis used to check that wheather a perticular sting is presnt in the main string or not 
// console.log(namee.includes("Tanish"));// retunrs true of flase 

// we can spilt string based certain things using split 

console.log(namee.split('%'));


