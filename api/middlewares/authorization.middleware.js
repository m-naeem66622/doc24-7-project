const authorization = async (req, res, next) => {
  const role = req.userRole;
  console.log(role);

  if (role === "ADMIN") {
    console.log("authorized");
    next();
  } else {
    return res.status(401).json({
      message: "UN AUTHORIZED",
    });
  }
};

module.exports = {
  authorization,
};
