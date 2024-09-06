const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

router.get('/', resumeController.getResumes);
router.get('/delete/:id', resumeController.deleteResume);
router.get('/view/:id', resumeController.getResume);
module.exports = router;
