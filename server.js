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
