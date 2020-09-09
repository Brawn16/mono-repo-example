const withImages = require("next-images");
const transpile = require("next-transpile-modules");

const withModules = transpile(["@sdh-project-services/nucleus-ui"]);

module.exports = withModules(
  withImages({
    crossOrigin: "anonymous",
    trailingSlash: true,
  })
);
