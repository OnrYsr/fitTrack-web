console.log('MONGODB_URI:', process.env.MONGODB_URI);
process.env.MONGODB_URI = 'mongodb+srv://onuryasar91:ADhH9XSsgXVutRi1@fittrackapp.mwqqxfa.mongodb.net/?retryWrites=true&w=majority&appName=FitTrackApp';

const mongoose = require('mongoose');
const User = require('../models/User');
const Doc = require('../models/Doc');
const Meal = require('../models/Meal');
const Water = require('../models/Water');
const Goal = require('../models/Goal');

describe('Tüm ana modellerden kayıt oluşturma ve kontrol', () => {
  let user, doc, meal, water, goal;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('User kaydı oluşturulmalı ve bulunmalı', async () => {
    user = await User.create({ email: 'integration@test.com', password: '123456', name: 'Integration User' });
    const found = await User.findOne({ email: 'integration@test.com' });
    expect(found).not.toBeNull();
    expect(found.name).toBe('Integration User');
  });

  it('Doc kaydı oluşturulmalı ve bulunmalı', async () => {
    doc = await Doc.create({ type: 'help', title: 'Test Doc', content: 'Test Content' });
    const found = await Doc.findOne({ title: 'Test Doc' });
    expect(found).not.toBeNull();
    expect(found.content).toBe('Test Content');
  });

  it('Meal kaydı oluşturulmalı ve bulunmalı', async () => {
    meal = await Meal.create({ user: user._id, name: 'Test Meal', calories: 500 });
    const found = await Meal.findOne({ name: 'Test Meal' });
    expect(found).not.toBeNull();
    expect(found.calories).toBe(500);
  });

  it('Water kaydı oluşturulmalı ve bulunmalı', async () => {
    water = await Water.create({ user: user._id, amount: 2 });
    const found = await Water.findOne({ user: user._id });
    expect(found).not.toBeNull();
    expect(found.amount).toBe(2);
  });

  it('Goal kaydı oluşturulmalı ve bulunmalı', async () => {
    goal = await Goal.create({ user: user._id, calories: 2000, water: 2000 });
    const found = await Goal.findOne({ user: user._id, calories: 2000 });
    expect(found).not.toBeNull();
    expect(found.water).toBe(2000);
  });
}); 