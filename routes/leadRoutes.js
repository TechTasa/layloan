const express = require("express");
const leadController = require("../controllers/leadContoller");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

// Apply for a loan
router.post(
  "/apply/:type",
  upload.fields([
    { name: "pancard", maxCount: 1 },
    { name: "salaryslip", maxCount: 1 },
    { name: "companyid", maxCount: 1 },
    { name: "passportSizePhoto", maxCount: 1 },
    { name: "bankStatement", maxCount: 1 },
    { name: "offerLetter", maxCount: 1 },
    { name: "companyPancard", maxCount: 1 },
    { name: "ITR", maxCount: 1 },
    { name: "companyBankStatement", maxCount: 1 },
    { name: "companyAddressProof", maxCount: 1 },
  ]),
  leadController.applyLoan
);


router.get("/apply/:type", (req, res) => {
  // let loggedin = req.session.user;
  // console.log(loggedin);
  // if (loggedin == undefined) {
  //   loggedin="no user"
  // }
  // console.log(loggedin);
  // res.render("apply", { type: req.params.type, loggedin });
  if (req.session && req.session.user) {
    req.user = req.session.user;
    res.render("apply", { 
      type: req.params.type, 
      loggedin: true, 
      user: req.user 
    });
  } else {
    res.render("apply", { 
      type: req.params.type, 
      loggedin: false 
    });
  }
});

module.exports = router;
