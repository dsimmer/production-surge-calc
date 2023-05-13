module.exports = {
  extends: 'eslint:recommended',
  // parserOptions: {
  //   ecmaVersion: 9,
  //   // Until we can use import in nodejs, we should be assuming a unit of
  //   // is written CommonJS compliant, rather than import/export.
  //   // As such, the relevant modules opt into import/export (sourceType: module)
  //   // sourceType: 'script',
  // },
  "parserOptions": {
    "ecmaVersion": 2017
  },
  "env": {
    "jest": true,
    "es6": true
  }
};
