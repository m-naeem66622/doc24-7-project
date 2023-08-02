const authentication = async (req, res, next) => {
  const { isAuthenticated } = req.body;
  if (isAuthenticated) {
    console.log("authenticated");
    next();
  } else {
    return res.status(400).json({
      message: "not authenticated",
    });
  }
};

module.exports = {
  authentication,
};
