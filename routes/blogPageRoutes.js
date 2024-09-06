const express = require('express');
const router = express.Router();
const blogPageController = require('../controllers/blogPageController');

router.get('/', blogPageController.blog_index);
router.get('/:id', blogPageController.blog_detail);

module.exports = router;
