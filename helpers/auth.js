module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.redirect("/");
  },
  ensureGuest: (req, res, next) => {
    if (!req.isAuthenticated()) return next();
    return res.redirect("/dashboard");
  },
  permit(roles = []) {
    if (typeof roles === "string") {
      roles = [roles];
    }
    return [
      (req, res, next) => {
        const permitted = roles.some(
          (role) => req.user.roles && req.user?.roles.includes(role)
        );

        if (permitted) return next();
        return res.redirect("/");
      },
    ];
  },
};
