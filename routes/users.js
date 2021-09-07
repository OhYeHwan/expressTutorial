const { Router } = require("express");

const router = Router();

router.use((req, res, next) => {
  console.log("Request made to /USERS ROUTER");
  next();
});

router.get("/", (req, res) => {
  res.send(200);
});

router.get("/posts", (req, res) => {
  res.json({ route: "Posts" });
});

module.exports = router;
