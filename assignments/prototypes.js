/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/
function GameObject(obj) {
  this.createdAt = obj.createdAt;
  this.name = obj.name;
  this.dimensions = obj.dimensions;
}

GameObject.prototype.destroy = function() {
  console.log(`${this.name} was removed from the game.`);
};

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/
function CharacterStats(obj) {
  GameObject.call(this, obj);
  this.healthPoints = obj.healthPoints;
}

CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function(damage) {
  this.healthPoints -= damage;

  console.log(`${this.name} took ${damage} damage!`);
  if (this.healthPoints < 0) {
    console.log(`${this.name}'s health has dropped below zero!`);
  } else {
    console.log(`${this.name} has ${this.healthPoints} health remaining.`);
  }
  if (this.healthPoints <= 0) {
    this.destroy();
  }
};

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

function Humanoid(obj) {
  CharacterStats.call(this, obj);
  this.team = obj.team;
  this.weapons = obj.weapons;
  this.language = obj.language;
}

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}.`;
};

/*
 * Inheritance chain: GameObject -> CharacterStats -> Humanoid
 * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
 * Instances of CharacterStats should have all of the same properties as GameObject.
 */

// Test you work by un-commenting these 3 objects and the list of console logs below:

const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1
  },
  healthPoints: 5,
  name: "Bruce",
  team: "Mage Guild",
  weapons: ["Staff of Shamalama"],
  language: "Common Tongue"
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2
  },
  healthPoints: 15,
  name: "Sir Mustachio",
  team: "The Round Table",
  weapons: ["Giant Sword", "Shield"],
  language: "Common Tongue"
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 10,
  name: "Lilith",
  team: "Forest Kingdom",
  weapons: ["Bow", "Dagger"],
  language: "Elvish"
});

console.log("\n\n\nprototypes.js\n\n");

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.

// Stretch task:
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.
// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villain and one a hero and fight it out with methods!

// HERO
function Hero(obj) {
  Humanoid.call(this, obj);
}

Hero.prototype = Object.create(Humanoid.prototype);

Hero.prototype.attack = function(target, damage) {
  console.log(
    `Heroic ${this.name} uses ${this.weapons} to attack ${
      target.name
    }! What a fine day!`
  );
  target.takeDamage(damage);
  if (target.healthPoints <= 0) {
    console.log(`${this.name} has defeated ${target.name}! Tremendous!!`);
  }
};

// VILLAIN
function Villain(obj) {
  Humanoid.call(this, obj);
}

Villain.prototype = Object.create(Humanoid.prototype);

Villain.prototype.attack = function(target, damage) {
  console.log(
    `Villainous ${this.name} uses ${this.weapons} to attack ${
      target.name
    }! How horrible!`
  );
  target.takeDamage(damage);
  if (target.healthPoints <= 0) {
    console.log(`${this.name} has defeated ${target.name}! What a tragedy!!`);
  }
};

// Create hero
const thor = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 4
  },
  healthPoints: 100,
  name: "Thor",
  team: "Asgard",
  weapons: ["Mjolnir"],
  language: "Common Tongue"
});

// Create villain
const loki = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 4
  },
  healthPoints: 90,
  name: "Loki",
  team: "Mage Guild",
  weapons: ["Scepter"],
  language: "Common Tongue"
});

console.log("\n\n");

// THOR VS LOKI BATTLE BEGINS
console.log(`${thor.name} and ${loki.name} begin to do battle!`);
console.log(`${loki.name} starting health: ${loki.healthPoints}.`);
console.log(`${thor.name} starting health: ${thor.healthPoints}.`);
console.log("\n");

thor.attack(loki, 50);
console.log("\n");

loki.attack(thor, 30);
console.log("\n");

thor.attack(loki, 50);
