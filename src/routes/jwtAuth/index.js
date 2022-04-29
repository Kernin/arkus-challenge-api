const jwt = require("jsonwebtoken");

module.exports = (router) => {
  router.use((request, response, next) => {
    const token = request.headers["authorization"]
      .replace("Bearer", "")
      .replaceAll(/\s/g, "");
    if (token) {
      const masterKey = process.env.MASTER_KEY;
      jwt.verify(token, masterKey, (err, decoded) => {
        if (err) {
          return response.json({ message: "Invalid token" });
        } else {
          request.decoded = decoded;
          next();
        }
      });
    } else {
      response.send({
        message: "Token not found",
      });
    }
  });
};
