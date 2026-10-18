/* full form of NPM is node package manager .... npm ko node ka playstore smajh skte ho .....npm ek jagah hai jaha pe bohot sare package milte hai....npm=files of codes which can make our work easier and allow us to use somem features without writing a single line of code by ourselves
now what is package->bni bnayi cheeze hoti hai package */
// since we have installed the one liner joke package 
var oneLinerJoke = require('one-liner-joke');
var getRandomJoke = oneLinerJoke.getRandomJoke();
console.log(getRandomJoke);
var figlet = require("figlet");

figlet("THIS IS TANISH", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});