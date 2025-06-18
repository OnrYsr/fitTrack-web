require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Doc = require('../models/Doc');
const Meal = require('../models/Meal');
const Water = require('../models/Water');
const Goal = require('../models/Goal');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  // 1. User
  const user = await User.create({ email: 'produser@fittrack.com', password: '123456', name: 'Prod User' });

  // 2. Doc
  await Doc.create({ type: 'help', title: 'Prod Doc', content: 'Prod ortamı için örnek döküman.' });

  // 3. Meal
  await Meal.create({ user: user._id, name: 'Prod Meal', calories: 600 });

  // 4. Water
  await Water.create({ user: user._id, amount: 3 });

  // 5. Goal
  await Goal.create({ user: user._id, calories: 2200, water: 2500 });

  console.log('Prod ortamı için örnek veriler başarıyla eklendi!');
  await mongoose.connection.close();
}

seed(); 