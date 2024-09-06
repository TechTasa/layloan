const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const blog_controller = require('../controllers/blogController');

router.get('', blog_controller.blog_list);
router.get('/create', blog_controller.blog_create_get);
router.post('/create',  upload.single('image'), blog_controller.blog_create_post);
router.get('/edit/:id', blog_controller.blog_edit_get);
router.post('/edit/:id', upload.single('image'),blog_controller.blog_edit_post);
router.get('/delete/:id', blog_controller.blog_delete);
module.exports = router;
