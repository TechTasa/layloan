const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/verify-phone', authController.verifyPhone);
router.post('/confirm-payment', authController.confirmPayment);

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login');
});

// New route for the payment page
router.get('/payment', (req, res) => {
  if (!req.session.tempUser) {
    return res.redirect('/auth/signup');
  }
  res.render('payment', { tempUser: req.session.tempUser }); 
});
router.get('/payment-confirmed', (req, res) => {
  res.render('paymentConfirmed'); // Render the payment page
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.redirect('/');
      }
      res.clearCookie('sid');
      res.redirect('/');
    });
});

module.exports = router;