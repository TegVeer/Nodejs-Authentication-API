const jwt = require("jsonwebtoken");
const jwtKey = "#6295ismybikE";
module.export = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.body.token, jwtKey);
    req.decodedData = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "AUTH_FAILED",
    });
  }
};
