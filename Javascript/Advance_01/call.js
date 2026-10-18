function SetUsername(username){
    //complex DB calls
    this.username = username
    console.log("called");
}

function createUser(username, email, password){
    SetUsername.call(this, username)
    // if we woulr have written just
    // SetUserneame(username) 
    // then in js this means functions is called and its will be eleminated from execution context
    // as soon as executed so we use call to let it say in execution context and we use this 
    // to make this execution context to pass to the main fuction 
    this.email = email
    this.password = password
}

const chai = new createUser("chai", "chai@fb.com", "123")
console.log(chai);