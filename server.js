require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

require("./models/User");

require("./config/passport")(passport);

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;

const index = require("./routes/index");
const auth = require("./routes/auth");
const role = require("./routes/role");

mongoose
  .connect(MONGO_URI)
  .then(() => console.log(`MongoDB connected`))
  .catch((err) => console.error(err));

const app = express();

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.listen(PORT, () =>
  console.log(`Express server listening on port: ${PORT}`)
);

app.use("/", index);
app.use("/auth", auth);
app.use("/role", role);
