const Lead = require("../models/Lead");
const User = require("../models/User");

exports.getLeads = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }
  try {
    const userType = req.session.user.userType;

    res.render("leadsDashboard", {
      userType: userType,
      referralId: req.session.user.referralId,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getLeadsByType = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }
  try {
    let leads;
    const userType = req.session.user.userType;
    const userId = req.session.user._id;
    const leadAccess = req.session.user.leadAccess;
    const leadType = req.params.leadType;

    // Validate leadType
    const validLeadTypes = [
      "creditcard",
      "personalloan",
      "microloan",
      "businessloan",
      "homeloan",
      "automobileloan",
      "educationloan",
      "propertyloan",
      "productloan",
      "serviceloan",
      "insurance",
      "terminsurance",
      "healthinsurance",
      "returnplan",
      "mutualfund",
      "automobileinsurance",
      "propertyinsurance",
      "productinsurance",
    ];
    if (!validLeadTypes.includes(leadType)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid lead type",
      });
    }

    let query = { leadType: leadType };

    if (userType === "admin" || userType === "hr") {
      leads = await Lead.find(query).populate([
        { path: "assignedTo", select: "username" },
        { path: "userId", select: "username userType" },
      ]);
    } else if (userType === "agent" || userType === "partner") {
      // Check if the user has any leads assigned of this type, regardless of leadAccess
      const assignedLeadsCount = await Lead.countDocuments({
        leadType: leadType,
        assignedTo: userId,
      });

      // if (assignedLeadsCount === 0 && !leadAccess.includes(leadType)) {
      //   return res.status(403).json({
      //     status: "error",
      //     message: "You do not have access to this lead type",
      //   });
      // }
      if (assignedLeadsCount === 0 && !leadAccess.includes(leadType)) {
        const html = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>No Leads Available</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      height: 100vh;
                      margin: 0;
                      background-color: #f0f0f0;
                  }
                  .container {
                      text-align: center;
                      padding: 2rem;
                      background-color: white;
                      border-radius: 8px;
                      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                  }
                  h1 {
                      color: #333;
                  }
                  p {
                      color: #666;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <h1>No Leads Available</h1>
                  <p>You currently have 0 leads assigned to you.</p>
              </div>
          </body>
          </html>
        `;
      
        return res.status(200).send(html);
      }

      query.$or = [
        { assignedTo: userId },
        { leadType: leadType, $expr: { $in: [leadType, leadAccess] } },
      ];
      leads = await Lead.find(query).populate("assignedTo", "username");
    } else {
      query.userId = userId;
      leads = await Lead.find(query).populate([
        { path: "assignedTo", select: "username" },
        { path: "userId", select: "username userType" },
      ]);
    }

    const agents = await User.find({ userType: "agent" }, "id username");
    const partners = await User.find({ userType: "partner" }, "id username");

    res.render("leads", {
      leads: leads,
      userType: userType,
      agents: agents,
      partners: partners,
      referralId: req.session.user.referralId,
      currentLeadType: leadType,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.assignLead = async (req, res) => {
  if (!req.session.user || req.session.user.userType !== "admin") {
    return res.redirect("/auth/login");
  }

  const { leadId, assignedTo, assignType } = req.body;
  let user;

  try {
    const lead = await Lead.findById(leadId);
    if (!lead) {
      req.flash("error", "Lead not found");
      return res.redirect("back");
    }

    if (assignedTo === "") {
      lead.assignedTo = null;
    } else {
      user = await User.findById(assignedTo);
      if (!user || user.userType !== assignType) {
        req.flash("error", `Invalid ${assignType} selected`);
        return res.redirect("back");
      }
      lead.assignedTo = assignedTo;
    }

    await lead.save();
    req.flash(
      "success",
      `Lead assigned to ${assignedTo === "" ? "No One" : user?.username}`
    );
  } catch (err) {
    console.error("Error assigning lead:", err);
    req.flash("error", err.message);
  }

  res.redirect("back");
};

exports.updateLeadStatus = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }

  const { leadId, status } = req.body;

  try {
    const lead = await Lead.findById(leadId);
    if (!lead) {
      req.flash("error", "Lead not found");
      return res.redirect("back");
    }

    lead.status = status;
    await lead.save();
    req.flash("success", `Lead status updated to ${status}`);
  } catch (err) {
    console.error("Error updating lead status:", err);
    req.flash("error", err.message);
  }

  res.redirect("back");
};
