const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');
const User = require('../../src/models/user.model');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  isEmailVerified: false,
  mfaEnabled: false,
};

const userTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  isEmailVerified: false,
  mfaEnabled: false,
};

const admin = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'admin',
  isEmailVerified: false,
  mfaEnabled: false,
};

/**
 * Generate an array of random, valid users.
 * @param {number} num Number of users to generate.
 * @param {obj} userOverrides Objects of overrides to the default users object. Example: {role:'admin'} would set all users to admin.
 * @returns array
 */
const genRandomUsers = async (num, userOverrides = {}) => {
  const users = [];
  while (users.length < num) {
    const user = {
      _id: mongoose.Types.ObjectId(),
      name: faker.name.findName(),
      email: faker.internet.email().toLowerCase(),
      password,
      role: 'user',
      isEmailVerified: false,
      mfaEnabled: false,
    };

    Object.assign(user, userOverrides);

    users.push(user);
  }
  return users;
};

const insertUsers = async (users) => {
  await User.insertMany(users.map((user) => ({ ...user, password: hashedPassword })));
};

module.exports = {
  userOne,
  userTwo,
  admin,
  insertUsers,
  genRandomUsers,
};
