const arr = [1,2,3,4,5]
// but it can contain element of different datatype 
const ar = [1,2,3,"Tanish", true];
// arrays are resizable 

// accessing the elements in array 
console.log(ar[3]); // here there is zero indexing 
// arrays coppy operations create shallow coppy 
// SHALLOW COPY -> copy of array is such that is copy by refference (that what evr we will change
// will change in the orogiinal array -> non primitive data type) 

// DEEP COPY -> here while copieng the refrence is not coppied hence here when we chnage something then it do not affects the original datastructure 

// another way to declare array 
const arar = new Array(1,2,3,4,5);
console.log(arar)

//METHODS

// 1) push -> used to push element in the array 
console.log(`Array before pushing element ${arr}`)
arr.push("Gupta")
console.log(`Array after pushing "Gupta" ${arr}`)

// 2) pop -> used to pop element in the array 
console.log(`Array before poping element ${arr}`)
arr.pop()
console.log(`Array after poping ${arr}`)

// 3) unshift -> used to insert element in the starting of array 
console.log(`Array before unshifting element ${arr}`)
arr.unshift("Gupta")
console.log(`Array after unshifting ${arr}`)

// 4) shift -> used to remove element in the starting of array 
console.log(`Array before shifting element ${arr}`)
arr.shift()
console.log(`Array after shifting ${arr}`)

// 5) includes -> used to check if element is present in array or not
console.log(`Array contains "Tanish" -> ${arr.includes("Tanish")}`)
console.log(`Array contains 1 -> ${arr.includes(1)}`)
// return true or false 

// 6) indexof -> used to check element's index in array 
console.log(`index of 5 in array -> ${arr.indexOf(5)}`)
// return index number

// 7) join->bindes that array into single element and bring it in the form of string 
console.log(`Arra before join ${arr}`)
const newarr = arr.join();
console.log(`array after join ${newarr}`)
console.log(`type of array after applying join ${typeof newarr}`) // gives string

// SLICE SPLICE
const myn1 = arr.slice(1,3); // satr from index 1 and do not include index 3 and include every thing befrore that 
console.log(myn1)
const myn2 = arr.splice(1,3); // start from index 1 and include index 3 and include every thing before that also remove those chich are selected rom thje original array 
// (mnipulates the origina array )
console.log(myn2)
console.log(arr)



