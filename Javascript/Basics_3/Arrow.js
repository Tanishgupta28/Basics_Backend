const user = {
    username:"Tanish",
    price: 999,
    welcomeMessage: function(){
        console.log(`${this.username}, welcome to website`)
        console.log(this) // here this reffers to current object in which i am currently in 
    }
} // here this operator tells the context ..that we are talking about which object 
user.welcomeMessage()
console.log("using this when not inside any object")
console.log(this) //here this reffers to node environment that is an empty object 

// in case of function this conatinas many information about functino 
function hello(){
    console.log("on using this inside the function")
    console.log(this);
}
hello()
// got this 
/* <ref *1> Object [global] {
  global: [Circular *1],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  structuredClone: [Function: structuredClone],
  atob: [Function: atob],
  btoa: [Function: btoa],
  performance: [Getter/Setter],
  fetch: [Function: fetch],
  navigator: [Getter],
  crypto: [Getter]
}*/

// ARROW FUNCTION
const tan = ()=>{
    console.log("Arrow function is here")
}
tan();
//IMPLICIT RETURN IN ARROW FUNCTIONS
/*In JavaScript, implicit return means an arrow function returns a value automatically without 
writing the return keyword. */

//Normal (explicit) return
const add = (a, b) => {
    return a + b;
};
console.log(add(2, 3)); // 5

// Implicit return
const add = (a, b) => a + b;
console.log(add(2, 3)); // 5

// or we can worte same this as
const add = (a,b)=> (a+b) // if we write in () then we do not need to write return 
// if we use {} then we need to write return