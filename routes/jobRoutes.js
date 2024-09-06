const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.get('/', jobController.getJobs);
router.get('/create', jobController.getCreateJob);
router.get('/delete/:id', jobController.deleteJob);
router.post('/create', jobController.createJob);
router.get('/edit/:id', jobController.editJob);
router.post('/edit/:id', jobController.updateJob);
module.exports = router;
