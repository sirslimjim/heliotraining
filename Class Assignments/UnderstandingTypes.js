/*
For this assignment you'll need to concatenate (add together) your first name and last name into a string.  Assign the result of the string concatenation to a variable: name 
Add two numbers together, and assign the result in a variable: calculation 
Add a number and a string together. Store the result in a variable: unexpected 
What happened?  Why?

*/
//Question 1
let firstName = 'Eric';
let lastName  = 'Garner';
let name = `${firstName} ${lastName}`;
console.log(name);

//Question 2
let calculation = 5 + 6
console.log(calculation);


//Question 3

let unexpected = "Helio Training" + 1;
console.log(unexpected);
console.log(typeof unexpected);

// The resulting value gets converted to a string