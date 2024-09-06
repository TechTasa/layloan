const Job = require('../models/Job');
const Resume = require('../models/Resume');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');


const storage = multer.diskStorage({
  destination: 'uploads/resume',
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return cb(err);
      
      cb(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
});

const upload = multer({ storage: storage });


exports.getCareerPage = async (req, res) => {
  const jobs = await Job.find();
  const loggedin=req.session.user;
  res.render('career', { jobs: jobs ,loggedin});
};

exports.getApplyPage = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.render('careerapply', { job: job });
};


exports.applyForJob = [upload.single('document'), async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Check the file type
  const fileType = path.extname(req.file.originalname).toLowerCase();
  if (fileType !== '.pdf') {
    return res.status(400).send('Invalid file type. Only PDF files are allowed.');
  }

  const resume = new Resume({ ...req.body, document: req.file.path, job: req.params.id });
  await resume.save();res.status(201).send(`
  <html>
  <style>
  
@supports (animation: grow .5s cubic-bezier(.25, .25, .25, 1) forwards) {
  .tick {
     stroke-opacity: 0;
     stroke-dasharray: 29px;
     stroke-dashoffset: 29px;
     animation: draw .5s cubic-bezier(.25, .25, .25, 1) forwards;
     animation-delay: .6s
 }

 .circle {
     fill-opacity: 0;
     stroke: #219a00;
     stroke-width: 16px;
     transform-origin: center;
     transform: scale(0);
     animation: grow 1s cubic-bezier(.25, .25, .25, 1.25) forwards;   
 }   
}

@keyframes grow {
 60% {
     transform: scale(.8);
     stroke-width: 4px;
     fill-opacity: 0;
 }
 100% {
     transform: scale(.9);
     stroke-width: 8px;
     fill-opacity: 1;
     fill: #219a00;
 }
}

@keyframes draw {
 0%, 100% { stroke-opacity: 1; }
 100% { stroke-dashoffset: 0; }
}








// Styles
:root {
--theme-color: var(--color-purple);
}
*{
  margin:0;
 padding:0;
 box-sizing:border-box;
}
body{
 margin:0;
 padding:0;
 box-sizing:border-box;
 overflow:hidden;
 height: 100vh;
 width:100vw;
}
.svg-container{
 box-sizing:border-box;
 
 height: 100vh;
 width:100vw;
margin:0;
 padding:0;
 display: flex;
 flex-direction:column;
 justify-content: center;
 align-items: center;
}
  </style>
    <body>
    <div class="svg-container">    
    <svg class="ft-green-tick" xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 48 48" aria-hidden="true">
        <circle class="circle" fill="#5bb543" cx="24" cy="24" r="22"/>
        <path class="tick" fill="none" stroke="#FFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M14 27l5.917 4.917L34 17"/>
    </svg>
    <p>Your job application has been submitted successfully <p>
</div>
      <script>
        setTimeout(function(){
          window.location.href = '/';
        }, 2500);
      </script>
    </body>
  </html>
`);
}];

