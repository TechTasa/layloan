const express = require('express');
const leadsController = require('../controllers/leadsController');

const router = express.Router();

router.get('/', leadsController.getLeads);
router.get('/:leadType', leadsController.getLeadsByType); 
router.post('/assign-lead', leadsController.assignLead);
router.post('/update-status', leadsController.updateLeadStatus); // Add this new route

module.exports = router;