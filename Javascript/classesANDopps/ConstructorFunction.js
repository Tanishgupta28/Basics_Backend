// earler we saw
const promiseOne = new Promise();
//or 
const date = new Date();

/*
Here "new" is constructor function => it helps us to make multiple instances from
single object literal
so whenever we make a new instances, the value of previous instance does not get effected

SO WHENEVR WE WRITE NEW 
1) a new object is created 
2) construtor function is called which paases all the properties inside this new object

 */

function User(username, loginCount, isLoggedIn){
    this.username = username;
    this.loginCount = loginCount;
    this.isLoggedIn = isLoggedIn

    this.greeting = function(){
        console.log(`Welcome ${this.username}`);

    }

    return this
}

const userOne = new User("hitesh", 12, true)
const userTwo = new User("ChaiAurCode", 11, false)