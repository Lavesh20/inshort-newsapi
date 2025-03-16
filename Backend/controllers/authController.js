exports.googleCallback = (req, res) => {
    res.redirect("/profile");
  };
  
  exports.profile = (req, res) => {
    if (!req.user) {
      return res.redirect("/");
    }
    res.send(`Welcome ${req.user.displayName}, your email is ${req.user.email}`);
  };
  
  exports.logout = (req, res) => {
    req.logout(() => {
      res.redirect("/");
    });
  };
  