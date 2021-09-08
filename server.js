const express = require("express");
const session = require("express-session");
const passport = require("passport");
const local = require("./strategies/local");

const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const authRoute = require("./routes/auth");

const store = new session.MemoryStore();
// const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

app.use(
  session({
    secret: "some sectet",
    cookie: { maxAge: 60000 },
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

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", usersRoute);
app.use("/posts", postsRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
