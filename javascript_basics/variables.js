const accountId = 142; 
// variables declared in const can not be changed

let accountEmail = "tanishgupta2806@gmail.com";
// variables declared in let can be changed

var accountPassword = "12345";
/*
prefere not to use var 
because of issue in block scope and functional scope
*/ 

accountCity = "Gurugram"; 
/* this is not at all good but we 
can declare variable like this too without giving let or const etc
 */

let accountState; 
/* now here we are not giving it any value
so it shows undefined when printed */ 

// console.log(accountId);
// console.log() is used to print single thing in terminal 

accountEmail = "abc";
accountPassword = "tan";
accountCity = "Jaipur";

// now these all are modifiable
 console.table([accountEmail,accountPassword,accountCity,accountState]);
// console.table() is used to print multiple things in the table

