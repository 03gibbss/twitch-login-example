const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/twitch", passport.authenticate("twitch"));

router.get(
  "/twitch/callback",
  passport.authenticate("twitch", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
