const Job = require('../models/Job');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');


const storage = multer.diskStorage({
  destination: 'uploads/jobdocs',
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return cb(err);
      
      cb(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
});

const upload = multer({ storage: storage });


exports.getJobs = async (req, res) => {
  // Check if user is logged in
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }

  const jobs = await Job.find();
  const userType=req.session.user.userType
  res.render('jobs', { jobs: jobs ,userType });
};

exports.createJob = [upload.single('document'), async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  // Check if user is logged in
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  // Check the file type
  const fileType = path.extname(req.file.originalname).toLowerCase();
  if (fileType !== '.pdf') {
    return res.status(400).send('Invalid file type. Only PDF files are allowed.');
  }
  const job = new Job({ ...req.body, document: req.file.path});
  await job.save();
  res.redirect('/dashboard/jobs');
}];

exports.getCreateJob = (req, res) => {
  // Check if user is logged in
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  const userType=req.session.user.userType
  res.render('createJob', { userType });
};

exports.editJob = async (req, res) => {
  // Check if user is logged in
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).send('Job not found');
    }
    const userType=req.session.user.userType
    res.render('editJob', { job: job,userType });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateJob =[upload.single('document'),  async (req, res) => {
  // Check if user is logged in
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }

  // Validate job ID presence in params
  if (!req.params.id) {
    return res.status(400).send('Missing job ID');
  }

  try {
    const updateData = req.body;
    console.log(updateData);
    // Handle file upload (optional):
    if (req.file) {
      // Check the file type
      const fileType = path.extname(req.file.originalname).toLowerCase();
      if (fileType !== '.pdf') {
        return res.status(400).send('Invalid file type. Only PDF files are allowed.');
      }

      // Update document path if a new file is uploaded
      updateData.document = req.file.path;
    }

    // Perform update using findByIdAndUpdate with options
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true } // Return updated doc and perform validation
    );
    if (!updatedJob) {
      return res.status(404).send('Job not found');
    }

    res.redirect('/dashboard/jobs'); // Or send success response with updated job data
  } catch (err) {
    console.error(err.message); // Log error for debugging
    res.status(500).send('Error updating job');
  }
}];

exports.deleteJob = async (req, res) => {
  // Check if user is logged in
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).send('Job not found');
    }
    res.redirect('/dashboard/jobs');
  } catch (err) {
    res.status(500).send(err.message);
  }
};