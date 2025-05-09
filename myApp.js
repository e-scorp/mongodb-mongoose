require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)

const personSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] }
})

let Person = mongoose.model("Person", personSchema)



const createAndSavePerson = (done) => {
  let jane = new Person({ name: "jane", age: 90, favoriteFoods: ["apple", "panner"] })
  jane.save((err, data) => {
    if (err) return console.error(err)
    done(null, data);
  })
};

let arrayOfPeople = [{ name: "jane", age: 90, favoriteFoods: ["apple", "panner"] },
{ name: "slim", age: 90, favoriteFoods: ["apple", "panner"] },
{ name: "shady", age: 90, favoriteFoods: ["apple", "panner"] }]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err)
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) return console.error(err)
    done(null, personFound);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, foodFound) => {
    if (err) return console.error(err)
    done(null, foodFound);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, idFound) => {
    if (err) return console.error(err)
    done(null, idFound);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, (err, person) => {
    if (err) return console.error(err)
    person.favoriteFoods.push(foodToAdd)
    person.save((err, updatedPerson) => {
      if (err) return console.error(err)
      done(null, updatedPerson);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updateDoc) => {
    if (err) return console.error(err)

    done(null, updateDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({ _id: personId }, (err, updateDoc) => {
    if (err) return console.error(err)
    done(null, updateDoc);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, updateDoc) => {
    if (err) return console.error(err)
    done(null, updateDoc);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch }).sort({ name: 1 }).limit(2).select({ age: 0 }).exec((err, data) => {
    if (err) return console.error(err)
    done(null, data);
  })

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
