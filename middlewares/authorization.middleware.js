const authorization = async (req, res, next) => {
  const { isAdmin } = req.body;

  if (isAdmin) {
    res.status(200).json({
      message: "authorized",
    });
  } else {
    res.status(400).json({
      message: "un authorized",
    });
  }
};

module.exports = {
  authorization,
};
