const withImages = require("next-images");
const transpile = require("next-transpile-modules");

module.exports = transpile(["@sdh-project-services/nucleus-ui"])(withImages());
