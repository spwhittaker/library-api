const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('isemail');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    validate: [isEmail.validate, 'Invalid email address'],
  },
  password: String,
});

userSchema.pre('save', function encryptPassword(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    bcrypt.hash(this.password, 10, (error, hash) => {
      if (error) {
        next(error);
      } else {
        this.password = hash;
        return next();
      }
    });
  }
});

userSchema.methods.sanitise = function() {
  const { password, ...rest } = this.toObject();

  return rest;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
