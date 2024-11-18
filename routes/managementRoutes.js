const express = require('express');
const managementController = require('../controllers/managementController');

const router = express.Router();

router.post('/create', managementController.createUser);

router.get('/create', (req, res) => {
    // Check if user is logged in
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  const userType=req.session.user.userType
    res.render('createmanagement',{userType});
});

router.get('/', managementController.getUsers);
router.get('/edit/:userId', managementController.editUser);
router.post('/edit/:userId', managementController.updateUser);
router.get('/delete/:userId', managementController.deleteUser);

router.get('/confirm-payment/:userId', managementController.confirmPayment);
// Add this to your managementRoutes.js
router.post('/update-payment/:userId', managementController.updatePaymentStatus);
module.exports = router;
