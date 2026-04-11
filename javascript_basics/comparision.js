// console.log(2 > 1);
// console.log(2 >= 1);
// console.log(2 < 1);
// console.log(2 == 1);
// console.log(2 != 1);
// basic comapriosn operations which written true or false 

// console.log("2">1) 
// returns true ... js automatically converts 2 into number here
/* here problem is that here output is uncertain..hence we should always make sure
then whenerev we are comparing two things there datatype should be same*/


// console.log(null > 0);// false 
// console.log(null == 0);// false 
// console.log(null >= 0);//true 
/*The reason is that an equality check == and comparisons >, <, >=, <= work differently.
Comparisons convert null to a number, treating it as 0.
 That’s why null >= 0 is true and null > 0 is false. */

//incase of undefined values 
// console.log(undefined > 0);// false 
// console.log(undefined == 0);// false 
// console.log(undefined >= 0);//flase 
// we always get false value 

// strickt check ... it not only compares the value but it also compare datatype
console.log("2"==2);//true 
console.log("2"===2);// false 