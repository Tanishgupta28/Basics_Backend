// truthy values are those values which are assumed to be true 
const username = "Tanish";
if(username){
    console.log("user is there");
}
else{
    console.log("user is NOT there");
}
// here we did not made nay comparision and it is assumed that username is true value hence it is 
// truthy value 
// here if we would take an empty string then we would had considered it as false
// if we would have inserted empty array the it would act as true 

/*
FALSY VALUES
false, 0 , -0, 0n(BigInt), "",null, undefined, NaN

TRUTHY VALUES
"0", "false"(false written in string)," "(string with space), [](empty array), {}(empty object),
 */

// TO check if array is empty or not

const array = [];
if(array.length===0){
    console.log("array is empty");
} 

// To check if object is empty 
const obj = {};
if(Object.keys(obj).length===0){
    console.log("object is empty");
}

//Nullish coalescing operator(??)
/*
SYNTAX
let result = value ?? defaultValue;

The Nullish Coalescing Operator (??) is used to provide a default value when the left-hand side is null or undefined

If value is:
null → returns defaultValue
undefined → returns defaultValue
anything else → returns value

 */
let val1 = 10??20; 
console.log(val1); // gives 10
let val2 = null??100;
console.log(val2); // gives 100

// Terniary operator
/*
SYNTAX
condition ? true:false
 */
let x = 100;
x>=80?console.log("greater than 80"):console.log("less than 80")