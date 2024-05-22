const jsonwebtoken = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Missing Authorization header" });
  }

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid Authorization header format" });
  }

  const token = tokenParts[1];

  jsonwebtoken.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  authorization,
};
