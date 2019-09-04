/* The for principles of "this";
 * in your own words. explain the four principle for the "this" keyword below.
 *
 * 1. Global Binding - this used without any local context, so it refers to the window or console
 * 2. Implicit Binding - this used within an object, so it refers to the object
 * 3. New Binding - this used within a constructor function, so it refers to the object created by calling the constructor
 * 4. Explicit Binding - this overridden by .call, .apply, or .bind, so it refers to the object passed to those functions
 *
 * write out a code example of each explanation above
 */

console.log("\nthis.js\n\n");

// Principle 1
// code example for Window Binding
console.log(this);

// Principle 2
// code example for Implicit Binding
const ravi = {
  name: "Ravi",
  sound: "mrooow!",
  speak: function() {
    return `${this.name} says ${this.sound}`;
  }
};
console.log(ravi.speak());

// Principle 3
// code example for New Binding
function Person(obj) {
  this.name = obj.name;
  this.age = obj.age;
  this.speak = function() {
    return `My name is ${this.name}, and I am ${this.age} years old.`;
  };
}

const madeline = new Person({ name: "Madeline", age: 24 });
console.log(madeline.speak());

// Principle 4
// code example for Explicit Binding
const patrick = new Person({ name: "Patrick", age: 28 });
console.log(`${patrick.name} speaking:`);
console.log(patrick.speak());
console.log(`${patrick.name} speaking for ${madeline.name}:`);
console.log(patrick.speak.call(madeline));
