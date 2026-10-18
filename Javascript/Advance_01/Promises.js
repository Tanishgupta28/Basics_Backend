/* 
Promise => the promise object represents the eventual completion or failure of an asynchronus
operation and its resulting value .
THREE STATES OF PROMISE 
1) pending: initial state, neither fulfilled nor rejected 
2) fulfilled: operation was completed succesfully
3) rejected: operation failed
*/
// now we are going to make diffrenet types of promises 

const { use } = require("react");

// since promise is an object we make it using new key word
const promiseOne = new Promise(function(resolve, reject){
    // do async task 
    // DB calls, cryptography etc.
    // for example here we do setTimeout
    setTimeout(function(){
        console.log("hi my name is Tanish");
        resolve();
    },1000); 
})
// now we need to consume this promise 
// resolve is connected to .then 
// so if resolve runs in the above promise object function then when even we erote in .then 
// function will get executed 
promiseOne.then(function(){
    console.log("promise is consumed");
})

// we can writethen same thing in more simpler way 
new Promise(function(resolve, reject){
    setTimeout(function(){
        console.log("hi my name is Tanish");
    },1000);
    resolve();
}).then(function(){
    console.log('promise is resolved');
})

// now our async task is to fatch a data from somewhere and if the data fetching is resolved
// then how can we use this data 
const promise3 = new Promise(function(resolve, reject){
    setTimeout(function(){
        console.log("hi my name is Tanish");
        // say here we fetched our data then 
    },1000);
    resolve({
        username: "Tanish",
        email: "tgupta_be23@thapar.edu"
    });
    // basically we can pass that data in resolve and we can utlize it from then 
})
promise3.then(function(user){
    console.log(user); // here user is that thing which we passed in resolve() i.e data
})

// now lets talk about the reject 
// we use it ehn our promise fails 

const promise4 = new Promise(function(resolve,reject){
    setTimeout(function(){
        let error = true;
        if(!error){
            resolve({
                 username: "Tanish",
                 email: "tgupta_be23@thapar.edu"
            })
        }else{
            reject("ERROR: someting went wrong");
        }
    })
})

// .then() is used for resolve and .catch() is used for reject 
promise4.then(function(user){
    console.log(user);
    return user.username;
}).then(function(username){
    console.log(username);
}).catch(function(error){
    console.log(error);
}).finally(function(){
    console.log("finally it is either rejected or resolved");
})

// here you can notech that we applied .then two times which called chaning 
// the first .then() recives the thing inserted in resolve
// after that if we use .then again then it receives the thing which was returned in
// previous .then() 
// catch receives thing which is inserted in reject()
// .finally() is called by default or we can make it by our own 
// it is used to tell that finally the task has been overed of promise and what is the conclusion

// LETS DO SAME THING IN DIFFERENT SYNTAX
//ASYNC AWAIT 
const promise5 = new Promise(function(resolve,reject){
    setTimeout(function(){
        let error = true;
        if(!error){
            resolve({
                 username: "Achin",
                 email: "aagarwal_be23@thapar.edu"
            })
        }else{
            reject("ERROR: someting went wrong");
        }
    })
})

// async await similar to .then .catch 
// async => waits for the promise to complete the work and gets resolved 
// but fro it waits for perticular duration only and in that duration if promise 
// not able to do that work then it shows error
async function consumePromise5(){
    try{
        const response = await promise5;
        console.log(response)
    } catch(error){
        console.log(error);
    }
} 
// jis bhi cheez ko ane me time lg skta hai uske samne await lgana hai 

// fetch() => this is used to fetch the data from api we can also call it as promise
/*
so its syntax would be 
fetch("url..").then(function(data){
console.log(data)}).catch(function(error){
console.log(error)});

NOTE :- fetch promise only rejects when network error encountered ie it was not able to 
connect to the server when there is permission issur or something else then we receive it 
as response itself rather than receiving it as error 
like fetch() does not reject http error(404, 401, etc).
 */


