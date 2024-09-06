const Resume = require('../models/Resume');

exports.getResumes = async (req, res) => {
  const resumes = await Resume.find().populate('job');
  const userType=req.session.user.userType
  res.render('resumes', { resumes: resumes,userType });
};

exports.getResume = async (req, res) => {
  const resume = await Resume.findById(req.params.id).populate('job');
  const userType=req.session.user.userType
  res.render('resume', { resume: resume,userType });
};


exports.deleteResume = async (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/auth/login');
    }     
    try {
      const resume = await Resume.findByIdAndDelete(req.params.id);
      if (!resume) {
        return res.status(404).send('Resume not found');
      }
      res.redirect('/dashboard/resume');
    } catch (err) {
      next(err);
    }
  };
  
