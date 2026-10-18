// there are two ways to declare the objects 
// 1st literal 
// 2nd constructor 
// when we make from constructor the signgleton object is formed (that there is no other oject like it means it is unique) but is we make object in some other way then multiple instamce can be fromed 

// so when ever we declare the objects as litrals then singleton is not formed 

// declaring object as object litrals 
const jsuser = {
    name: "Tanish", // key: value (system process key as string)
    age: 18,
    location: "Gurugram",
    email: "tgupta_be23@thapar.edu",
    isLoggedIn: false,
    lastLoggedIn:["Monday","wednessday"]
}
// if we would have written Object.creat to create the object then that would be called as constructor method to create the object in whic singleton would have formed 

// how to access the valeus of object 
console.log(jsuser.name)
// another way to access the values
console.log(jsuser["name"])
// how to declare symbol and use it in object as symbol 
const symb = Symbol("tan")
const tanish = {
    name: "Tanish", // key: value (system process key as string)
    age: 18,
    location: "Gurugram",
    [symb] : "tan" , // this helps us to create the symbol in object 
    email: "tgupta_be23@thapar.edu",
    isLoggedIn: false,
    lastLoggedIn:["Monday","wednessday"]
}

// first delare the symbol above and then use it in object by applying square brackets around it 
console.log(tan[symb])

// since it is non primitive datatype hence we can chnge ethe values in it 
console.log(`mail before making changes ${tan.email}`)
tan.email = "tanish2806@gamil.com"
console.log(`mail after making changes ${tan.email}`) 

tan.greeting = function(){
    console.log("hi bro")
}
tan.greeting1 = function(){
    console.log(`hi ${this.name} how are you`) // here we use this to reffer the same object 
}
// if we want that from next time no one can change the values of it then we can freeze the values 
Object.freeze(tan) // ater this we cannot make any changes in it 
console.log(tan)
console.log(tan.greeting())
console.log(tan.greeting1())

