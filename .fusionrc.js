const rootImport = require('babel-plugin-root-import',{ rootPathSuffix: "src" });

module.exports = {
  babel: {
    plugins: [rootImport]
  }
};
