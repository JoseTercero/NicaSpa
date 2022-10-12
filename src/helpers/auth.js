export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "Not Authorized.");
  res.redirect("/auth/signin");
};

export const isAdmin = (req, res, next) => {
  if (req.user) {
    if (req.user.role.toLowerCase() === "admin") {
      return next();
    }
  }
  req.flash("error_msg", "Not Authorized.");
  res.redirect("..");
};

export const isUser = (req, res, next) => {
  if (req.user) {
    if (req.user.role.toLowerCase() === "user") {
      return next();
    }
  }
  req.flash("error_msg", "Not Authorized.");
  res.redirect("..");
};

var Handlebars = require("handlebars");
Handlebars.registerHelper("ifTypeUser", function (v1, v2, options) {
  if (v1.toLowerCase() === v2.toLowerCase()) {
    return options.fn(this);
  }
  return options.inverse(this);
});

// Handlebars.registerHelper("ifUser", function (v1, options) {
//   const v2 = email;
//   if (v1.toLowerCase() === v2.toLowerCase()) {
//     return options.fn(this);
//   }
//   return options.inverse(this);
// });

Handlebars.registerHelper("inc", function (value, options) {
  return parseInt(value) + 1;
});

Handlebars.registerHelper("toDate", function (objectId, options) {
  return objectId.toLocaleString();
});

// Handlebars.registerHelper("toDate", function (objectId, options) {
//   return new Date(parseInt(objectId.toString().substring(0, 8), 16) * 1000);
// });
