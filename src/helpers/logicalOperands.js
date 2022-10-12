// var Handlebars = require("handlebars");
// Handlebars.registerHelper("ifCond", function (v1, v2, options) {
//   if (v1 === v2) {
//     return options.fn(this);
//   }
//   return options.inverse(this);
// });
var Handlebars = require("handlebars");
Handlebars.registerHelper("ifTypeUser", function (v1, v2, options) {
  if (v1.toLowerCase() === v2.toLowerCase()) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper("inc", function (value, options) {
  return parseInt(value) + 1;
});

Handlebars.registerHelper("toDate", function (objectId, options) {
  return objectId.toDateString();
});

// Handlebars.registerHelper("toDate", function (objectId, options) {
//   return new Date(parseInt(objectId.toString().substring(0, 8), 16) * 1000);
// });
