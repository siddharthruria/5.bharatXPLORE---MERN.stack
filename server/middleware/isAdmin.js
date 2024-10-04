// middleware to verify whether the user is admin

const isAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      error: "access denied. admins only",
    });
  }

  next();
};

module.exports = isAdmin;
