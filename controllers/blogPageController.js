const Blog = require('../models/Blog');

exports.blog_index = async function(req, res) {
    let blogs = await Blog.find({}, 'title image');
    const loggedin=req.session.user;
    res.render('blogPageIndex', { blogs: blogs,loggedin });
};

exports.blog_detail = async function(req, res) {
    let blog = await Blog.findById(req.params.id);
    const loggedin=req.session.user;
    res.render('blogPageDetail', { blog: blog,loggedin });
};
