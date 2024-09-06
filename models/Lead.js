const mongoose = require('mongoose');
const User = require('../models/User');
const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name']
  },
  email: {
    type: String,
    required: [true, 'Please provide email']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'No User Logged In'],
    validate: {
      validator: async function (value) {
        const user = await User.findById(value);
        if (!user || user.userType !== 'customer' && user.userType !== 'broker') {
          throw new Error('Only customers & brokers are allowed');
        }
      },
      message: 'Only customers are allowed'
    }
  },
  number: {
    type: String,
    required: [true, 'Please provide number']
  },
  salary: {
    type: Number,
    required: [true, 'Please provide salary']
  },
  address: {
    type: String,
    required: [true, 'Please provide address']
  },
  timeToReach: {
    type: String,
    required: [true, 'Please provide time for when we can reach you']
  },
  reachBy: {
    type: String,
    enum: ['email', 'phone'],
    required: [true, 'Please provide how we can reach you']
  },
  companyName: {
    type: String,
  },
  leadType: {
    type: String,
    enum: ['creditcard', 'personalloan', 'microloan', 'businessloan', 'homeloan', 'automobileloan', 'educationloan', 'propertyloan', 'productloan', 'serviceloan', 'insurance','terminsurance','healthinsurance','returnplan','mutualfund','automobileinsurance','propertyinsurance','productinsurance'],
    required: [true, 'Please provide type of lead']
  },
  documents: {
    type: Object,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'done', 'rejected', 'on_hold'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Lead', LeadSchema);
