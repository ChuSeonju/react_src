const { override, addWebpackResolve } = require("customize-cra");

module.exports = override(
  addWebpackResolve({
    fallback: {
      buffer: require.resolve("buffer/"),
      timers: require.resolve("timers-browserify"),
    },
  })
);
