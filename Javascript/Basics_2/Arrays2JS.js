const my_name = ["Tanish","Gupta"]
const my_friends = ["Achin","Agarwal","Abhishek","Gupta","Deb","Mondal"];
my_friends.push(my_name);
console.log(my_friends) // here there is problem that here
// //[
//   'Achin',
//   'Agarwal',
//   'Abhishek',
//   'Gupta',
//   'Deb',
//   'Mondal',
//   [ 'Tanish', 'Gupta' ]
// this kind or result is obtained that array within array ... but here we wnated to merge two arrays 
// this happened becase array can take any type of data type within it so it took array too 

// So for this we use concat 
const my_nam = ["Tanish","Gupta"]
const my_friend = ["Achin","Agarwal","Abhishek","Gupta","Deb","Mondal"];
const info = my_friend.concat(my_nam)
console.log(info); // so this will give this result ['Achin','Agarwal','Abhishek','Gupta','Deb','Mondal','Tanish','Gupta']


// spread -> glass of water is droped then what happens ..whater gets spread!
// we can use to spread elements of array into individual elements
// we use it by using ... in front of array name 
const tan = [...my_nam,...my_friend];
console.log(`After applying spread -> ${tan}`);
console.log(typeof(tan)) // type of an array is object 

// say we have an array which has array inside array that is not 1d then we can convert it into flattened dimention array 

const new_array = [1,2,2,3,4,[1,2,3],4,5,6,[1,2,3,[4,5,6]]]
const real_new_array = new_array.flat(2); // here 3 sgnifies that upto whic depth do it need to flatten the array 
console.log(`array before flatten`)
console.log(new_array)
console.log(`array after flatten`)
console.log(real_new_array)


// HOw to convert something in array fromat 
console.log(Array.isArray("Tanish")) // here we are asking that weather this is array or not gives false 
console.log(Array.from("Tanish")) // this can convert any thing into array [ 'T', 'a', 'n', 'i', 's', 'h' ]

let var1 = 100;
let var2 = 200;
let var3 = 300;

console.log(Array.of(var1,var2,var3)); // give [ 100, 200, 300 ]