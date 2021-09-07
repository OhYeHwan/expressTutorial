const express = require("express");
const session = require("express-session");

const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");

const store = new session.MemoryStore();
// const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

app.use(
  session({
    secret: "some sectet",
    cookie: { maxAge: 30000 },
    saveUninitialized: false,
    store,
  })
);

// app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(store);
  console.log(`${req.method} - ${req.url}`);
  next();
});

app.use("/users", usersRoute);
app.use("/posts", postsRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// const users = [
//   { name: "YeHwan", age: 22 },
//   { name: "Hi", age: 23 },
//   { name: "Kim", age: 23 },
// ];

// const posts = [{ title: "My favorite foods" }];

// app.get("/", (req, res) => {
//   res.send({
//     msg: "Hello!",
//     user: {},
//   });
// });

// app.get("/users", (req, res) => {
//   res.status(200).send(users);
//   //res.send(users);
// });

// app.get("/users/:name", (req, res) => {
//   //console.log(req.params);
//   const { name } = req.params;
//   const user = users.find((user) => user.name === name);
//   if (user) res.status(200).send(user);
//   else res.status(404).send("Not Found");
// });

// app.get("/posts", (req, res) => {
//   console.log(req.query);
//   const { title } = req.query;
//   if (title) {
//     const post = posts.find((post) => post.title === title);
//     if (post) res.status(200).send(post);
//     else res.status(404).send("Not Found");
//   } else {
//     res.status(200).send(posts);
//   }
// });

// function validateAuthToken(req, res, next) {
//   const { authorization } = req.headers;
//   if (authorization && authorization === "123") {
//     next();
//   } else {
//     res.status(403).send({ msg: "Forbidden. Incorrect Credentials" });
//   }
// }

// app.post("/posts", validateAuthToken, (req, res) => {
//   const post = req.body;
//   console.log(post);
//   posts.push(post);
//   res.status(201).send(post);
// });

// app.post("/", (req, res) => {
//   const user = req.body;
//   users.push(user);
//   res.status(201).send("Created user");
// });

// function validateCookie(req, res, next) {
//   const { cookies } = req;
//   console.log(cookies);
//   if ("session_id" in cookies) {
//     console.log("Session ID Exists.");
//     if (cookies.session_id === "123456") {
//       next();
//     } else {
//       res.status(403).send({ msg: "Not Authenticated" });
//     }
//   } else res.status(403).send({ msg: "Not Authenticated" });
//   next();
// }

// app.get("/signin", validateCookie, (req, res) => {
//   res.cookie("session_id", "123456");
//   res.status(200).json({ msg: "Logged In." });
// });

// app.get("/protected", validateCookie, (req, res) => {
//   res.status(200).json({ msg: "You are authorized!" });
// });

// app.post("/login", (req, res) => {
//   console.log(req.sessionID);
//   const { username, password } = req.body;
//   if (username && password) {
//     if (req.session.authenticated) {
//       res.json(req.session);
//     } else {
//       if (password === "123") {
//         req.session.authenticated = true;
//         req.session.user = {
//           username,
//           password,
//         };
//         res.json(req.session);
//       } else {
//         res.status(403).json({ msg: "Bad Credentials" });
//       }
//     }
//   } else res.status(403).json({ msg: "Bad Credentials" });
// });
