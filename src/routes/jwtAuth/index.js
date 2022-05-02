const jwt = require("jsonwebtoken");

module.exports = (router) => {
  router.use((request, response, next) => {
    let token = request.headers["authorization"]
      
    if (token) {
      token = token.replace("Bearer", "")
      .replaceAll(/\s/g, "");
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
