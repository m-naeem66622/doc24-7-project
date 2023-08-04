const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authentication = async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  const token = bearerToken.split(" ")[1];

  let isAuthenticated;

  try {
    isAuthenticated = JWT.verify(token, JWT_SECRET);
    const decodedToken = JWT.decode(token);
    req.userRole = decodedToken.systemRoles[0].role;
  } catch (error) {
    return res.status(403).json({
      message: "INVALID USER",
    });
  }

  if (isAuthenticated) {
    next();
  } else {
    return res.status(404).json({
      message: "INVALID USER",
    });
  }
};

module.exports = {
  authentication,
};
