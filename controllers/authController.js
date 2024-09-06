const User = require('../models/User');
const https = require('https');

exports.signup = async (req, res) => {
  const { username, email, password, userType, phone, countryCode, referralId } = req.body;
  try {
    // Check if a user with the provided username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.render('signup', { 
        error: 'Username or email already exists',
        formData: req.body
      });
    }
    // Check if a user with the provided phone number already exists
    const existingPhone = await User.findOne({ phone, countryCode });
    if (existingPhone) {
      return res.render('signup', { 
        error: 'Phone number already linked to another account',
        formData: req.body
      });
    }

    // Generate a referral ID for brokers
    let userReferralId;
    if (userType === 'broker') {
      userReferralId = await generateUniqueReferralId();
    }

    let referringUser = null;

    // Check and process the referral ID if provided
    if (referralId) {
      referringUser = await User.findOne({ referralId });
      if (!referringUser) {
        return res.render('signup', { 
          error: 'Invalid referral ID',
          formData: req.body
        });
      }
    }

    // Create a new user
    const newUser = await User.create({ 
      username, 
      email, 
      password, 
      userType, 
      phone, 
      countryCode,
      referralId: userReferralId,
      referCount: 0, // Initialize referCount to 0
      referredBy: referringUser ? referringUser._id : undefined
    });

    // If there's a referring user, update their referCount and referredUsers
    if (referringUser) {
      await User.findByIdAndUpdate(referringUser._id, {
        $inc: { referCount: 1 },
        $push: { referredUsers: newUser._id }
      });
    }

    req.session.user = newUser;
    res.redirect('/');
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};

// Function to generate a unique referral ID (remains the same)
async function generateUniqueReferralId() {
  while (true) {
    const referralId = require('crypto').randomBytes(4).toString('hex').toUpperCase();
    const existingUser = await User.findOne({ referralId });
    if (!existingUser) {
      return referralId;
    }
  }
}



exports.verifyPhone = (req, res) => {
  const { user_json_url } = req.body;

  https.get(user_json_url, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        const user_country_code = jsonData.user_country_code;
        const user_phone_number = jsonData.user_phone_number;

        res.json({
          success: true,
          phone: user_phone_number,
          countryCode: user_country_code
        });
      } catch (error) {
        console.error('Error parsing JSON:', error);
        res.status(500).json({ success: false, message: 'Error processing phone verification' });
      }
    });
  }).on("error", (err) => {
    console.error("Error fetching user data:", err.message);
    res.status(500).json({ success: false, message: 'Error fetching user data' });
  });
};


exports.login = async (req, res) => {
  const { usernameOrEmail, password, phone } = req.body;
  
  try {
    let user;
    
    if (phone) {
      // If phone is provided, find user by phone
      user = await User.findOne({ phone: phone });
    } else {
      // Find user by username, email, or phone
      user = await User.findOne({
        $or: [
          { username: usernameOrEmail },
          { email: usernameOrEmail },
          { phone: usernameOrEmail }
        ]
      });
    }

    if (!user) {
      return res.render('login', { 
        error: 'User not found',
        formData: req.body
      });
    }
    
    if (phone) {
      // If phone is provided, we assume OTP verification has already been done
      req.session.user = user;
      return res.redirect('/');
    }
    
    const isCorrect = await user.checkPassword(password);
    if (!isCorrect) {
      return res.render('login', { 
        error: 'Incorrect username/email/phone or password',
        formData: req.body
      });
    }
    
    req.session.user = user;
    res.redirect('/');
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
};

// exports.login = async (req, res) => {
//   const { usernameOrEmail, password } = req.body;
//   try {
//     // Find user by username, email, or phone
//     const user = await User.findOne({
//       $or: [
//         { username: usernameOrEmail },
//         { email: usernameOrEmail },
//         { phone: usernameOrEmail }
//       ]
//     });

//     if (!user) {
//       return res.status(404).json({
//         status: 'error',
//         message: 'User not found'
//       });
//     }
//     const isCorrect = await user.checkPassword(password);
//     if (!isCorrect) {
//       return res.status(400).json({
//         status: 'error',
//         message: 'Incorrect username/email/phone or password'
//       });
//     }
//     req.session.user = user;
//     res.redirect('/')
//   } catch (err) {
//     res.status(400).json({
//       status: 'error',
//       message: err.message
//     });
//   }
// };


