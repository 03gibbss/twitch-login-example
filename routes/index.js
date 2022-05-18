const express = require("express");
const router = express.Router();
const { ensureAuthenticated, ensureGuest, permit } = require("../helpers/auth");
const role = require("../helpers/role");

router.get("/", ensureGuest, (req, res) => {
  res.send("Welcome guest");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.send(`Welcome ${req.user.displayName}`);
});

router.get("/admin", ensureAuthenticated, permit(role.admin), (req, res) => {
  res.send(`Welcome ${req.user.displayName} - You are an admin`);
});

module.exports = router;
