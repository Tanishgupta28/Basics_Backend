// dates in js are calculated from january 1 1970
// dates are calculated in miliseconds 
let date = new Date()// here we created an object of date class
console.log(date); // but this comes in very unstructured manner  2026-05-23T12:11:54.500Z
// so we try to convert date into string 
console.log(date.toString()) // here we get sommething like this Sat May 23 2026 17:41:54 GMT+0530 (India Standard Time)
// similarly there are some other methods which can convert date into some other format such as 
console.log(date.toDateString()) // just give this much Sat May 23 2026
console.log(date.toLocaleDateString()) // gives 5/23/2026
console.log(date.toLocaleString()) //  gives 5/23/2026, 5:46:33 PM

// what would be the type of the date variable 
console.log(typeof date) // gives object

// if we want to create my own date then how can i do it 
let mydate = new Date(2004, 5, 28)//year, month(zero indexing usch as june->5),date
console.log(mydate.toDateString()); // gives Mon Jun 28 2004
// we can create the my own date in other way 
let myDate = new Date("2004-06-28")
console.log(myDate.toDateString()); // gives Mon Jun 28 2004

// We also have the time stamps in js(helps in taking decisions for quizes and polls that whol gave the answer first)
let myTimeStamp = Date.now();
console.log(myTimeStamp);// 1779539392033 this give the valeu in milli second from the date january 1 1970
// now how can we comapre the valeu fo the time stemp which we got from our refrence thime stemp ..we can use our created date and subtrcat the current date from it to get the milisecond diffrenec

console.log(myDate.getTime()) // 1088380800000 this is the miliceconsd of my date from january 1 1970.
// so we can compare these two dates 
//How to convert the date into seconds
console.log(Date.now()/1000) // but it gives values in decimal hence we use math. floor to make it in decimal 
console.log(Math.floor(Date.now()/1000))

// there are some other information which we can extrcat from the Date object which provide us the iformation about the current date
console.log(date.getMonth());// gives answer in numbers and zero indexing is there
// to get real month number 
console.log(date.getMonth()+1);// 5 -> may
console.log(date.getDate());// no zero indexing 

// we can use toLocalString can be used in case of date to define too many parameters 
date.toLocaleString('default',{
    weekday:"long",
    //etc....
}) 
// 'default'-> which type of internationalization do we need 
// on pressig ctrl+ space we can what all things we cam insert here 
// within {} we can write all thisng in which we want out date to look like 
