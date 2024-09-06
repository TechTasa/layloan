exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.status(401).json({
        status: 'error',
        message: 'You need to be logged in to access this route'
      });
    }
  };
  