const jwt = require("jsonwebtoken");

const middleware = async (req, res, next) => {
  try {
    console.log("middleware called");
    const token = req.cookies.SCSCL;
    jwt.verify(token, process.env.KEY, (err, result) => {
      if (err) {
        res.send(err);
        return;
      }
      if (!result) {
        return res.sendFile(path.join(__dirname, "../frontend/login.html"));
      }
      next();
    });
  } catch (err) {
    res.status(200).send(err);
  }
};
module.exports = middleware;
