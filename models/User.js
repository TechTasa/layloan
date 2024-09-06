const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide username']
  },
  password: {
    type: String,
    required: [true, 'Please provide password']
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  userType: {
    type: String,
    enum: ['admin', 'agent', 'hr', 'blog writer', 'partner', 'customer', 'broker'],
    required: [true, 'Please provide user type']
  },
  leadAccess: {
    type: Array,
    default: []
  },
  referralId: {
    type: String,
    unique: true,
    sparse: true, // This allows the field to be optional
    referCount: {
      type: Number,
      default: 0
    },
  },
  referCount: {
    type: Number,
    default: 0
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  referredUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  phone: {
    type: String,
    required: [true, 'Please provide phone number']
  },
  countryCode: {
    type: String,
    required: [true, 'Please provide country code']
  }
});


UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }
      resolve(same);
    });
  });
};

module.exports = mongoose.model('User', UserSchema);
