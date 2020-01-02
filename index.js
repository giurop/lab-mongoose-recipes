const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// all inside a promise all
// could leave one inside the other THEN or promise all

// Creation of a recipe

let pr1 = Recipe.create({
    title: 'Midnight Munchies',
    level: 'Easy Peasy',
    ingredients: ['bread', 'sugar', 'milk', 'chocolate', 'eggs'],
    cuisine: 'trashy',
    dishType: 'Snack',
    duration: 15,
    creator: 'Giulia',
  })
  .then(recipeCreated => console.log(recipeCreated.title))
  .catch(err => console.error('Error creating recipe', err));

// adding all data to the database

let pr2 = Recipe.insertMany(data)
  .then(oneRecipe => console.log(oneRecipe.title))
  .catch(err => console.error('Error importing data', err));

// Update Rigatonis duration

let pr3 = Recipe.findOneAndUpdate({
    title: 'Rigatoni alla Genovese'
  }, {
    duration: 100
  })
  .then(_ => console.log('All good! Recipe updated'))
  .catch(err => console.error('Error when updating recipe', err));

// Delete carrot cake

let pr4 = Recipe.deleteOne({
    title: 'Carrot Cake'
  })
  .then(_ => console.log('Carrot cake deleted'))
  .catch(err => console.error('Error deleting carrot cake', err));

  Promise.all([pr1, pr2, pr3, pr4])
  .then(_ => mongoose.connection.close())
  .catch(err => console.error('Error when promising all', err));