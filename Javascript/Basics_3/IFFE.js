// Immediately Invoked Function Expression (IIFE)
// as soon as we write the function we want itto be executed
//The main benefit of an IIFE is that it creates a private scope for variables and functions.
// General Form
/*

(function () {
    code
})(); 

*/
// Using Arrow function
/*

(() => {
    // code
})();

 */

// Without IIFE:

let message = "Hello";

function greet() {
    console.log(message);
}

// Both message and greet become global variables.

// With IIFE:

(function () { // sinmple iife
    var message = "Hello";

    function greet() {
        console.log(message);
    }

    greet();
})(); // make sure to put ; here since we need tell computer that our iife has been overed 

// the above thing will be executed as soon as it is made and now Now message and greet exist only inside the IIFE and cannot be accessed from outside.

// using arrow function creating iffe function 
((a,b)=>{
    console.log(a+b);
})(); // gives NaN since it is executed imidiately and has no values inn input 
// so how am i going to give inputs in iife

((a,b)=>{
    console.log(a*b);
})(3,2); // this is how we give input 

(function tanish(){ // NAMED IIFE since we have given it a name tanish
    console.log("hello");
})();