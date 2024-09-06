const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
    referral_code: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 }
});

const Referral = mongoose.model('Referral', referralSchema);
module.exports = Referral;