const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');

// ...

router.get('/', careerController.getCareerPage);
router.get('/apply/:id', careerController.getApplyPage);
router.post('/apply/:id', careerController.applyForJob);
module.exports = router;
