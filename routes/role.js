const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../helpers/auth");
const role = require("../helpers/role");

const User = require("../models/User");

router.get("/promote", ensureAuthenticated, (req, res) => {
  User.findByIdAndUpdate(req.user.id, { roles: [role.admin] })
    .then(({ displayName }) => {
      res.send(`${displayName} successfully promoted to admin`);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/demote", ensureAuthenticated, (req, res) => {
  User.findByIdAndUpdate(req.user.id, { roles: [] })
    .then(({ displayName }) => {
      res.send(`${displayName} successfully demoted from admin`);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
