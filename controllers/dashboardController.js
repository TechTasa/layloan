
const Lead = require('../models/Lead');
const Referral = require('../models/Referral'); // Import the Referral model

exports.dashboardOverview = async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }

  try {
    const today = new Date();
    const todayStart = new Date(today.setHours(0, 0, 0));
    const todayEnd = new Date(today.setHours(23, 59, 59));

    const totalLeads = await Lead.countDocuments();
    const todayLeads = await Lead.countDocuments({
      createdAt: { $gte: todayStart, $lt: todayEnd }
    });

    const leadTypes = [
      'creditcard', 'personalloan', 'microloan', 'businessloan', 'homeloan', 
      'automobileloan', 'educationloan', 'propertyloan', 'productloan', 
      'serviceloan',  'terminsurance', 'healthinsurance', 
      'returnplan', 'mutualfund', 'automobileinsurance', 'propertyinsurance', 
      'productinsurance'
    ];

    let leadTypeCounts = {};

    for (let type of leadTypes) {
      leadTypeCounts[type] = {
        allTime: await Lead.countDocuments({ leadType: type }),
        today: await Lead.countDocuments({
          leadType: type,
          createdAt: { $gte: todayStart, $lt: todayEnd }
        })
      };
    }

    const statuses = ['pending', 'in_progress', 'done', 'rejected', 'on_hold'];
    let statusCounts = {};

    for (let status of statuses) {
      statusCounts[status] = {
        allTime: await Lead.countDocuments({ status: status }),
        today: await Lead.countDocuments({
          status: status,
          createdAt: { $gte: todayStart, $lt: todayEnd }
        })
      };
    }
    const referralCounts = await Referral.find({});
    // console.log(referralCounts);
    res.render('dashboard', { 
      totalLeads, 
      todayLeads, 
      leadTypeCounts,
      statusCounts,
      userType: req.session.user.userType,
      referralId: req.session.user.referralId,
      userName: req.session.user.username,
      referralCounts 
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};