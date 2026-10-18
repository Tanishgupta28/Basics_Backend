// let myName = "hitesh     "
// let mychannel = "chai     "

// console.log(myName.trueLength);
// suppose we want to make a method inside prototype where if i write trueLength then it 
// gives lengt without considereing spaces 
// bacuse if we only write console.log(myName.length) then it gives 11 as ans 

let myHeros = ["thor", "spiderman"]

let heroPower = {
    thor: "hammer",
    spiderman: "sling",
    getSpiderPower: function(){
        console.log(`Spidy power is ${this.spiderman}`);
    }
}

Object.prototype.hitesh = function(){
    console.log(`hitesh is present in all objects`);
}
// since every thing in js is ann object so we introduc a method inside the object prototype 
// then it can be applied to any thing in js

Array.prototype.heyHitesh = function(){
    console.log(`Hitesh says hello`);
}
// if we insert method in specific thing's prototype then that method can be ascesed by only that 
// data structure

// heroPower.hitesh()
// myHeros.hitesh()
// myHeros.heyHitesh()
// heroPower.heyHitesh()

// inheritance

const User = {
    name: "chai",
    email: "chai@google.com"
}

const Teacher = {
    makeVideo: true
}

const TeachingSupport = {
    isAvailable: false
}

const TASupport = {
    makeAssignment: 'JS assignment',
    fullTime: true,
    __proto__: TeachingSupport
}

Teacher.__proto__ = User
// basicaaly if we wnat to inser the methods of one things' prototype into anither then we use 
//__proto__ or setPrototypeOf(thing in whichwe want to inser, thing whose we wnat to insert)
// modern syntax
Object.setPrototypeOf(TeachingSupport, Teacher)

let anotherUsername = "ChaiAurCode     "

String.prototype.trueLength = function(){
    console.log(`${this}`);
    console.log(`True length is: ${this.trim().length}`);
}

anotherUsername.trueLength()
"hitesh".trueLength()
"iceTea".trueLength()