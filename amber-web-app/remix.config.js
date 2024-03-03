export default {
  cacheDirectory: "./node_modules/.cache/remix",
  //...
  serverDependenciesToBundle: [
    "remix-i18next",
    "accept-language-parser",
    "@googlemaps/js-api-loader",
  ],
  serverModuleFormat: "esm",
  serverPlatform: "node"
};
