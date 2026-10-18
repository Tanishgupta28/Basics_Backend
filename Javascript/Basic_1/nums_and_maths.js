//NUMBERS
let score = 400
// console.log(score);


//another way to declare number  type variable 
let scoree = new Number(500)
// console.log(scoree);

//convert number to string 
// console.log(scoree.toString())

// tofix() is used to specify that ustill which decimal poin do we want ans 
// console.log(scoree.toFixed(2)) // 500.00

//toPrecision is used to do round of of the valeu 
let num  = 123.989;
// console.log(num.toPrecision(5));

// toLocalString() is used to convert a hige number into standard us form 
let hundreds = 100000000;
// console.log(hundreds.toLocaleString());//100,000,000

//Max-Value give maximum value of number in js 
let maxi = Number.MAX_VALUE;
// console.log(maxi)


// In JS the Math is an object having many fucnctions
// abs() is used to get the absolute value which convert any -ve value n to +ve
// console.log(Math.abs(-4));

//round() function is used to do round of 
// console.log(Math.round(4.4)); // 4
// console.log(Math.round(4.6)); // 5

//ceil() function is used to give ceiling value 
// console.log(Math.ceil(4.3)); // 5
// console.log(Math.ceil(3.2)); // 4

//floor() function is used to give floor value
// console.log(Math.floor(4.3)); // 4
// console.log(Math.floor(3.2)); // 3

//random() give us tha randome value between 0 and 1 by default 
// console.log(Math.random());
// If we want to get random value between some range the we apply the forlmula 
let min = 10;
let max = 20;

// console.log(Math.random()*(max - min +1)+min)
// now if we ant to have proper value and no float then 
console.log(Math.floor(Math.random()*(max - min +1)+min))