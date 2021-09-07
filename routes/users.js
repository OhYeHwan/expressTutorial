const { Router } = require("express");
const db = require("../database");
const router = Router();

router.use((req, res, next) => {
  console.log("Request made to /USERS ROUTER");
  next();
});

router.get("/", async (req, res) => {
  const results = await db.promise().query(`SELECT * FROM USERS`);
  res.status(200).send(results[0]);
});

router.get("/posts", (req, res) => {
  res.json({ route: "Posts" });
});

router.post("/", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    try {
      db.promise().query(
        `INSERT INTO USERS VALUES('${username}', '${password}')`
      );
      res.status(201).send({ msg: "Created User" });
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
