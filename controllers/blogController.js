const Blog = require('../models/Blog');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.blog_list = async function(req, res) {
    let blogs = await Blog.find({}, 'title author');
    const userType=req.session.user.userType;
    res.render('blogList', { blogs: blogs,userType });
};


exports.blog_create_get = function(req, res) {
    const userType=req.session.user.userType
  const userName=req.session.user.username
    res.render('blogCreate',{ userType,userName });
};

exports.blog_create_post = async function(req, res) {
    console.log(req.body);
    const blog = new Blog({
        ...req.body,
        image: req.file ? req.file.path : null,  // Check if file is provided
    });
    await blog.save()
    res.redirect('/dashboard/blog');
};


exports.blog_edit_get = async function(req, res) {
    let blog = await Blog.findById(req.params.id);
    const userType=req.session.user.userType
    res.render('blogEdit', { blog: blog ,userType   });
};

exports.blog_edit_post = async function(req, res) {
    let blogData = {...req.body};
    if (req.file) {
        blogData.image = req.file.path;
    }
    let blog = await Blog.findByIdAndUpdate(req.params.id, blogData, { new: true });
    res.redirect('/dashboard/blog');
};


exports.blog_delete = async function(req, res) {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard/blog');
};