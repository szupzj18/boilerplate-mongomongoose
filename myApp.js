require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser : true, useUnifiedTopology: true});
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name : {type: String, required: true},
  age : Number,
  favouriteFoods: [String]
});
let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  var janeFonda = new Person({name: "Jane Fonda", age : 88, favouriteFoods: ['egg', 'fish', 'fresh fruit']});
  janeFonda.save((error, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
  done(null /*, data*/);
};

var arrayOfPeople = [
  {name:"Chris", age: 65, favouriteFoods: ['roast chicken']},
  {name:"John", age: 15, favouriteFoods: ['Pizza', 'noodles']},
  {name:"Lisa", age: 19, favouriteFoods: ['french fires', 'bagel']},
  {name:"Wilson", age: 21, favouriteFoods: ['chicken wings', 'salad']},
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.log(err);
    done(null, people);
  });
  done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, person) => {
    if (err) return console.log(err);
    done(null, person);
  });
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  Person.findOne({favouriteFoods:[bagel]}, (err, people) => {
    if (err) return console.log(err);
    done(null, people);
  });
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);
    done(null, person);
  });
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId, (err, person) => {
    if (err) return console.log(err);
    person.favouriteFoods.push(foodToAdd);
    person.save((err, person) => {
      if (err) return console.log(err);
      done(null, person);
    });
  })
  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  // update person age feild by name.
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, (err, person) => {
    if (err) console.log(err);
    done(null, person);
  }, {new: true});
  done(null /*, data*/);
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) console.log(err);
    done(null, removedDoc)
  });
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  var personToRemove = new Person({name: nameToRemove });
  personToRemove.remove({name: nameToRemove }, (err, response) => {
    if (err) return console.log(err);
    done(null, response);
  });
  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favouriteFoods:[foodToSearch]})
  .sort({age: -1})
  .limit(2)
  .select({name: 0, age: 1})
  .exec((err, res) => {
    if (err) console.log(err);
    done(null, res);
  });
  done(null /*, data*/);
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
