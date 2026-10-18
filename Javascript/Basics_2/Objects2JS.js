const TinderUser = new Object() // singleton object (declared as constructor)
// const tan = {} // non singleton object (declared as letral)
console.log("object before inserting any thing in it");
console.log(TinderUser);

TinderUser.name = "Tanish";
TinderUser.id = 102316041;
TinderUser.isLoggedin = true;
console.log("object after inserting things in it");
console.log(TinderUser);

// Declaring 
const regular={ // declaring object in lateral form
    email: "tan@gamil.com",
    fullname:{ // object inside an object
        userfullname:{
            firstName:"Tanish",
            lastName:"Gupta",
        }
    }
}
console.log(regular.fullname.userfullname.firstName)

// combining objects 
const obj1 = {1:"a",2:"b"}
const obj2 = {3:"c",4:"d"}

// we can not combine these two objects like this 
obj3 = {obj1 , obj2} // this will cause two objects within a object
console.log("on combining two objects in wrong way");
console.log(obj3); // gives -> { obj1: { '1': 'a', '2': 'b' }, obj2: { '3': 'c', '4': 'd' } }

// for array we use to use "const info = my_friend.concat(my_nam)"
// In case of objects we use 
const obj4 = Object.assign({},obj1,obj2) 
// Object.assign() works like this: Object.assign(target, source1, source2, ...)
//The first argument is the target object where all properties will be copied.
//create a new empty object {},copy properties of obj1,then copy properties of obj2,return the new merged object 
console.log("after using function assign() to concatinate")
console.log(obj4) 

// another way use to use in case of array concatination is const tan = [...my_nam,...my_friend];
// same thing we can use in case of object ..called as spread

console.log("on combining two objects with help of spread");
const obj5 = {... obj1,...obj2};
console.log(obj5);

// how do values comes from database 
// we generally see that objects are inserted in array (called as array of objects)
const users = [
    {
        id:1,
        name:"Tanish"
    },
    {
        id:2,
        name:"Achin"
    },
    {
        id:3,
        name:"Abhishek"
    }
] 
// how to access the values of the above array 
console.log("Accesing something which looks like it has come fromm dataset");
console.log(users[0].name)


// How to access all the keys of an object 
console.log("Keys of an Object")
console.log(Object.keys(TinderUser)) // this gives result in array form [ 'name', 'id', 'isLoggedin' ]

//similarly we can access all values 
console.log("values of an Object")
console.log(Object.values(TinderUser));

// we can use entries() to see values as well as keys at the same time 
console.log("entries of an Object")
console.log(Object.entries(TinderUser));
// gives result in this form [ [ 'name', 'Tanish' ], [ 'id', 102316041 ], [ 'isLoggedin', true ] ]

// how to chek if a perticuar key exist in the object or not 
console.log(TinderUser.hasOwnProperty('isLoggedin')) // return ture or false

//DESTRUCTURING
const course  = {
    coursename:"JavaScript",
    Price:"999",
    courseInstructor:"Tanish"
}

// now if we wnat to access the info related to cource ..say we want to access name of instructor 
// then we need to write every time 
console.log("printing info before any shorcut");
console.log(course.courseInstructor);
// but every time writing course.something is too much 
// hence we introduce more efficient way to do this 
const {courseInstructor} = course 
// SYNTAX
// const{WHAT TO BE EXTRACTED : new name to be given}  = FROM WHERE DO WE NEED TO EXTRACT
console.log("printing info after applying shortcut") 
console.log(courseInstructor)

const{courseInstructor:inst} = course // this is DESTRUCTURING 
console.log("after making the name short");
console.log(inst)

/* ********************************** API **********************************************
An API (Application Programming Interface) is a way for two software programs to communicate with each other.
Think of it like a waiter in a restaurant:

You (client/app) place an order
Waiter (API) takes the request
Kitchen (server/database) prepares it
Waiter brings back the response

here waiter brings response in the form of json file 
which looks something like this 
{
    "name": "Tanish",
    "age": 21
}
    some times we receive data in this form 
[
  {
    "name": "Tanish",
    "age": 21
  }
]
  that is object type thing present in array 
*/ 



