process.env.MONGODB_URI = 'mongodb+srv://onuryasar91:ADhH9XSsgXVutRi1@fittrackapp.mwqqxfa.mongodb.net/?retryWrites=true&w=majority&appName=FitTrackApp';
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

console.log('MONGODB_URI:', process.env.MONGODB_URI);

describe('User Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create & save user successfully', async () => {
    const userData = { email: 'unit@test.com', password: '123456', name: 'Unit Test' };
    const user = new User(userData);
    const savedUser = await user.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.name).toBe(userData.name);
  });

  it('should find the created user', async () => {
    const found = await User.findOne({ email: 'unit@test.com' });
    expect(found).not.toBeNull();
    expect(found.name).toBe('Unit Test');
  });

  it('should delete the created user', async () => {
    const deleted = await User.deleteOne({ email: 'unit@test.com' });
    expect(deleted.deletedCount).toBe(1);
  });
}); 