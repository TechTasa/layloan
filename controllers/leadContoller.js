const Lead = require("../models/Lead");

exports.applyLoan = async (req, res) => {
  const {
    name,
    email,
    number,
    salary,
    address,
    companyName,
    timeToReach,
    reachBy,
    userId,
  } = req.body;
  const leadType = req.params.type;
  // const userId = req.user._id; // Get the user ID from the authenticated user


  // const pancard = req.files["pancard"][0].path; 
  // const salaryslip = req.files["salaryslip"][0].path; 
  // const companyid = req.files["companyid"][0].path; 
  // const passportSizePhoto = req.files["passportSizePhoto"][0].path; 
  // const bankStatement = req.files["bankStatement"][0].path; 
  // const offerLetter = req.files["offerLetter"][0].path; 
  // const ITR = req.files["ITR"][0].path; 
  // const companyBankStatement = req.files["companyBankStatement"][0].path; 
  // const companyAddressProof = req.files["companyAddressProof"][0].path; 

  // Create an object to hold the file paths
  const fileFields = {
    pancard: req.files["pancard"] ? req.files["pancard"][0].path : undefined,
    salaryslip: req.files["salaryslip"] ? req.files["salaryslip"][0].path : undefined,
    companyid: req.files["companyid"] ? req.files["companyid"][0].path : undefined,
    passportSizePhoto: req.files["passportSizePhoto"] ? req.files["passportSizePhoto"][0].path : undefined,
    bankStatement: req.files["bankStatement"] ? req.files["bankStatement"][0].path : undefined,
    offerLetter: req.files["offerLetter"] ? req.files["offerLetter"][0].path : undefined,
    ITR: req.files["ITR"] ? req.files["ITR"][0].path : undefined,
    companyBankStatement: req.files["companyBankStatement"] ? req.files["companyBankStatement"][0].path : undefined,
    companyAddressProof: req.files["companyAddressProof"] ? req.files["companyAddressProof"][0].path : undefined,
    companyPancard: req.files["companyPancard"] ? req.files["companyPancard"][0].path : undefined,
  };

  try {
    const lead = await Lead.create({
      name,
      email,
      number,
      salary,
      address,
      companyName,
      timeToReach,
      reachBy,
      leadType,
      userId, // Associate the lead with the user
      documents: fileFields,
    });
    res.status(201).send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
     <style>
        *{
            margin: 0;padding: 0;box-sizing: border-box;
        }
        /* From Uiverse.io by satyamchaudharydev */ 
        body{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100vw;
            height: 100vh;
        }
.loader {
  display: block;
  --height-of-loader: 4px;
  --loader-color: #0071e2;
  width: 130px;
  height: var(--height-of-loader);
  border-radius: 30px;
  background-color: rgba(0,0,0,0.2);
  position: relative;
}

.loader::before {
  content: "";
  position: absolute;
  background: var(--loader-color);
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  border-radius: 30px;
  animation: moving 1s ease-in-out infinite;
  ;
}

@keyframes moving {
  50% {
    width: 100%;
  }

  100% {
    width: 0;
    right: 0;
    left: unset;
  }
}
    </style>
</head>
<body>
      <div class="loader"></div>
       <script>
          setTimeout(function(){
            window.location.href = '/';
          }, 2100);
        </script>
</body>
</html>`);
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

