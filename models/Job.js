const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  document:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model('Job', JobSchema);
